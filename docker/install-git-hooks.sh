#!/bin/sh
set -eu

REPO_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
HOOKS_DIR="$REPO_DIR/.git/hooks"
SOURCE_DIR="$REPO_DIR/docker/git-hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Git hooks directory not found: $HOOKS_DIR" >&2
  exit 1
fi

for hook_name in post-merge post-rewrite; do
  cp "$SOURCE_DIR/$hook_name" "$HOOKS_DIR/$hook_name"
  chmod +x "$HOOKS_DIR/$hook_name"
  echo "Installed hook: $HOOKS_DIR/$hook_name"
done
