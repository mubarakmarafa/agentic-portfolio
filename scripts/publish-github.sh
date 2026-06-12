#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install: https://cli.github.com/"
  exit 1
fi

gh auth status

if git remote get-url origin >/dev/null 2>&1; then
  git push -u origin main
else
  gh repo create portfolio-lite --public --source=. --remote=origin --push
fi

echo "Repository: $(gh repo view --json url -q .url)"
