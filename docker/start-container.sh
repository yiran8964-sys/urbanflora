#!/bin/sh
set -eu

MYSQL_HOST="127.0.0.1"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_DATABASE="${MYSQL_DATABASE:-urban_flora}"
MYSQL_USER="${MYSQL_USER:-urban_flora}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-Abcd123456}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-Abcd123456}"
MYSQL_DATA_DIR="${MYSQL_DATA_DIR:-/var/lib/mysql}"
MYSQL_SOCKET="/tmp/mysql.sock"
MYSQL_RUN_DIR="${MYSQL_RUN_DIR:-/run/mysqld}"
MYSQL_PID_FILE="${MYSQL_PID_FILE:-$MYSQL_RUN_DIR/mysqld.pid}"
UPLOAD_DIR="${UPLOAD_DIR:-/app/uploads}"
SEED_UPLOAD_DIR="/app/uploads"
APP_PORT="${PORT:-8080}"

mkdir -p "$UPLOAD_DIR" "$MYSQL_DATA_DIR" "$MYSQL_RUN_DIR"
chown -R mysql:mysql "$MYSQL_DATA_DIR"
chown -R mysql:mysql "$MYSQL_RUN_DIR"

mysql_client() {
  if mariadb --socket="$MYSQL_SOCKET" -uroot -e "SELECT 1" >/dev/null 2>&1; then
    mariadb --socket="$MYSQL_SOCKET" -uroot "$@"
  else
    mariadb --socket="$MYSQL_SOCKET" -uroot -p"$MYSQL_ROOT_PASSWORD" "$@"
  fi
}

if [ "$UPLOAD_DIR" != "$SEED_UPLOAD_DIR" ] && [ -d "$SEED_UPLOAD_DIR" ] && [ -z "$(ls -A "$UPLOAD_DIR" 2>/dev/null)" ]; then
  cp -R "$SEED_UPLOAD_DIR"/. "$UPLOAD_DIR"/
fi

if [ ! -d "$MYSQL_DATA_DIR/mysql" ]; then
  mariadb-install-db --user=mysql --datadir="$MYSQL_DATA_DIR" >/dev/null
fi

mariadbd \
  --user=mysql \
  --datadir="$MYSQL_DATA_DIR" \
  --bind-address="$MYSQL_HOST" \
  --port="$MYSQL_PORT" \
  --socket="$MYSQL_SOCKET" \
  --pid-file="$MYSQL_PID_FILE" &
MYSQL_PID=$!

cleanup() {
  kill "$MYSQL_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

i=0
until mariadb-admin --socket="$MYSQL_SOCKET" ping >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -ge 60 ]; then
    echo "MariaDB failed to start within 60 seconds." >&2
    exit 1
  fi
  sleep 1
done

mysql_client <<SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'127.0.0.1' IDENTIFIED BY '${MYSQL_PASSWORD}';
ALTER USER '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
ALTER USER '${MYSQL_USER}'@'127.0.0.1' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'localhost';
GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL

if [ -d /app/docker/mysql-init ]; then
  for sql_file in /app/docker/mysql-init/*.sql; do
    [ -f "$sql_file" ] || continue
    mysql_client "$MYSQL_DATABASE" < "$sql_file"
  done
fi

exec java $JAVA_OPTS -Dserver.port="$APP_PORT" -jar /app/app.jar
