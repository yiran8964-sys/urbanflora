#!/bin/sh
set -eu

REPO_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
COMPOSE_FILE_PATH="$REPO_DIR/docker-compose.yml"
PROJECT_NAME="${COMPOSE_PROJECT_NAME:-urban-flora}"

if [ ! -f "$COMPOSE_FILE_PATH" ]; then
  echo "Missing compose file: $COMPOSE_FILE_PATH" >&2
  exit 1
fi

if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  run_compose() {
    docker compose -f "$COMPOSE_FILE_PATH" -p "$PROJECT_NAME" "$@"
  }
elif command -v docker-compose >/dev/null 2>&1; then
  run_compose() {
    docker-compose -f "$COMPOSE_FILE_PATH" -p "$PROJECT_NAME" "$@"
  }
else
  echo "docker compose is required on the server." >&2
  exit 1
fi

cd "$REPO_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Rebuilding image for $PROJECT_NAME"
if [ "${DOCKER_BUILD_PULL:-0}" = "1" ]; then
  run_compose build --pull
else
  run_compose build
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Restarting containers for $PROJECT_NAME"
run_compose up -d --remove-orphans

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Current container status"
run_compose ps
