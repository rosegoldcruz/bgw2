# BGW Doors Image Renaming System - Executive Summary

## Project Overview

We've designed a comprehensive system for renaming door product images from generic WhatsApp filenames to structured product names based on the BGW Doors catalog. The system addresses the challenge of visually matching door images to their corresponding products and creating standardized filenames.

## Solution Architecture

The solution consists of three key components:

1. **Product Database**: A structured JSON database derived from the `final_bgw_products.txt` file, containing all door products categorized by type (wood, iron, fiberglass, slab).

2. **Image Mapping System**: A process for associating generic WhatsApp filenames with specific door products, accommodating the visual matching requirement.

3. **Rename Script**: A bash script that processes images according to the mapping and renames them following the required format (`<category>__<exact-product-name>.png`).

## Key Technical Features

- **Category-based Naming**: All files are prefixed with their category (wood, iron, fiberglass, slab)
- **Standardized Formatting**: Names are converted to lowercase with spaces replaced by hyphens
- **Version Handling**: Multiple angles of the same product are handled with version suffixes (`__v1`, `__v2`, etc.)
- **Unknown Image Handling**: Unidentifiable images are flagged for manual review
- **Comprehensive Logging**: Detailed reports track all rename operations

## Implementation Strategy

Given the visual nature of the matching task and the unavailability of browser capabilities, our strategy employs a semi-manual approach:

1. **Database Preparation**: Automatically parse and structure product information from the text file
2. **Manual Mapping Creation**: Use a template-based system for manually associating images with products
3. **Automated Renaming**: Once the mapping is complete, automatically rename all files according to the specification

## Directory Structure

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

## Visual Identification Guidelines

We've created reference guides for each door category with key visual identifiers to assist in the matching process:

- **Iron Doors**: Distinctive scrollwork patterns, full-length glass panels, black metal frames
- **Wood Doors**: Solid wood construction, variety of finishes, panel designs, decorative glass inserts
- **Fiberglass Doors**: Wood-like appearance but with fiberglass construction, consistent color/texture
- **Slab Doors**: Flat surfaces, no frames or trim, basic rectangular shape, various wood types

## Next Steps

The architectural design is complete and ready for implementation. The next steps would be:

1. **Implementation Phase**:
   - Create the project directory structure
   - Implement the product database parser in Python
   - Implement the mapping template generator
   - Implement the bash renaming script

2. **Testing Phase**:
   - Test with a small subset of images
   - Verify correct handling of multiple views and unknown images
   - Validate the rename report format

3. **Deployment Phase**:
   - Run the full process on the entire image set
   - Review any unknown images
   - Document any edge cases encountered

## Conclusion

The BGW Doors Image Renaming System provides a robust solution for the product image renaming challenge. By combining automated processing with a flexible mapping system, it can efficiently handle the renaming of all door product images while maintaining traceability and ensuring proper categorization.

The modular architecture allows for easy maintenance and extension, and the comprehensive documentation ensures that the system can be effectively used and maintained over time.