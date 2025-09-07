import re

with open('lib/caseStudies.ts', 'r') as f:
    lines = f.readlines()

in_profile = False
profile_start = -1
profile_lines = []

for i, line in enumerate(lines):
    if 'profile: {' in line:
        in_profile = True
        profile_start = i
        profile_lines = [line]
    elif in_profile:
        profile_lines.append(line)
        if '},' in line or '},\n' in line:
            # End of profile object
            profile_text = ''.join(profile_lines)
            # Check if it has experienceLevel and country
            if 'experienceLevel' not in profile_text or 'country' not in profile_text:
                print(f"Incomplete profile at line {profile_start + 1}")
                print(''.join(profile_lines[:5]))
                print("---")
            in_profile = False
            profile_lines = []
