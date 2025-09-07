const fs = require('fs');

// Read the file
let content = fs.readFileSync('lib/caseStudies.ts', 'utf8');
let lines = content.split('\n');

let fixedLines = [];
let inCaseStudy = false;
let foundOutcome = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we're starting a new case study object
    if (line.match(/^\s+\{$/)) {
        inCaseStudy = true;
        foundOutcome = false;
    }
    
    // Check if we're ending a case study object
    if (line.match(/^\s+\},?$/)) {
        inCaseStudy = false;
        foundOutcome = false;
    }
    
    // Check for outcome property
    if (inCaseStudy && line.match(/^\s+outcome:/)) {
        if (foundOutcome) {
            // Skip duplicate outcome
            console.log(`Removing duplicate outcome at line ${i + 1}`);
            continue;
        }
        foundOutcome = true;
    }
    
    fixedLines.push(line);
}

// Write the fixed content
fs.writeFileSync('lib/caseStudies.ts', fixedLines.join('\n'));
console.log('Fixed all duplicate outcome properties');