#!/bin/bash

# Define the package version
PACKAGE_NAME="cloner"
PACKAGE_VERSION="1.0.4"
PACKAGE_TGZ="${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz"

# Remove the node_modules directory
echo "Removing node_modules..."
rm -rf node_modules

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Pack the project
echo "Packing the project..."
npm pack

# Install the package globally
echo "Installing the package globally..."
npm install -g $PACKAGE_TGZ

# Test the package
echo "Running test..."
cloner test

# End of script
echo "Script execution completed."