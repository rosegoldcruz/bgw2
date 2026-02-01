#!/usr/bin/env python3
"""
BGW Doors Image Mapping Template Generator

This script creates a template JSON file for mapping WhatsApp image filenames
to BGW door products. The template can be manually filled in and then used
by the rename script.

Usage:
    python create_mapping.py --generate-template output_file.json
    python create_mapping.py --validate mapping_file.json
"""

import json
import os
import sys
import argparse
from typing import List, Dict, Any


def get_image_filenames(image_dir: str = "public/bg-finals-4x") -> List[str]:
    """
    Get all image filenames from the target directory.
    """
    filenames = []
    
    try:
        if os.path.exists(image_dir):
            for filename in os.listdir(image_dir):
                if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    filenames.append(filename)
        else:
            print(f"Warning: Image directory not found: {image_dir}")
            # Create some sample filenames for testing
            filenames = [
                "WhatsApp Image 2026-01-30 at 9.12.55 AM_final.png",
                "WhatsApp Image 2026-01-30 at 9.12.56 AM (1)_final.png",
                "WhatsApp Image 2026-01-30 at 9.12.56 AM (2)_final.png",
                "WhatsApp Image 2026-01-30 at 9.12.56 AM (3)_final.png",
                "WhatsApp Image 2026-01-30 at 9.12.56 AM_final.png"
            ]
    except Exception as e:
        print(f"Error reading image directory {image_dir}: {e}")
        filenames = []
    
    return sorted(filenames)


def load_product_database(db_file: str = "data/product_database_corrected.json") -> List[Dict]:
    """
    Load the product database from JSON file.
    """
    try:
        with open(db_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get("products", [])
    except FileNotFoundError:
        print(f"Warning: Product database not found: {db_file}")
        return []
    except Exception as e:
        print(f"Error loading product database {db_file}: {e}")
        return []


def generate_mapping_template(image_dir: str, output_file: str, product_db_file: str) -> bool:
    """
    Generate a mapping template JSON file.
    """
    # Get image filenames
    image_filenames = get_image_filenames(image_dir)
    
    if not image_filenames:
        print(f"No image files found in {image_dir}")
        return False
    
    # Load product database
    products = load_product_database(product_db_file)
    
    # Create mapping template
    mapping_template = {
        "metadata": {
            "generated_by": "create_mapping.py",
            "image_count": len(image_filenames),
            "product_count": len(products),
            "image_directory": image_dir,
            "product_database": product_db_file
        },
        "images": []
    }
    
    # Add each image with empty mapping
    for filename in image_filenames:
        image_entry = {
            "filename": filename,
            "product_id": "",  # To be filled in manually
            "category": "",    # To be filled in manually (wood, iron, fiberglass, slab)
            "product_name": "", # To be filled in manually
            "confidence": "",  # high, medium, low (to be filled in)
            "version": 1,      # Default version (will be auto-incremented for duplicates)
            "notes": ""        # Any notes about the image or identification
        }
        mapping_template["images"].append(image_entry)
    
    # Add product reference section for convenience
    mapping_template["product_reference"] = []
    for product in products[:50]:  # Include first 50 products as reference
        mapping_template["product_reference"].append({
            "id": product.get("id", ""),
            "full_name": product.get("full_name", ""),
            "category": product.get("category", ""),
            "product_code": product.get("product_code", "")
        })
    
    # Save to file
    try:
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(mapping_template, f, indent=2, ensure_ascii=False)
        
        print(f"Generated mapping template with {len(image_filenames)} images")
        print(f"Template saved to: {output_file}")
        print("\nNext steps:")
        print("1. Open the JSON file in a text editor")
        print("2. For each image, fill in:")
        print("   - product_id: The product ID from the product_reference section")
        print("   - category: wood, iron, fiberglass, or slab")
        print("   - product_name: The full product name")
        print("   - confidence: high, medium, or low")
        print("   - notes: Any identification notes")
        print("3. Save the file and run the rename script")
        
        return True
    except Exception as e:
        print(f"Error saving mapping template {output_file}: {e}")
        return False


def validate_mapping_file(mapping_file: str) -> bool:
    """
    Validate a mapping JSON file.
    """
    try:
        with open(mapping_file, 'r', encoding='utf-8') as f:
            mapping = json.load(f)
        
        # Check required structure
        if "images" not in mapping:
            print(f"Error: Mapping file missing 'images' key")
            return False
        
        images = mapping.get("images", [])
        if not images:
            print(f"Warning: Mapping file contains no images")
            return True  # Empty but valid
        
        # Validate each image entry
        errors = []
        for i, image in enumerate(images):
            if "filename" not in image:
                errors.append(f"Image {i}: Missing 'filename'")
            
            # Check if mapping is filled in
            product_id = image.get("product_id", "")
            category = image.get("category", "")
            product_name = image.get("product_name", "")
            
            if not product_id and not category and not product_name:
                # This is OK - it's just unmapped
                pass
            elif product_id and category and product_name:
                # Check category is valid
                valid_categories = ["wood", "iron", "fiberglass", "slab", "unknown"]
                if category not in valid_categories:
                    errors.append(f"Image {i} ({image.get('filename', 'unknown')}): Invalid category '{category}'")
            else:
                # Partially filled - warn but don't error
                print(f"Warning: Image {i} ({image.get('filename', 'unknown')}) has incomplete mapping")
        
        if errors:
            print(f"Validation errors in {mapping_file}:")
            for error in errors:
                print(f"  - {error}")
            return False
        else:
            print(f"Mapping file {mapping_file} is valid")
            
            # Count statistics
            total = len(images)
            mapped = sum(1 for img in images if img.get("product_id") and img.get("category"))
            unmapped = total - mapped
            
            print(f"Total images: {total}")
            print(f"Mapped images: {mapped}")
            print(f"Unmapped images: {unmapped}")
            
            return True
            
    except FileNotFoundError:
        print(f"Error: Mapping file not found: {mapping_file}")
        return False
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in {mapping_file}: {e}")
        return False
    except Exception as e:
        print(f"Error validating {mapping_file}: {e}")
        return False


def main():
    """
    Main function to handle command line arguments.
    """
    parser = argparse.ArgumentParser(
        description="BGW Doors Image Mapping Template Generator"
    )
    
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")
    
    # Generate template command
    gen_parser = subparsers.add_parser("generate", help="Generate a mapping template")
    gen_parser.add_argument("output_file", help="Output JSON file path")
    gen_parser.add_argument("--image-dir", default="public/bg-finals-4x",
                          help="Directory containing images (default: public/bg-finals-4x)")
    gen_parser.add_argument("--product-db", default="data/product_database_corrected.json",
                          help="Product database JSON file (default: data/product_database_corrected.json)")
    
    # Validate command
    val_parser = subparsers.add_parser("validate", help="Validate a mapping file")
    val_parser.add_argument("mapping_file", help="Mapping JSON file to validate")
    
    args = parser.parse_args()
    
    if args.command == "generate":
        success = generate_mapping_template(
            args.image_dir,
            args.output_file,
            args.product_db
        )
        sys.exit(0 if success else 1)
    
    elif args.command == "validate":
        success = validate_mapping_file(args.mapping_file)
        sys.exit(0 if success else 1)
    
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()