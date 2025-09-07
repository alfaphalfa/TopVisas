#!/usr/bin/env python3

import re

with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

fixed_lines = []
i = 0
while i < len(lines):
    fixed_lines.append(lines[i])
    
    # Check if this line is the first outcome property in an object
    if re.match(r'^\s+outcome:', lines[i]):
        # Look ahead for any duplicate outcome property
        j = i + 1
        skip_next_outcome = False
        while j < len(lines) and not re.match(r'^\s+\},', lines[j]):
            if re.match(r'^\s+outcome:', lines[j]):
                # Found duplicate, skip it
                skip_next_outcome = True
                print(f"Removing duplicate outcome at line {j+1}")
                j += 1
                continue
            if skip_next_outcome and re.match(r'^\s+outcome:', lines[j]):
                j += 1
                continue
            j += 1
    
    i += 1

# Write fixed content
with open('lib/caseStudies.ts', 'w') as f:
    f.writelines(fixed_lines)

print("Fixed duplicates")