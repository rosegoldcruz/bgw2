# BGW Doors Image Renaming System Plan

## Project Overview
Create a file renaming system for door product images that will:
1. Visually match each image in the `bg-finals-4x` folder to BGW Doors reference product images
2. Name files according to format: `<category>__<exact-product-name>.png` (lowercase, spaces as hyphens)
3. Create a bash-compatible rename script for the entire folder

## Data Analysis

### Door Categories (from reference screenshots)
- Wood Doors (70+ products)
- Iron Doors (6+ products)
- Fiberglass Doors (7+ products)
- Slab Doors (25+ products)

### Product Database
The `final_bgw_products (1).txt` file contains:
- ~100 product entries with product codes and descriptions
- Format varies but generally follows: `[PRODUCT_CODE] - [PRODUCT_NAME]`
- Some entries have missing product codes or names

### Target Images
- ~100 images in `public/bg-finals-4x` folder
- Generic filenames based on WhatsApp timestamps
- No inherent organization or metadata in filenames

## Technical Architecture

### 1. Product Database Creation
- Parse the `final_bgw_products (1).txt` file
- Create a structured JSON database with fields:
  - product_code
  - product_name
  - category (extracted from name)
  - clean_name (lowercase, hyphenated)

### 2. Image Analysis Strategy
Since browser capabilities aren't available for visual inspection:
- Create manual mapping from image timestamps to potential products
- Implement a two-phase approach:
  1. First pass: Map obvious matches based on distinct visual features
  2. Second pass: Handle similar products and edge cases
  3. Final pass: Mark remaining images as unknown

### 3. Rename Script Architecture
```
#!/bin/bash

# Configuration
SOURCE_DIR="public/bg-finals-4x"
PRODUCT_DB="product_database.json"
UNKNOWN_PREFIX="_unknown__needs-review"
VERSION_SEPARATOR="__v"

# Functions
function clean_name() {
  # Convert to lowercase
  # Replace spaces with hyphens
  # Remove special characters
}

function detect_duplicates() {
  # Check if product already exists
  # Assign version numbers
}

function rename_file() {
  # Validate source exists
  # Apply formatting rules
  # Handle duplicate versions
  # Execute rename
}

# Main execution
# Load mapping data
# Process each file
# Generate report
```

### 4. Mapping System Design
Create a mapping file that associates each WhatsApp image with its identified product:
```json
{
  "WhatsApp Image 2026-01-30 at 9.12.55 AM_final.png": {
    "category": "iron",
    "product_name": "Iron Exterior Door #ID02 Iron Door",
    "confidence": "high"
  },
  ...
}
```

## Implementation Plan

1. **Setup Phase**
   - Create project directory structure
   - Parse product database into structured format
   - Analyze categories and naming patterns

2. **Mapping Phase**
   - Create initial mapping file template
   - Develop manual mapping system
   - Document visual identification hints for each product category

3. **Script Development Phase**
   - Implement core renaming functionality
   - Add version handling for multiple angles
   - Add unknown image handling
   - Implement validation and error checking

4. **Testing Phase**
   - Test with sample subset of images
   - Validate correct formatting and naming
   - Ensure proper handling of edge cases

5. **Documentation Phase**
   - Document usage instructions
   - Provide guidance for handling future additions
   - Create summary report of renamed files

## Challenges and Solutions

### Challenge 1: Visual Matching Without Browser
**Solution:** Create a systematic mapping approach using product descriptions and any available visual clues from filenames or metadata.

### Challenge 2: Multiple Angles of Same Product
**Solution:** Implement version detection based on visual similarity or temporal proximity in the WhatsApp timestamps.

### Challenge 3: Unidentifiable Images
**Solution:** Create a dedicated process to flag and move these to a separate review folder.

## Output Deliverables

1. A product database JSON file
2. A mapping JSON file linking WhatsApp images to products
3. A bash rename script that implements the renaming logic
4. Documentation on usage and maintenance