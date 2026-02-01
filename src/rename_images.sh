#!/bin/bash

# BGW Doors Image Renaming Script
# This script renames door product images based on a mapping JSON file.
# Format: <category>__<product-name>.png
# Multiple views: <category>__<product-name>__v1.png, __v2.png, etc.
# Unknown images: _unknown__needs-review.png

set -euo pipefail

# Configuration
DEFAULT_SOURCE_DIR="public/bg-finals-4x"
DEFAULT_MAPPING_FILE="data/image_mapping.json"
DEFAULT_OUTPUT_DIR="renamed_images"
LOG_FILE="output/rename_report.txt"
UNKNOWN_PREFIX="_unknown__needs-review"
VERSION_SEPARATOR="__v"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global counters
TOTAL_FILES=0
RENAMED_COUNT=0
UNKNOWN_COUNT=0
ERROR_COUNT=0
SKIPPED_COUNT=0

# Helper functions
log_message() {
    local message="$1"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${message}"
    echo "[${timestamp}] ${message}" >> "$LOG_FILE"
}

log_success() {
    log_message "${GREEN}✓ $1${NC}"
}

log_warning() {
    log_message "${YELLOW}⚠ $1${NC}"
}

log_error() {
    log_message "${RED}✗ $1${NC}"
}

log_info() {
    log_message "${BLUE}ℹ $1${NC}"
}

