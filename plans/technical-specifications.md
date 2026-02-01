# BGW Doors Image Renaming System - Technical Specifications

## 1. Implementation Directory Structure

```
katachi/
├── plans/              # Planning documents
├── src/                # Source code for scripts
│   ├── parse_products.py  # Product database parser
│   ├── create_mapping.py  # Mapping creation tool
│   └── rename_images.sh   # Main renaming script
├── data/               # Data files
│   ├── product_database.json  # Structured product data
│   ├── image_mapping.json     # Image to product mappings
│   └── final_bgw_products.txt # Original product list
└── output/             # Logs and reports
    └── rename_report.txt      # Renaming operation report
```

## 2. Product Database Parser Specification

### Purpose
Convert the unstructured `final_bgw_products.txt` into a structured JSON database of products.

### Input
- Raw text file with product entries in various formats

### Output
- JSON file with structured product information:
  ```json
  [
    {
      "id": "M580E30X30X80RH",
      "full_name": "Solid Wood Exterior Door M580E",
      "category": "wood",
      "product_code": "M580E",
      "clean_name": "solid-wood-exterior-door-m580e",
      "normalized_name": "wood__solid-wood-exterior-door-m580e"
    },
    ...
  ]
  ```

### Algorithm
1. Read the input file line by line
2. Parse each line to extract:
   - Product ID (if available)
   - Full product name
   - Category (wood, iron, fiberglass, slab)
   - Product code (e.g., M580E, ID02)
3. Generate clean name by:
   - Converting to lowercase
   - Replacing spaces with hyphens
   - Removing special characters
4. Generate normalized name with format: `<category>__<clean-name>`
5. Write structured data to JSON file

### Error Handling
- Skip empty lines
- Handle missing product IDs
- Log parsing errors with line numbers

## 3. Image Mapping System Specification

### Purpose
Create a system to map the generic WhatsApp image filenames to BGW door products.

### Components

#### 3.1 Mapping Template
A JSON structure that will store the mapping information:
```json
{
  "WhatsApp Image 2026-01-30 at 9.12.55 AM_final.png": {
    "product_id": "ID0230X30X96RH",
    "category": "iron",
    "product_name": "Iron Exterior Door #ID02 Iron Door",
    "confidence": "high",
    "version": 1,
    "notes": "Distinctive scroll pattern"
  },
  ...
}
```

#### 3.2 Manual Mapping Process
Since visual matching without browser capabilities is challenging:

1. Create a spreadsheet or text-based form for manual mapping:
   ```
   | Image Filename | Category | Product ID | Notes |
   |---------------|----------|------------|-------|
   | WhatsApp Image 2026-01-30 at 9.12.55 AM_final.png | ? | ? | ? |
   ```

2. Process completed mapping form to generate the mapping JSON file.

#### 3.3 Visual Identification Guidelines

Create reference guides for each door category with key visual identifiers:

**Iron Doors**
- Distinctive scrollwork patterns
- Full-length glass panels
- Black metal frames
- Arched tops (common)

**Wood Doors**
- Solid wood construction
- Variety of finishes (dark, medium, light)
- Panel designs (e.g., 6-panel, craftsman)
- Decorative glass inserts (some models)

**Fiberglass Doors**
- Wood-like appearance but with fiberglass construction
- More consistent color/texture than real wood
- Often with decorative glass

**Slab Doors**
- Flat, unadorned surfaces
- No frames or trim
- Basic rectangular shape
- Various wood types (oak, mahogany, etc.)

## 4. Rename Script Specification

### Purpose
Rename all images in the target directory according to the specified format.

### Input
- Directory of images
- Product database JSON
- Image mapping JSON

### Output
- Renamed files in the format: `<category>__<product-name>.png`
- Multiple views will use: `<category>__<product-name>__v1.png`
- Unknown images will be renamed: `_unknown__needs-review.png`

### Algorithm
```bash
#!/bin/bash

# Configuration
SOURCE_DIR="public/bg-finals-4x"
PRODUCT_DB="data/product_database.json"
MAPPING_FILE="data/image_mapping.json"
UNKNOWN_PREFIX="_unknown__needs-review"
VERSION_SEPARATOR="__v"
LOG_FILE="output/rename_report.txt"

# Functions

function log() {
  echo "$1" | tee -a "$LOG_FILE"
}

function load_mapping() {
  # Load JSON mapping file into a variable
  # Handle errors if file doesn't exist or is invalid
}

function get_product_info() {
  # Extract product info from mapping using filename
  # Return category and clean name
}

function detect_duplicates() {
  # Check if target filename already exists
  # Return next available version number
}

function rename_file() {
  local src="$1"
  local category="$2"
  local clean_name="$3"
  
  # Validate source exists
  if [[ ! -f "$src" ]]; then
    log "ERROR: Source file not found: $src"
    return 1
  fi
  
  # Create base filename
  local base_name="${category}__${clean_name}"
  
  # Check for duplicates
  local version=$(detect_duplicates "$base_name")
  local target_name=""
  
  if [[ $version -gt 1 ]]; then
    target_name="${base_name}${VERSION_SEPARATOR}${version}.png"
  else
    target_name="${base_name}.png"
  fi
  
  # Perform the rename
  mv "$src" "$target_name"
  log "Renamed: $src → $target_name"
}

function handle_unknown() {
  local src="$1"
  local unknown_count="$2"
  local target_name="${UNKNOWN_PREFIX}_${unknown_count}.png"
  
  mv "$src" "$target_name"
  log "Unmarked: $src → $target_name (needs review)"
}

# Main script execution

# Initialize log
log "=== BGW Door Image Renaming ==="
log "Started: $(date)"

# Load mapping data
load_mapping

# Process each file in source directory
# For each file:
#   1. Look up in mapping
#   2. If found, rename according to category and product name
#   3. If not found, mark as unknown

# Log completion
log "Renaming complete: $(date)"
log "Total files: $total_count"
log "Successfully renamed: $success_count"
log "Marked for review: $unknown_count"
log "Errors: $error_count"
```

### Error Handling
- Log all operations to a report file
- Check for file existence before renaming
- Handle permission errors
- Count and report on successful renames, unknowns, and errors

## 5. Testing Strategy

### Unit Tests
- Test product parser with sample data
- Test rename functionality with sample files

### Integration Testing
- Test the entire workflow with a small subset of files
- Verify correct handling of:
  - Normal cases
  - Multiple angles of the same product
  - Unknown images
  - Special characters in filenames

### Acceptance Criteria
- All files are renamed according to the specified format
- Multiple angles are correctly versioned
- Unidentifiable images are properly flagged
- No duplicate filenames
- Complete log of all operations