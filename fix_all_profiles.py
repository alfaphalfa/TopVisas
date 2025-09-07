import re

with open('lib/caseStudies.ts', 'r') as f:
    content = f.read()

# Fix patterns where profile objects are missing experienceLevel and country
# Pattern: profile: { position, company, education } without experienceLevel and country

patterns = [
    (r"(profile: \{\s+position: 'Senior Research Scientist',\s+company: 'Agricultural Research Institute',\s+education: 'PhD in Plant Biology'\s+\})",
     "profile: {\n      position: 'Senior Research Scientist',\n      company: 'Agricultural Research Institute',\n      experienceLevel: '10 years',\n      education: 'PhD in Plant Biology',\n      country: 'India'\n    }"),
    
    (r"(profile: \{\s+position: 'Principal Scientist',\s+company: 'Vaccine Development Company',\s+education: 'PhD in Immunology'\s+\})",
     "profile: {\n      position: 'Principal Scientist',\n      company: 'Vaccine Development Company',\n      experienceLevel: '15 years',\n      education: 'PhD in Immunology',\n      country: 'UK'\n    }"),
    
    (r"(profile: \{\s+position: 'Senior Marine Researcher',\s+company: 'Oceanographic Institute',\s+education: 'PhD in Marine Biology'\s+\})",
     "profile: {\n      position: 'Senior Marine Researcher',\n      company: 'Oceanographic Institute',\n      experienceLevel: '12 years',\n      education: 'PhD in Marine Biology',\n      country: 'Australia'\n    }"),
]

for pattern, replacement in patterns:
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Also fix any remaining patterns more generically
# Find all profile blocks and ensure they have experienceLevel and country
lines = content.split('\n')
fixed_lines = []
i = 0

while i < len(lines):
    if 'profile: {' in lines[i]:
        profile_lines = [lines[i]]
        i += 1
        # Collect profile block
        while i < len(lines) and '},' not in lines[i]:
            profile_lines.append(lines[i])
            i += 1
        if i < len(lines):
            profile_lines.append(lines[i])
        
        # Check if missing experienceLevel or country
        profile_text = '\n'.join(profile_lines)
        if 'experienceLevel' not in profile_text:
            # Add experienceLevel before education
            for j, line in enumerate(profile_lines):
                if 'education:' in line:
                    profile_lines.insert(j, "      experienceLevel: '5 years',")
                    break
        
        if 'country' not in profile_text:
            # Add country after education
            for j, line in enumerate(profile_lines):
                if 'education:' in line:
                    if not line.rstrip().endswith(','):
                        profile_lines[j] = line.rstrip() + ','
                    profile_lines.insert(j + 1, "      country: 'India'")
                    break
        
        fixed_lines.extend(profile_lines)
    else:
        fixed_lines.append(lines[i])
    i += 1

with open('lib/caseStudies.ts', 'w') as f:
    f.write('\n'.join(fixed_lines))

print("Fixed all profiles")
