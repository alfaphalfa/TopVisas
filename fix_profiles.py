import re

# Read the file
with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

# Define the profiles to fix with their line numbers and missing fields
fixes = [
    (2820, "Senior Robotics Engineer", "12 years", "India"),
    (2852, "Research Scientist", "8 years", "South Korea"),
    (2885, "Senior Full Stack Developer", "10 years", "Brazil"),
    (2920, "Blockchain Developer", "5 years", "Ukraine"),
    (2958, "Postdoctoral Researcher", "2 years", "Germany"),
    (2990, "Senior Research Scientist", "10 years", "India"),
    (3022, "Principal Scientist", "15 years", "UK"),
    (3056, "Senior Marine Researcher", "12 years", "Australia"),
    (3089, "Senior Formulation Scientist", "8 years", "India"),
    (3127, "Chief Compliance Architect", "12 years", "Canada"),
    (3158, "Senior Product Manager", "10 years", "China"),
    (3190, "Senior Quant", "7 years", "Russia"),
    (3227, "Payment Systems Architect", "9 years", "India"),
    (3264, "Principal Data Scientist", "10 years", "Canada"),
    (3296, "Computational Biology Director", "12 years", "China"),
    (3329, "Accessibility Technology Lead", "8 years", "Brazil")
]

# Process each fix
for line_num, position, exp_level, country in fixes:
    # Find the profile block starting at line_num - 1 (0-indexed)
    start_idx = line_num - 1
    
    # Look for the education line within the profile block
    for i in range(start_idx, min(start_idx + 10, len(lines))):
        if 'education:' in lines[i]:
            # Insert experienceLevel before education
            indent = '      '
            exp_line = f"{indent}experienceLevel: '{exp_level}',\n"
            lines.insert(i, exp_line)
            
            # Find the closing brace and add country
            for j in range(i, min(i + 5, len(lines))):
                if lines[j].strip().startswith('education:'):
                    # Add comma if not present
                    if not lines[j].rstrip().endswith(','):
                        lines[j] = lines[j].rstrip() + ',\n'
                    # Insert country after education
                    country_line = f"{indent}country: '{country}'\n"
                    lines.insert(j + 1, country_line)
                    break
            break

# Write the fixed content
with open('lib/caseStudies.ts', 'w') as f:
    f.writelines(lines)

print("Fixed all incomplete profiles")