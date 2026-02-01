#!/bin/bash

# Simple test for the rename functionality

echo "Testing rename functionality..."

# Create test directory structure
TEST_DIR="test_rename_system"
mkdir -p "$TEST_DIR/source"
mkdir -p "$TEST_DIR/output"

# Create some test files
touch "$TEST_DIR/source/test1.png"
touch "$TEST_DIR/source/test2.jpg"
touch "$TEST_DIR/source/test3.jpeg"

# Create a simple mapping file
cat > "$TEST_DIR/test_mapping.json" << 'EOF'
{
  "images": [
    {
      "filename": "test1.png",
      "product_id": "TEST001",
      "category": "wood",
      "product_name": "Test Wood Door",
      "confidence": "high",
      "version": 1,
      "notes": "Test door"
    },
    {
      "filename": "test2.jpg",
      "product_id": "TEST002",
      "category": "iron",
      "product_name": "Test Iron Door",
      "confidence": "high",
      "version": 1,
      "notes": "Test iron door"
    }
  ]
}
EOF

echo "Test files created."
echo "Source directory: $TEST_DIR/source"
echo "Output directory: $TEST_DIR/output"
echo "Mapping file: $TEST_DIR/test_mapping.json"

# Test the clean_filename function
echo ""
echo "Testing filename cleaning:"
echo "Original: 'Solid Wood Exterior Door M580E'"
echo "Cleaned: '$(echo "Solid Wood Exterior Door M580E" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9_-]//g' | sed 's/--*/-/g' | sed 's/^-//; s/-$//')'"

echo ""
echo "Test completed."