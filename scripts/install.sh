#!/bin/bash

echo "Registering git hooks..."
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks

echo "Installing project.."

echo "→ Moving to project folder"
cd project
echo "→ Removing existing node_modules"
rm -Rf node_modules

echo "→ Installing node_modules"
if yarn --version > /dev/null; then
    yarn install
else
    npm install
fi
echo "Installation finished."
