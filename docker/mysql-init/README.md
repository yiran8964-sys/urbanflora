Place SQL files in this directory to initialize the database when the container starts.

Suggested naming:
- `001-init.sql`: schema
- `002-seed.sql`: test data

These files are executed in filename order against the `${MYSQL_DATABASE}` database.