clean_filename() {
    local name="$1"
    # Convert to lowercase
    name=$(echo "$name" | tr '[:upper:]' '[:lower:]')
    # Replace spaces with hyphens
    name=${name// /-}
    # Remove special characters (keep only alphanumeric, hyphens, and underscores)
    name=$(echo "$name" | sed 's/[^a-z0-9_-]//g')
    # Remove multiple consecutive hyphens
    name=$(echo "$name" | sed 's/--*/-/g')
    # Remove leading/trailing hyphens
    name=$(echo "$name" | sed 's/^-//; s/-$//')
    echo "$name"
}

check_dependencies() {
    local missing_deps=()
    
    # Check for jq (JSON processor)
    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "Missing dependencies: ${missing_deps[*]}"
        log_error "Please install missing dependencies and try again."
        log_error "For Ubuntu/Debian: sudo apt-get install jq"
        log_error "For macOS: brew install jq"
        exit 1
    fi
}

validate_mapping_file() {
    local mapping_file="$1"
    
    if [ ! -f "$mapping_file" ]; then
        log_error "Mapping file not found: $mapping_file"
        return 1
    fi
    
    # Check if it's valid JSON
    if ! jq empty "$mapping_file" 2>/dev/null; then
        log_error "Invalid JSON in mapping file: $mapping_file"
        return 1
    fi
    
    # Check for required structure
    if ! jq -e '.images' "$mapping_file" > /dev/null 2>&1; then
        log_error "Mapping file missing 'images' array: $mapping_file"
        return 1
    fi
    
    return 0
}

load_mapping() {
    local mapping_file="$1"
    
    # Use jq to extract mapping into a more usable format
    # Create an associative array (requires bash 4+)
    declare -gA IMAGE_MAPPING
    
    # Read mapping from JSON file
    local count=0
    while IFS= read -r line; do
        local filename
        local product_id
        local category
        local product_name
        local confidence
        local version
        local notes
        
        filename=$(echo "$line" | jq -r '.filename // ""')
        product_id=$(echo "$line" | jq -r '.product_id // ""')
        category=$(echo "$line" | jq -r '.category // ""')
        product_name=$(echo "$line" | jq -r '.product_name // ""')
        confidence=$(echo "$line" | jq -r '.confidence // ""')
        version=$(echo "$line" | jq -r '.version // 1')
        notes=$(echo "$line" | jq -r '.notes // ""')
        
        if [ -n "$filename" ]; then
            # Store mapping as a colon-separated string
            IMAGE_MAPPING["$filename"]="${product_id}:${category}:${product_name}:${confidence}:${version}:${notes}"
            count=$((count + 1))
        fi
    done < <(jq -c '.images[]' "$mapping_file")
    
    log_info "Loaded $count image mappings from $mapping_file"
}

get_product_mapping() {
    local filename="$1"
    local mapping="${IMAGE_MAPPING[$filename]:-}"
    
    if [ -z "$mapping" ]; then
        echo ""
        return 1
    fi
    
    echo "$mapping"
}

detect_duplicate_targets() {
    local base_name="$1"
    local output_dir="$2"
    local version=1
    
    while [ -f "${output_dir}/${base_name}${VERSION_SEPARATOR}${version}.png" ] || \
          [ -f "${output_dir}/${base_name}.png" ] && [ $version -eq 1 ]; do
        version=$((version + 1))
    done
    
    # If version 1 file doesn't exist, use version 1
    if [ $version -eq 1 ] && [ ! -f "${output_dir}/${base_name}.png" ]; then
        echo 1
    else
        echo $version
    fi
}

rename_image() {
    local src_file="$1"
    local output_dir="$2"
    local mapping="$3"
    
    # Parse mapping components
    IFS=':' read -r product_id category product_name confidence version notes <<< "$mapping"
    
    # Check if this is an unknown image
    if [ -z "$product_id" ] && [ -z "$category" ] && [ -z "$product_name" ]; then
        UNKNOWN_COUNT=$((UNKNOWN_COUNT + 1))
        local target_name="${UNKNOWN_PREFIX}_${UNKNOWN_COUNT}.png"
        
        if cp "$src_file" "${output_dir}/${target_name}"; then
            log_success "Copied unknown image: $src_file → $target_name"
            return 0
        else
            log_error "Failed to copy unknown image: $src_file"
            ERROR_COUNT=$((ERROR_COUNT + 1))
            return 1
        fi
    fi
    
    # Validate required fields
    if [ -z "$category" ] || [ -z "$product_name" ]; then
        log_warning "Incomplete mapping for $src_file (missing category or product name)"
        SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
        return 1
    fi
    
    # Clean the product name for filename
    local clean_name
    clean_name=$(clean_filename "$product_name")
    
    # Create base filename
    local base_name="${category}__${clean_name}"
    
    # Check for duplicates and get appropriate version
    local final_version
    final_version=$(detect_duplicate_targets "$base_name" "$output_dir")
    
    # Construct final target name
    local target_name
    if [ "$final_version" -eq 1 ]; then
        target_name="${base_name}.png"
    else
        target_name="${base_name}${VERSION_SEPARATOR}${final_version}.png"
    fi
    
    # Perform the copy/rename
    if cp "$src_file" "${output_dir}/${target_name}"; then
        RENAMED_COUNT=$((RENAMED_COUNT + 1))
        log_success "Renamed: $src_file → $target_name (v${final_version})"
        return 0
    else
        log_error "Failed to rename: $src_file → $target_name"
        ERROR_COUNT=$((ERROR_COUNT + 1))
        return 1
    fi
}

process_images() {
    local source_dir="$1"
    local output_dir="$2"
    local mapping_file="$3"
    
    log_info "Starting image processing..."
    log_info "Source directory: $source_dir"
    log_info "Output directory: $output_dir"
    log_info "Mapping file: $mapping_file"
    
    # Create output directory if it doesn't exist
    mkdir -p "$output_dir"
    
    # Load mapping data
    load_mapping "$mapping_file"
    
    # Process each file in source directory
    local processed=0
    # Use find to handle cases where no files match the pattern
    while IFS= read -r -d '' src_file; do
        local filename
        filename=$(basename "$src_file")
        TOTAL_FILES=$((TOTAL_FILES + 1))
        
        # Get mapping for this file
        local mapping
        mapping=$(get_product_mapping "$filename")
        
        if [ -n "$mapping" ]; then
            rename_image "$src_file" "$output_dir" "$mapping"
        else
            # No mapping found - treat as unknown
            UNKNOWN_COUNT=$((UNKNOWN_COUNT + 1))
            local target_name="${UNKNOWN_PREFIX}_${UNKNOWN_COUNT}.png"
            
            if cp "$src_file" "${output_dir}/${target_name}"; then
                log_warning "No mapping found for $filename → $target_name"
            else
                log_error "Failed to copy unmapped image: $filename"
                ERROR_COUNT=$((ERROR_COUNT + 1))
            fi
        fi
        
        processed=$((processed + 1))
        
        # Progress indicator
        if [ $((processed % 10)) -eq 0 ]; then
            log_info "Processed $processed files..."
        fi
    done < <(find "$source_dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)
    
    log_info "Processing complete. Total files processed: $processed"
}

generate_report() {
    local output_dir="$1"
    
    log_info "=== Renaming Report ==="
    log_info "Total files: $TOTAL_FILES"
    log_info "Successfully renamed: $RENAMED_COUNT"
    log_info "Marked as unknown: $UNKNOWN_COUNT"
    log_info "Skipped (incomplete mapping): $SKIPPED_COUNT"
    log_info "Errors: $ERROR_COUNT"
    
    # Create a summary file
    local summary_file="${output_dir}/rename_summary.txt"
    {
        echo "=== BGW Doors Image Renaming Summary ==="
        echo "Generated: $(date)"
        echo ""
        echo "Statistics:"
        echo "  Total files processed: $TOTAL_FILES"
        echo "  Successfully renamed: $RENAMED_COUNT"
        echo "  Marked as unknown: $UNKNOWN_COUNT"
        echo "  Skipped (incomplete mapping): $SKIPPED_COUNT"
        echo "  Errors: $ERROR_COUNT"
        echo ""
        echo "Output directory: $output_dir"
        echo "Log file: $LOG_FILE"
    } > "$summary_file"
    
    log_info "Summary saved to: $summary_file"
}

print_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "BGW Doors Image Renaming Script"
    echo ""
    echo "Options:"
    echo "  -s, --source DIR     Source directory containing images (default: $DEFAULT_SOURCE_DIR)"
    echo "  -m, --mapping FILE   Mapping JSON file (default: $DEFAULT_MAPPING_FILE)"
    echo "  -o, --output DIR     Output directory for renamed images (default: $DEFAULT_OUTPUT_DIR)"
    echo "  -h, --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0"
    echo "  $0 --source public/bg-finals-4x --mapping data/image_mapping.json"
    echo "  $0 --output renamed_doors"
}

main() {
    # Parse command line arguments
    local source_dir="$DEFAULT_SOURCE_DIR"
    local mapping_file="$DEFAULT_MAPPING_FILE"
    local output_dir="$DEFAULT_OUTPUT_DIR"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -s|--source)
                source_dir="$2"
                shift 2
                ;;
            -m|--mapping)
                mapping_file="$2"
                shift 2
                ;;
            -o|--output)
                output_dir="$2"
                shift 2
                ;;
            -h|--help)
                print_usage
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                print_usage
                exit 1
                ;;
        esac
    done
    
    # Initialize log file
    mkdir -p "$(dirname "$LOG_FILE")"
    echo "=== BGW Doors Image Renaming Log ===" > "$LOG_FILE"
    echo "Started: $(date)" >> "$LOG_FILE"
    
    log_info "BGW Doors Image Renaming System"
    log_info "================================="
    
    # Check dependencies
    check_dependencies
    
    # Validate inputs
    if [ ! -d "$source_dir" ]; then
        log_error "Source directory not found: $source_dir"
        exit 1
    fi
    
    if ! validate_mapping_file "$mapping_file"; then
        exit 1
    fi
    
    # Process images
    process_images "$source_dir" "$output_dir" "$mapping_file"
    
    # Generate report
    generate_report "$output_dir"
    
    # Final status
    if [ $ERROR_COUNT -eq 0 ]; then
        log_success "Renaming completed successfully!"
        log_info "Renamed images are in: $output_dir"
        log_info "See $LOG_FILE for detailed log"
    else
        log_warning "Renaming completed with $ERROR_COUNT error(s)"
        log_info "Check $LOG_FILE for details"
    fi
}

# Run main function
main "$@"