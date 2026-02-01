# BGW Doors Image Renaming System - Implementation Guide

## Overview

The BGW Doors Image Renaming System is a comprehensive solution for renaming door product images from generic WhatsApp filenames to structured product names based on the BGW Doors catalog. The system handles visual matching of door images to products and creates standardized filenames in the format: `<category>__<product-name>.png`.

## System Architecture

### Directory Structure
```
katachi/
├── docs/                    # Documentation
├── plans/                  # Planning documents
├── src/                    # Source code for scripts
│   ├── parse_products.py   # Product database parser
│   ├── create_mapping.py   # Mapping creation tool
│   ├── rename_images.sh    # Main renaming script
│   └── test_rename.sh      # Test script
├── data/                   # Data files
│   ├── final_bgw_products.txt          # Original product list
│   ├── product_database_corrected.json # Structured product data
│   ├── image_mapping_template.json     # Template for manual mapping
│   └── test_mapping.json               # Test mapping file
├── output/                 # Logs and reports
└── public/bg-finals-4x/    # Source images to rename
```

### Components

1. **Product Database Parser** (`parse_products.py`)
   - Parses the unstructured `final_bgw_products.txt` file
   - Creates structured JSON database with categories, product codes, and clean names
   - Automatically categorizes products as wood, iron, fiberglass, or slab

2. **Mapping Template Generator** (`create_mapping.py`)
   - Creates a template JSON file for manually mapping images to products
   - Includes all image filenames and product references
   - Provides validation for completed mapping files

3. **Rename Script** (`rename_images.sh`)
   - Main script that performs the renaming operation
   - Handles multiple views of the same product with version suffixes
   - Flags unidentifiable images for manual review
   - Generates comprehensive logs and reports

## Installation and Setup

### Prerequisites
- Python 3.6+
- Bash shell
- jq (JSON processor) - install with `sudo apt-get install jq` or `brew install jq`

### Step 1: Prepare the Environment
```bash
# Clone or navigate to the project directory
cd /path/to/katachi

# Create necessary directories
mkdir -p src data output
```

### Step 2: Prepare Product Data
```bash
# Copy the product data file
cp "final_bgw_products (1).txt" data/final_bgw_products.txt

# Parse the product data
cd src
python3 parse_products.py ../data/final_bgw_products.txt ../data/product_database.json
```

### Step 3: Generate Mapping Template
```bash
# Generate a mapping template
python3 create_mapping.py generate ../data/image_mapping_template.json \
  --image-dir ../public/bg-finals-4x \
  --product-db ../data/product_database.json
```

## Usage Workflow

### Phase 1: Manual Mapping (Visual Identification)

1. **Open the mapping template** (`data/image_mapping_template.json`) in a text editor
2. **For each image**, fill in:
   - `product_id`: The product ID from the `product_reference` section
   - `category`: One of: `wood`, `iron`, `fiberglass`, `slab`
   - `product_name`: The full product name
   - `confidence`: `high`, `medium`, or `low`
   - `notes`: Any identification notes

3. **Save the completed mapping** as `data/image_mapping.json`

### Phase 2: Rename Images

```bash
# Make the rename script executable
chmod +x src/rename_images.sh

# Run the rename script
cd src
./rename_images.sh \
  --source ../public/bg-finals-4x \
  --mapping ../data/image_mapping.json \
  --output ../renamed_images
```

### Phase 3: Review Results

1. **Check the output directory** (`renamed_images/`) for renamed files
2. **Review the log file** (`output/rename_report.txt`) for statistics
3. **Check unknown images** (prefixed with `_unknown__needs-review`) for manual review

## File Naming Convention

### Standard Format
```
<category>__<product-name>.png
```

### Examples
- `wood__solid-wood-exterior-door-m580e.png`
- `iron__iron-exterior-door-id02-iron-door.png`
- `fiberglass__fiberglass-exterior-door-fd05.png`
- `slab__slab-solid-wood-door-580e.png`

### Multiple Views
For multiple angles of the same product:
- `wood__solid-wood-exterior-door-m580e__v1.png`
- `wood__solid-wood-exterior-door-m580e__v2.png`
- `wood__solid-wood-exterior-door-m580e__v3.png`

### Unknown Images
Unidentifiable images are renamed as:
- `_unknown__needs-review_1.png`
- `_unknown__needs-review_2.png`
- etc.

## Product Categories

The system recognizes four main door categories:

1. **Wood Doors**
   - Product codes typically start with "M" (e.g., M580E, M705A)
   - Keywords: "wood", "solid wood", "entry door"

2. **Iron Doors**
   - Product codes typically start with "ID" (e.g., ID02, ID07)
   - Keywords: "iron", "exterior door"

3. **Fiberglass Doors**
   - Product codes typically start with "FD" (e.g., FD05, FD280B)
   - Keywords: "fiberglass"

4. **Slab Doors**
   - Flat, unadorned door surfaces
   - Keywords: "slab"

## Error Handling and Logging

### Log Files
- `output/rename_report.txt`: Detailed log of all rename operations
- `renamed_images/rename_summary.txt`: Summary statistics

### Error Types
1. **Missing mapping**: Images without mappings are flagged as unknown
2. **Incomplete mapping**: Images with partial mappings are skipped
3. **File errors**: Permission issues or missing source files are logged
4. **Duplicate detection**: Automatic version numbering for duplicate filenames

### Validation
```bash
# Validate a mapping file
cd src
python3 create_mapping.py validate ../data/image_mapping.json
```

## Maintenance and Updates

### Adding New Products
1. Add new products to `data/final_bgw_products.txt`
2. Re-run the product parser:
   ```bash
   python3 parse_products.py ../data/final_bgw_products.txt ../data/product_database.json
   ```

### Adding New Images
1. Place new images in the source directory
2. Add entries to the mapping file
3. Run the rename script again

### Troubleshooting

#### Common Issues
1. **"jq not found"**: Install jq with `sudo apt-get install jq`
2. **"No images found"**: Check the source directory path
3. **"Invalid JSON"**: Validate the mapping file with the validation command
4. **"Permission denied"**: Ensure write permissions for output directories

#### Debug Mode
For debugging, you can add `set -x` at the beginning of `rename_images.sh` to see detailed execution.

## Visual Identification Guidelines

### Iron Doors
- Distinctive scrollwork patterns
- Full-length glass panels
- Black metal frames
- Arched tops (common)

### Wood Doors
- Solid wood construction
- Variety of finishes (dark, medium, light)
- Panel designs (e.g., 6-panel, craftsman)
- Decorative glass inserts (some models)

### Fiberglass Doors
- Wood-like appearance but with fiberglass construction
- More consistent color/texture than real wood
- Often with decorative glass

### Slab Doors
- Flat, unadorned surfaces
- No frames or trim
- Basic rectangular shape
- Various wood types (oak, mahogany, etc.)

## Performance Considerations

- The system can handle hundreds of images efficiently
- Processing time is linear with the number of images
- Memory usage is minimal (only loads mapping data)
- Disk space: Creates copies of images, not moves

## Security Considerations

- No external network calls
- All operations are local
- No sensitive data is exposed
- File operations are logged for auditability

## Future Enhancements

Potential improvements for future versions:
1. **Automated visual matching**: Use computer vision for image recognition
2. **Batch processing**: Handle multiple directories simultaneously
3. **Web interface**: GUI for manual mapping
4. **Integration**: Direct integration with e-commerce platforms
5. **Metadata extraction**: Extract and preserve image metadata

## Support

For issues or questions:
1. Check the log files for error messages
2. Validate mapping files before running
3. Ensure all prerequisites are installed
4. Review this documentation for usage guidelines