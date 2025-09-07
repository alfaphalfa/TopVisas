#!/usr/bin/env python3
import re

# Read the file
with open('lib/caseStudies.ts', 'r') as f:
    content = f.read()

# Split into lines for processing
lines = content.split('\n')

# Track which objects have which structure
# From lines 609 onwards, objects have outcome early in structure
# Before that, outcome appears after evidence array

def remove_duplicate_outcomes():
    fixed_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this line has pattern: ],\n    outcome: 
        # followed by keySuccess/keyFailure/denialReasons
        if (i > 0 and 
            line.strip().startswith('outcome:') and 
            lines[i-1].strip() == '],'):
            
            # Check if next line starts with keySuccess, keyFailure, or denialReasons
            if i + 1 < len(lines):
                next_line = lines[i+1].strip()
                if any(next_line.startswith(x) for x in ['keySuccess:', 'keyFailure:', 'denialReasons:']):
                    # Check if this object already has an outcome property
                    # Look backwards to find the start of this object
                    j = i - 1
                    while j >= 0:
                        if lines[j].strip() == '{':
                            # Found object start, now check if outcome exists between j and i
                            for k in range(j, i):
                                if lines[k].strip().startswith('outcome:') and k != i:
                                    # Found an earlier outcome, so this is a duplicate
                                    print(f"Removing duplicate outcome at line {i+1}: {line.strip()}")
                                    i += 1
                                    break
                            else:
                                # No earlier outcome found, keep this one
                                fixed_lines.append(line)
                                i += 1
                            break
                        j -= 1
                    else:
                        # Couldn't find object start, keep the line
                        fixed_lines.append(line)
                        i += 1
                else:
                    fixed_lines.append(line)
                    i += 1
            else:
                fixed_lines.append(line)
                i += 1
        else:
            fixed_lines.append(line)
            i += 1
    
    return fixed_lines

fixed_lines = remove_duplicate_outcomes()

# Write the fixed content
with open('lib/caseStudies.ts', 'w') as f:
    f.write('\n'.join(fixed_lines))

print(f"Fixed file written. Total lines: {len(fixed_lines)}")