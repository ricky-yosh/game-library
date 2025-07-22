#!/bin/bash

set -e

# Vars
BUILD_DIR="./games-library/dist"
TEMP_DIR=$(mktemp -d)
REPO_URL=$(git config --get remote.origin.url)

# Build the project
echo "Running build..."
cd games-library
npm install
npm run build
cd ..

# Copy build output to temp dir
echo "Copying build output to temp dir..."
cp -r "$BUILD_DIR"/* "$TEMP_DIR"

# Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git fetch origin
git checkout gh-pages || git checkout --orphan gh-pages

# Remove all files
git rm -rf . > /dev/null 2>&1 || true
rm -rf ./*

# Copy build files
cp -r "$TEMP_DIR"/* ./
cp ./index.html ./404.html

# Commit and push
echo "Committing and pushing..."
git add .
git commit -m "Deploy to gh-pages" || echo "Nothing to commit"
git push origin gh-pages --force

# Switch back to main
git checkout main

# Cleanup
rm -rf "$TEMP_DIR"

# Get node modules back
cd games-library
npm install
cd ..

git branch -D gh-pages

echo "✅ Deployment complete!"
