#!/usr/bin/env python3
"""
BGW Doors Product Database Parser

This script parses the final_bgw_products.txt file and creates a structured
JSON database of door products with categories, product codes, and clean names.

Usage:
    python parse_products.py input_file.txt output_file.json
"""

import json
import re
import sys
import os
from typing import List, Dict, Optional, Tuple


def clean_product_name(name: str) -> str:
    """
    Clean a product name by:
    1. Converting to lowercase
    2. Replacing spaces with hyphens
    3. Removing special characters
    4. Removing extra hyphens
    """
    if not name:
        return ""
    
    # Convert to lowercase
    name = name.lower()
    
    # Replace spaces with hyphens
    name = name.replace(" ", "-")
    
    # Remove special characters (keep only alphanumeric, hyphens, and underscores)
    name = re.sub(r'[^a-z0-9\-_]', '', name)
    
    # Remove multiple consecutive hyphens
    name = re.sub(r'-+', '-', name)
    
    # Remove leading/trailing hyphens
    name = name.strip('-')
    
    return name


def extract_product_code(full_name: str) -> str:
    """
    Extract product code from full product name.
    Looks for patterns like M580E, ID02, FD05, etc.
    """
    # Common patterns for product codes
    patterns = [
        r'\b(M\d{3}[A-Z]?)\b',  # M580E, M705A, M300I
        r'\b(ID\d{2})\b',       # ID02, ID03, ID07
        r'\b(FD\d{2,3}[A-Z]?)\b',  # FD05, FD280B, FD04W
        r'\b(mi\d{3})\b',       # mi906, mi905
        r'\b(\d{3}[A-Z]?)\b',   # 580E, 705A
        r'\b([A-Z]{2,5})\b',    # Rome, Paris, London
    ]
    
    for pattern in patterns:
        match = re.search(pattern, full_name, re.IGNORECASE)
        if match:
            return match.group(1).upper()
    
    # If no pattern matches, try to extract any alphanumeric code
    match = re.search(r'\b([A-Z0-9]{3,8})\b', full_name)
    if match:
        return match.group(1).upper()
    
    return ""


def determine_category(full_name: str) -> str:
    """
    Determine the category of a door based on its name.
    Categories: wood, iron, fiberglass, slab
    """
    name_lower = full_name.lower()
    
    # Check for category keywords (order matters - more specific first)
    # First check for iron doors - look for "iron" or product codes starting with "ID"
    if "iron" in name_lower or re.search(r'\bid\d{2}\b', name_lower):
        return "iron"
    # Check for fiberglass doors
    elif "fiberglass" in name_lower or re.search(r'\bfd\d{2,3}', name_lower):
        return "fiberglass"
    # Check for slab doors
    elif "slab" in name_lower:
        return "slab"
    # Check for wood doors - look for "wood" or product codes starting with "M"
    elif "wood" in name_lower or re.search(r'\bm\d{3}[a-z]?\b', name_lower):
        return "wood"
    # Check for hardware (Emtek)
    elif "emtek" in name_lower:
        return "hardware"
    else:
        # Default to wood for unknown (most doors are wood)
        return "wood"


def parse_product_line(line: str) -> Optional[Dict]:
    """
    Parse a single line from the product file.
    Expected format: "ID - Product Name" or "Product Name"
    """
    line = line.strip()
    if not line:
        return None
    
    # Skip lines that are just numbers or empty
    if line.isdigit() or len(line) < 3:
        return None
    
    # Try to split by dash or hyphen
    parts = re.split(r'\s*-\s*', line, maxsplit=1)
    
    if len(parts) == 2:
        # Format: "ID - Product Name"
        product_id = parts[0].strip()
        full_name = parts[1].strip()
    else:
        # Format: "Product Name" (no ID)
        product_id = ""
        full_name = parts[0].strip()
    
    # Skip if it's just a number (like SKU numbers)
    if product_id and product_id.isdigit() and len(product_id) > 8:
        product_id = ""
    
    # Determine category
    category = determine_category(full_name)
    
    # Skip hardware category (Emtek products)
    if category == "hardware":
        return None
    
    # Extract product code
    product_code = extract_product_code(full_name)
    
    # Clean name for filename
    clean_name = clean_product_name(full_name)
    
    # Create normalized name
    normalized_name = f"{category}__{clean_name}"
    
    return {
        "id": product_id,
        "full_name": full_name,
        "category": category,
        "product_code": product_code,
        "clean_name": clean_name,
        "normalized_name": normalized_name
    }


def parse_products_file(input_file: str) -> List[Dict]:
    """
    Parse the entire products file and return a list of product dictionaries.
    """
    products = []
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: Input file not found: {input_file}")
        return []
    except Exception as e:
        print(f"Error reading file {input_file}: {e}")
        return []
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip()
        if not line:
            continue
        
        product = parse_product_line(line)
        if product:
            products.append(product)
        else:
            print(f"Warning: Could not parse line {line_num}: {line}")
    
    return products


def save_products_json(products: List[Dict], output_file: str) -> bool:
    """
    Save products to a JSON file.
    """
    try:
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({"products": products}, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully saved {len(products)} products to {output_file}")
        return True
    except Exception as e:
        print(f"Error saving JSON file {output_file}: {e}")
        return False


def main():
    """
    Main function to parse command line arguments and run the parser.
    """
    if len(sys.argv) != 3:
        print("Usage: python parse_products.py <input_file> <output_file>")
        print("Example: python parse_products.py data/final_bgw_products.txt data/product_database.json")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    print(f"Parsing products from {input_file}...")
    products = parse_products_file(input_file)
    
    if not products:
        print("No products were parsed. Check the input file format.")
        sys.exit(1)
    
    print(f"Parsed {len(products)} products.")
    
    # Print summary by category
    categories = {}
    for product in products:
        category = product["category"]
        categories[category] = categories.get(category, 0) + 1
    
    print("\nProduct summary by category:")
    for category, count in sorted(categories.items()):
        print(f"  {category}: {count} products")
    
    # Save to JSON
    if save_products_json(products, output_file):
        print(f"\nProduct database created successfully: {output_file}")
    else:
        print("\nFailed to create product database.")
        sys.exit(1)


if __name__ == "__main__":
    main()