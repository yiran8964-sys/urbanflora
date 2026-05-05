# Server Deployment

This repository now includes a Git-hook based deployment flow for servers that pull code directly from the repository.

## Files

- `docker-compose.yml`: defines the long-running `urban-flora` container and persists application data under `./data`.
- `docker/deploy-update.sh`: rebuilds the Docker image from the latest code and recreates the container.
- `docker/install-git-hooks.sh`: installs the repository-managed Git hooks into `.git/hooks`.
- `docker/git-hooks/post-merge`: triggers deployment after `git pull` with merge or fast-forward.
- `docker/git-hooks/post-rewrite`: triggers deployment after `git pull --rebase` or `pull.rebase=true`.

## Server Setup

Run these commands once inside the server-side repository checkout:

```sh
sh docker/install-git-hooks.sh
sh docker/deploy-update.sh
```

After that, each successful `git pull` will automatically:

1. rebuild the latest image from the pulled code
2. recreate the container in detached mode
3. keep persistent data in `./data`

## Optional Environment Variables

You can define server-specific values in a local `.env` file in the repository root. Common variables:

```dotenv
APP_PORT=8080
APP_NAME=urban-flora
CORS_ALLOWED_ORIGINS=https://your-domain.example
MYSQL_DATABASE=urban_flora
MYSQL_USER=urban_flora
MYSQL_PASSWORD=change-me
MYSQL_ROOT_PASSWORD=change-me
JAVA_OPTS=-Xms256m -Xmx512m
DOCKER_BUILD_PULL=1
COMPOSE_PROJECT_NAME=urban-flora
```

`DOCKER_BUILD_PULL=1` makes the update script refresh base images before rebuilding.
