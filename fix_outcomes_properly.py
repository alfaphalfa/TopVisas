#!/usr/bin/env python3

# Read the file
with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

fixed_lines = []
i = 0

while i < len(lines):
    line = lines[i]
    
    # Check if this is an outcome line that follows an evidence array closing
    # This would be the duplicate one that needs to be removed
    if (i > 0 and 
        line.strip().startswith('outcome:') and 
        lines[i-1].strip() == '],'):
        
        # Look ahead to see if the next line is keySuccess, keyFailure, or denialReasons
        # If so, this is definitely a duplicate that should be removed
        if i + 1 < len(lines):
            next_line = lines[i+1].strip()
            if any(next_line.startswith(x) for x in ['keySuccess:', 'keyFailure:', 'denialReasons:']):
                print(f"Removing duplicate outcome at line {i+1}: {line.strip()}")
                i += 1  # Skip this line
                continue
    
    fixed_lines.append(line)
    i += 1

# Write the fixed content
with open('lib/caseStudies.ts', 'w') as f:
    f.writelines(fixed_lines)

print(f"\nFixed file written. Total lines: {len(fixed_lines)}")