#!/bin/bash

# Define the package version
PACKAGE_NAME="cli-web-cloner-cloner"
PACKAGE_VERSION="1.1.1"
PACKAGE_TGZ="${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz"

# Build the project
echo "Building the project..."
npm run build

# Pack the project
echo "Packing the project..."
npm pack

# Install the package globally
echo "Installing the package globally..."
npm install -g $PACKAGE_TGZ