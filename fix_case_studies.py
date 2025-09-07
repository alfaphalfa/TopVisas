with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

fixed_lines = []
skip_next = False

for i in range(len(lines)):
    if skip_next:
        skip_next = False
        continue
        
    # Check if this is a duplicate outcome line (follows evidence array closing)
    if (i > 0 and 
        lines[i].strip().startswith('outcome:') and 
        lines[i-1].strip() == '],'):
        # Check if next line is keySuccess, keyFailure, or denialReasons
        if i + 1 < len(lines):
            next_line = lines[i+1].strip()
            if any(next_line.startswith(x) for x in ['keySuccess:', 'keyFailure:', 'denialReasons:']):
                print(f"Removing duplicate outcome at line {i+1}")
                continue  # Skip this duplicate outcome line
    
    fixed_lines.append(lines[i])

with open('lib/caseStudies.ts', 'w') as f:
    f.writelines(fixed_lines)

print("Fixed all duplicates")
