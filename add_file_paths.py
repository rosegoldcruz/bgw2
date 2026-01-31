#!/usr/bin/env python3
"""
Script to add file path comments to the top of each file in specified directories.
"""

import os

# Directories to process
DIRECTORIES = ['app', 'components', 'hooks', 'lib', 'public', 'styles']

# File extensions and their comment syntax
COMMENT_STYLES = {
    # JavaScript/TypeScript
    '.ts': '//',
    '.tsx': '//',
    '.js': '//',
    '.jsx': '//',
    '.mjs': '//',
    # CSS
    '.css': '/* {} */',
    # Python
    '.py': '#',
    # HTML/Markdown
    '.html': '<!-- {} -->',
    '.md': '<!-- {} -->',
}

# Extensions to skip (binary files, etc.)
SKIP_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp',
    '.woff', '.woff2', '.ttf', '.eot',
    '.pdf', '.zip', '.tar', '.gz',
    '.mp3', '.mp4', '.wav', '.avi', '.mov',
}


def get_comment_line(filepath, extension):
    """Generate the comment line for a given file path and extension."""
    style = COMMENT_STYLES.get(extension)
    if style is None:
        return None
    
    if '{}' in style:
        # For CSS/HTML style comments
        return style.format(filepath)
    else:
        # For single-line comments (// or #)
        return f"{style} {filepath}"


def add_filepath_comment(filepath):
    """Add file path comment to the top of a file."""
    extension = os.path.splitext(filepath)[1].lower()
    
    # Skip binary files
    if extension in SKIP_EXTENSIONS:
        print(f"Skipping binary file: {filepath}")
        return False
    
    # Skip files without known comment style
    if extension not in COMMENT_STYLES:
        print(f"Skipping unknown extension: {filepath}")
        return False
    
    # Generate comment line
    comment_line = get_comment_line(filepath, extension)
    if comment_line is None:
        return False
    
    try:
        # Read existing content
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file already has the path comment
        if content.startswith(comment_line):
            print(f"Already has path comment: {filepath}")
            return False
        
        # Write new content with path comment at top
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(comment_line + '\n' + content)
        
        print(f"Added path comment: {filepath}")
        return True
    
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False


def process_directory(directory):
    """Process all files in a directory recursively."""
    count = 0
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            if add_filepath_comment(filepath):
                count += 1
    return count


def main():
    """Main function to process all specified directories."""
    total_count = 0
    
    for directory in DIRECTORIES:
        if os.path.exists(directory):
            print(f"\n--- Processing {directory}/ ---")
            count = process_directory(directory)
            total_count += count
            print(f"Modified {count} files in {directory}/")
        else:
            print(f"Directory not found: {directory}/")
    
    print(f"\n=== Total files modified: {total_count} ===")


if __name__ == '__main__':
    main()
