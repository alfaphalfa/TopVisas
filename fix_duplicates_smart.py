#!/usr/bin/env python3

# Read the file
with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

fixed_lines = []
i = 0
current_object_start = -1
has_outcome_in_current_object = False

while i < len(lines):
    line = lines[i]
    
    # Detect start of a new case study object (starts with { after whitespace)
    if line.strip() == '{':
        current_object_start = i
        has_outcome_in_current_object = False
    
    # Detect end of case study object
    if line.strip() in ['},', '}']:
        current_object_start = -1
        has_outcome_in_current_object = False
    
    # Check if this is an outcome property
    if line.strip().startswith('outcome:'):
        if has_outcome_in_current_object:
            # This is a duplicate, skip it
            print(f"Removing duplicate outcome at line {i+1}: {line.strip()}")
            i += 1
            continue
        else:
            # First outcome in this object, keep it
            has_outcome_in_current_object = True
    
    fixed_lines.append(line)
    i += 1

# Write the fixed content
with open('lib/caseStudies.ts', 'w') as f:
    f.writelines(fixed_lines)

print(f"\nFixed file written. Total lines: {len(fixed_lines)}")