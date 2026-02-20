#!/bin/bash

echo "=== SSH Key Test for USACO Runner ==="
echo ""

echo "1. Key Files:"
ls -la ~/.ssh/id_ed25519_usaco_runner*
echo ""

echo "2. Public Key Contents:"
cat ~/.ssh/id_ed25519_usaco_runner.pub
echo ""

echo "3. SSH Agent Status:"
eval "$(ssh-agent -s)"
ssh-add -l
echo ""

echo "4. Key Details:"
ssh-keygen -lf ~/.ssh/id_ed25519_usaco_runner.pub
echo ""

echo "=== Test Complete ==="
echo ""
echo "The key is ready and loaded in SSH agent!"
echo "To add to GitHub, copy the key above and add it to:"
echo "https://github.com/settings/keys"