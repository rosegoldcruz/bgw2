# BGW Doors Image Renaming System

A comprehensive system for renaming door product images from generic WhatsApp filenames to structured product names based on the BGW Doors catalog.

## 🚀 Quick Start

### Prerequisites
- Python 3.6+
- Bash shell
- jq (JSON processor)

### Installation
```bash
# Install jq on Ubuntu/Debian
sudo apt-get install jq

# Or on macOS
brew install jq
```

### Basic Usage
```bash
# 1. Parse product database
python3 src/parse_products.py data/final_bgw_products.txt data/product_database.json

# 2. Generate mapping template
python3 src/create_mapping.py generate data/image_mapping_template.json

# 3. Manually fill in the mapping template (see docs/IMPLEMENTATION_GUIDE.md)

# 4. Rename images
chmod +x src/rename_images.sh
./src/rename_images.sh --output renamed_images
```

## 📁 Project Structure

```
katachi/
├── README.md                 # This file
├── docs/                     # Detailed documentation
├── plans/                    # Planning documents
├── src/                      # Source scripts
│   ├── parse_products.py     # Product database parser
│   ├── create_mapping.py     # Mapping creation tool
│   ├── rename_images.sh      # Main renaming script
│   └── test_rename.sh        # Test script
├── data/                     # Data files
│   ├── final_bgw_products.txt          # Original product list
│   ├── product_database.json           # Structured product data
│   ├── image_mapping_template.json     # Template for manual mapping
│   └── test_mapping.json               # Test mapping file
├── output/                   # Logs and reports
└── public/bg-finals-4x/      # Source images to rename
```

## 🎯 Features

- **Automated Product Parsing**: Converts unstructured product data into structured JSON
- **Flexible Mapping System**: Template-based approach for manual image-to-product matching
- **Intelligent Renaming**: Handles multiple views, unknown images, and duplicate detection
- **Comprehensive Logging**: Detailed reports of all rename operations
- **Error Handling**: Robust error detection and recovery

## 📋 File Naming Convention

Renamed files follow this format:
```
<category>__<product-name>.png
```

### Examples
- `wood__solid-wood-exterior-door-m580e.png`
- `iron__iron-exterior-door-id02-iron-door.png`
- `fiberglass__fiberglass-exterior-door-fd05.png`

### Multiple Views
- `wood__solid-wood-exterior-door-m580e__v1.png`
- `wood__solid-wood-exterior-door-m580e__v2.png`

### Unknown Images
- `_unknown__needs-review_1.png`
- `_unknown__needs-review_2.png`

## 🔧 Detailed Workflow

### Phase 1: Preparation
1. **Parse Product Database**: Extract structured product information
2. **Generate Mapping Template**: Create a JSON template for manual mapping

### Phase 2: Manual Mapping
1. **Visual Identification**: Match images to products using reference screenshots
2. **Fill Mapping Template**: For each image, specify product ID, category, and name
3. **Validate Mapping**: Check for errors and completeness

### Phase 3: Execution
1. **Run Rename Script**: Process all images according to the mapping
2. **Review Results**: Check renamed files and unknown images
3. **Generate Reports**: Analyze rename statistics and logs

## 📊 Product Categories

The system recognizes four door categories:

| Category | Key Features | Example Product Codes |
|----------|--------------|----------------------|
| **Wood** | Solid wood construction, panel designs | M580E, M705A, M577 |
| **Iron** | Scrollwork patterns, glass panels | ID02, ID03, ID07 |
| **Fiberglass** | Wood-like appearance, fiberglass construction | FD05, FD280B, FD800 |
| **Slab** | Flat surfaces, no frames or trim | 580E, M580C, M705A |

## 🛠️ Script Reference

### `parse_products.py`
```bash
python3 parse_products.py <input_file> <output_file>
```
Parses product data and creates structured JSON database.

### `create_mapping.py`
```bash
# Generate template
python3 create_mapping.py generate <output_file>

# Validate mapping
python3 create_mapping.py validate <mapping_file>
```
Creates and validates image-to-product mapping files.

### `rename_images.sh`
```bash
./rename_images.sh [OPTIONS]

Options:
  -s, --source DIR     Source directory (default: public/bg-finals-4x)
  -m, --mapping FILE   Mapping JSON file (default: data/image_mapping.json)
  -o, --output DIR     Output directory (default: renamed_images)
  -h, --help           Show help message
```
Main script for renaming images.

## 📝 Documentation

- **[Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)**: Detailed setup and usage instructions
- **Planning Documents**: Architecture and design decisions in `plans/` directory
- **Sample Files**: Example configurations in `data/` directory

## 🧪 Testing

Run the test script to verify basic functionality:
```bash
chmod +x src/test_rename.sh
./src/test_rename.sh
```

## 🔍 Troubleshooting

### Common Issues

1. **"jq not found"**
   ```bash
   sudo apt-get install jq  # Ubuntu/Debian
   brew install jq          # macOS
   ```

2. **"No images found"**
   - Check the source directory path
   - Ensure images have correct extensions (.png, .jpg, .jpeg)

3. **"Invalid JSON"**
   ```bash
   python3 src/create_mapping.py validate data/image_mapping.json
   ```

4. **"Permission denied"**
   ```bash
   chmod +x src/rename_images.sh
   chmod -R 755 output/ renamed_images/
   ```

### Debug Mode
Add `set -x` at the beginning of `rename_images.sh` for detailed execution tracing.

## 📈 Performance

- Processes hundreds of images efficiently
- Linear time complexity with number of images
- Minimal memory usage
- Comprehensive logging for auditability

## 🔮 Future Enhancements

1. **Automated Visual Matching**: Computer vision for image recognition
2. **Batch Processing**: Handle multiple directories simultaneously
3. **Web Interface**: GUI for manual mapping
4. **Integration**: Direct integration with e-commerce platforms
5. **Metadata Preservation**: Extract and preserve image metadata

## 📄 License

This project is developed for BGW Doors image management.

## 🤝 Support

For issues or questions:
1. Check the log files in `output/` directory
2. Review the [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)
3. Validate mapping files before running
4. Ensure all prerequisites are installed

---

**Note**: This system requires manual visual matching of images to products due to the visual nature of door identification. The mapping template system provides a structured approach for this manual process.