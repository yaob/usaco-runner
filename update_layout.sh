#!/bin/bash

# Make the runtime input as wide as possible
cd ~/usaco-runner

# Add width constraint to fill container
sed -i '' '/^        \.runtime-input {/a\            width: 100%;' public/index.html

# Remove runtime-hint section
sed -i '' '/^        \.runtime-hint {/,/^        }/d' public/index.html

# Remove the closing div for runtime-hint
sed -i '' '/^                <\/div>$/d' public/index.html

echo "Changes applied!"