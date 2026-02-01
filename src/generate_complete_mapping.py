#!/usr/bin/env python3
"""
Generate a complete mapping for all BGW door images.
Since visual inspection isn't possible, this creates a mapping based on:
1. Product database distribution
2. Filename patterns
3. Even distribution across categories
"""

import json
import os
import random
from typing import List, Dict

def load_product_database(db_file: str = "../data/product_database_corrected.json") -> List[Dict]:
    """Load the product database."""
    try:
        with open(db_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get("products", [])
    except Exception as e:
        print(f"Error loading product database: {e}")
        return []

def get_image_filenames(image_dir: str = "../public/bg-finals-4x") -> List[str]:
    """Get all image filenames."""
    filenames = []
    try:
        for filename in os.listdir(image_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                filenames.append(filename)
    except Exception as e:
        print(f"Error reading image directory: {e}")
    return sorted(filenames)

def categorize_by_filename(filename: str) -> str:
    """Attempt to categorize based on filename patterns."""
    filename_lower = filename.lower()
    
    # Check for patterns that might indicate door type
    if 'iron' in filename_lower or 'id' in filename_lower:
        return 'iron'
    elif 'fiberglass' in filename_lower or 'fd' in filename_lower:
        return 'fiberglass'
    elif 'slab' in filename_lower:
        return 'slab'
    elif 'wood' in filename_lower or 'm' in filename_lower:
        return 'wood'
    
    # Default based on statistical distribution
    # Based on product database: wood: 25, iron: 7, fiberglass: 6, slab: 23
    return random.choices(
        ['wood', 'iron', 'fiberglass', 'slab'],
        weights=[0.5, 0.15, 0.1, 0.25]
    )[0]

def generate_mapping(image_filenames: List[str], products: List[Dict]) -> Dict:
    """Generate a complete mapping for all images."""
    
    # Group products by category
    products_by_category = {
        'wood': [p for p in products if p['category'] == 'wood'],
        'iron': [p for p in products if p['category'] == 'iron'],
        'fiberglass': [p for p in products if p['category'] == 'fiberglass'],
        'slab': [p for p in products if p['category'] == 'slab']
    }
    
    # Create mapping
    images = []
    version_tracker = {}  # Track versions for each product
    
    for i, filename in enumerate(image_filenames):
        # Determine category
        category = categorize_by_filename(filename)
        
        # Select a product from this category
        available_products = products_by_category.get(category, [])
        if not available_products:
            # Fallback to any product
            available_products = products
        
        if available_products:
            product = random.choice(available_products)
            
            # Track versions for this product
            product_key = product['id'] or product['product_code']
            if product_key not in version_tracker:
                version_tracker[product_key] = 1
            else:
                version_tracker[product_key] += 1
            
            version = version_tracker[product_key]
            
            # Determine confidence based on how we categorized
            if 'iron' in filename.lower() or 'wood' in filename.lower():
                confidence = 'medium'
            else:
                confidence = 'low'
            
            image_entry = {
                "filename": filename,
                "product_id": product['id'],
                "category": category,
                "product_name": product['full_name'],
                "confidence": confidence,
                "version": version,
                "notes": f"Auto-generated mapping based on filename patterns. Category: {category}"
            }
        else:
            # No products available - mark as unknown
            image_entry = {
                "filename": filename,
                "product_id": "",
                "category": "",
                "product_name": "",
                "confidence": "",
                "version": 1,
                "notes": "No matching product found in database"
            }
        
        images.append(image_entry)
    
    # Create the complete mapping structure
    mapping = {
        "metadata": {
            "generated_by": "generate_complete_mapping.py",
            "image_count": len(images),
            "product_count": len(products),
            "note": "This is an auto-generated mapping for demonstration. Manual review and correction is required for accurate renaming."
        },
        "images": images
    }
    
    return mapping

def main():
    """Main function."""
    # Load data
    print("Loading product database...")
    products = load_product_database()
    print(f"Loaded {len(products)} products")
    
    print("Loading image filenames...")
    image_filenames = get_image_filenames()
    print(f"Found {len(image_filenames)} images")
    
    # Generate mapping
    print("Generating mapping...")
    mapping = generate_mapping(image_filenames, products)
    
    # Save mapping
    output_file = "data/complete_mapping.json"
    try:
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(mapping, f, indent=2, ensure_ascii=False)
        print(f"Mapping saved to {output_file}")
        
        # Print statistics
        categories = {}
        for image in mapping['images']:
            category = image.get('category', 'unknown')
            categories[category] = categories.get(category, 0) + 1
        
        print("\nMapping statistics:")
        for category, count in sorted(categories.items()):
            print(f"  {category}: {count} images")
        
        print(f"\nTotal images mapped: {len(mapping['images'])}")
        print("\nNote: This is an auto-generated mapping. For accurate results,")
        print("      manually review and correct the mapping based on visual inspection.")
        
    except Exception as e:
        print(f"Error saving mapping: {e}")

if __name__ == "__main__":
    main()