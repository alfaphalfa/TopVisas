export interface CaseStudy {
  id: string;
  visaType: 'EB-1A' | 'O-1A' | 'NIW';
  field: 'tech' | 'biotech' | 'fintech';
  strength: 'very-strong' | 'strong' | 'moderate' | 'weak';
  title: string;
  timeline: string;
  profile: {
    position: string;
    company?: string;
    institution?: string;
    experienceLevel: string;
    education: string;
    country: string;
  };
  metrics: {
    publications?: number;
    citations?: number;
    patents?: number;
    funding?: string;
    salary?: string;
    hIndex?: number;
    githubStars?: number;
    conferencesSpeaking?: number;
    transactionVolume?: string;
  };
  evidence: string[];
  outcome: 'approved' | 'denied' | 'rfe-then-approved' | 'denied-then-approved';
  keySuccess?: string[];
  keyFailure?: string[];
  denialReasons?: string[];
  processingNotes: string;
}

export const caseStudies: CaseStudy[] = [
  // EB-1A Tech Cases
  {
    id: 'eb1a-tech-001',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'strong',
    title: 'AI/ML Researcher - 400+ Citations Quick Approval',
    timeline: '5 months total processing',
    profile: {
      position: 'Senior AI Research Scientist',
      company: 'Major Tech Company',
      experienceLevel: '8 years',
      education: 'PhD in Computer Science',
      country: 'India'
    },
    metrics: {
      publications: 42,
      citations: 412,
      patents: 3,
      hIndex: 18,
      salary: '$280,000'
    },
    evidence: [
      'Original contributions to transformer architectures',
      'Lead author on papers in NeurIPS and ICML',
      'Judging for major ML conferences',
      'Patents in neural network optimization',
      'Media coverage in tech publications',
      'Letters from leading AI researchers'
    ],
    outcome: 'approved',
    keySuccess: [
      'Strong citation metrics above field average',
      'Clear original contributions to AI field',
      'Well-documented judging roles',
      'Strategic use of comparative evidence'
    ],
    processingNotes: 'Texas Service Center, no premium processing, approved without RFE'
  },
  {
    id: 'eb1a-tech-002',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    title: 'ML Engineer at Enterprise Search Startup - Initially Denied Then Approved',
    timeline: '18 months with appeal',
    profile: {
      position: 'ML Engineer',
      company: 'Enterprise Search Startup',
      experienceLevel: '5 years',
      education: 'MS in Computer Science',
      country: 'India'
    },
    metrics: {
      publications: 8,
      citations: 156,
      patents: 1,
      hIndex: 7
    },
    evidence: [
      'Contributions to enterprise search technology',
      'Open source contributions',
      'Speaking at tech conferences',
      'Patents pending in search algorithms',
      'Critical role at high-growth startup'
    ],
    outcome: 'denied-then-approved',
    keyFailure: [
      'Initial petition lacked comparative evidence',
      'Insufficient documentation of original contributions',
      'Weak letters of recommendation'
    ],
    keySuccess: [
      'Appeal included stronger expert letters',
      'Added detailed citation analysis',
      'Better documentation of industry impact',
      'Highlighted unique technical contributions'
    ],
    denialReasons: [
      'Failed to establish sustained national acclaim',
      'Insufficient evidence of original contributions'
    ],
    processingNotes: 'Initially denied at Nebraska Service Center, approved on appeal with additional evidence'
  },
  {
    id: 'eb1a-tech-003',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    title: 'ML Engineer - National Security Impact Without High Citations',
    timeline: '7 months',
    profile: {
      position: 'Machine Learning Engineer',
      company: 'Defense Contractor',
      experienceLevel: '6 years',
      education: 'MS in Computer Science',
      country: 'China'
    },
    metrics: {
      publications: 5,
      citations: 48,
      patents: 2
    },
    evidence: [
      'Work on ML models for national security applications',
      'Security clearance and government contracts',
      'Letters from military officials',
      'Contributions to critical infrastructure',
      'Limited publications due to classified work'
    ],
    outcome: 'approved',
    keySuccess: [
      'National interest angle strongly emphasized',
      'Quality over quantity approach for evidence',
      'Strong government support letters',
      'Unique expertise in specialized area'
    ],
    processingNotes: 'Texas Service Center, approved after RFE addressing publication limitations'
  },

  // NIW Tech Cases
  {
    id: 'niw-tech-001',
    visaType: 'NIW',
    field: 'tech',
    strength: 'strong',
    title: 'AI PhD with Military Alignment - 358 Citations',
    timeline: '8 months',
    profile: {
      position: 'AI Research Scientist',
      institution: 'University Research Lab',
      experienceLevel: '4 years post-PhD',
      education: 'PhD in Artificial Intelligence',
      country: 'Iran'
    },
    metrics: {
      publications: 28,
      citations: 358,
      funding: '$2.3M in grants',
      hIndex: 14
    },
    evidence: [
      'DARPA grant recipient',
      'Work on autonomous systems for defense',
      'Published in top-tier AI journals',
      'Collaboration with military research labs',
      'Letters from Pentagon officials'
    ],
    outcome: 'approved',
    keySuccess: [
      'Clear national security implications',
      'Strong citation metrics for career stage',
      'Direct military application of research',
      'Well-documented grant funding'
    ],
    processingNotes: 'Premium processing, approved without RFE, Texas Service Center'
  },
  {
    id: 'niw-tech-002',
    visaType: 'NIW',
    field: 'tech',
    strength: 'moderate',
    title: 'Cybersecurity Expert - No PhD but Presidential Initiative Alignment',
    timeline: '11 months',
    profile: {
      position: 'Senior Cybersecurity Engineer',
      company: 'Critical Infrastructure Company',
      experienceLevel: '10 years',
      education: 'MS in Information Security',
      country: 'Russia'
    },
    metrics: {
      publications: 3,
      citations: 22,
      patents: 1
    },
    evidence: [
      'Work aligns with presidential cybersecurity initiative',
      'Protected critical infrastructure from nation-state attacks',
      'Industry certifications (CISSP, OSCP)',
      'Speaking at RSA Conference',
      'Letters from DHS officials'
    ],
    outcome: 'approved',
    keySuccess: [
      'Direct alignment with national priorities',
      'Practical impact over academic metrics',
      'Strong industry reputation',
      'Government endorsement letters'
    ],
    processingNotes: 'Nebraska Service Center, RFE for better documentation of national importance'
  },
  {
    id: 'niw-tech-003',
    visaType: 'NIW',
    field: 'tech',
    strength: 'weak',
    title: 'CS PhD with 29 Citations - Approved Despite Low Metrics',
    timeline: '14 months',
    profile: {
      position: 'Assistant Professor',
      institution: 'State University',
      experienceLevel: '2 years post-PhD',
      education: 'PhD in Computer Science',
      country: 'India'
    },
    metrics: {
      publications: 12,
      citations: 29,
      hIndex: 4
    },
    evidence: [
      'Research in quantum computing',
      'NSF grant recipient',
      'Teaching in underserved area',
      'Collaboration with national labs',
      'Focus on emerging technology area'
    ],
    outcome: 'rfe-then-approved',
    keySuccess: [
      'Emerging field with lower citation norms',
      'Geographic consideration (underserved area)',
      'Strong future impact argument',
      'Quality of research over quantity'
    ],
    processingNotes: 'Multiple RFEs, eventually approved with additional expert letters explaining field norms'
  },

  // O-1A Tech Cases
  {
    id: 'o1a-tech-001',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    title: 'Senior Product Strategist - 1,015 Page Petition',
    timeline: '15 days with premium processing',
    profile: {
      position: 'Senior Product Strategist',
      company: 'Major Tech Company',
      experienceLevel: '12 years',
      education: 'MBA + MS Computer Science',
      country: 'Pakistan'
    },
    metrics: {
      salary: '$450,000',
      conferencesSpeaking: 15,
      publications: 8
    },
    evidence: [
      'Led products with 100M+ users',
      'Speaker at major tech conferences',
      'Published in top business publications',
      'Advisory board positions',
      'Media coverage in major tech publications',
      'Patents in user experience design'
    ],
    outcome: 'approved',
    keySuccess: [
      'Overwhelming documentation strategy',
      'High salary as evidence of extraordinary ability',
      'Multiple types of evidence across categories',
      'Strong employer support'
    ],
    processingNotes: 'Premium processing, approved in 15 days without RFE, extensive documentation'
  },
  {
    id: 'o1a-tech-002',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    title: 'Startup Founder - Top Accelerator & Funding-Based Approval',
    timeline: '10 days with premium processing',
    profile: {
      position: 'Founder & CEO',
      company: 'VC-backed Startup',
      experienceLevel: '7 years',
      education: 'BS in Computer Science',
      country: 'Brazil'
    },
    metrics: {
      funding: '$12M Series A',
      githubStars: 15000,
      conferencesSpeaking: 8
    },
    evidence: [
      'Top accelerator acceptance (1.5% acceptance rate)',
      'Led team of 25 engineers',
      'Open source project with 15K GitHub stars',
      'Major tech conference finalist',
      'Tier-1 VC investment',
      'Featured in major tech publications'
    ],
    outcome: 'approved',
    keySuccess: [
      'Top accelerator acceptance as extraordinary achievement',
      'Significant venture funding',
      'Measurable impact through open source',
      'Strong Silicon Valley network letters'
    ],
    processingNotes: 'California Service Center, premium processing, approved without RFE'
  },
  {
    id: 'o1a-tech-003',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'moderate',
    title: 'Senior Engineer - GitHub Stars and Conference Speaking',
    timeline: '21 days with premium processing',
    profile: {
      position: 'Senior Software Engineer',
      company: 'Mid-size Tech Company',
      experienceLevel: '8 years',
      education: 'MS in Software Engineering',
      country: 'Ukraine'
    },
    metrics: {
      githubStars: 8500,
      conferencesSpeaking: 12,
      salary: '$185,000'
    },
    evidence: [
      'Created popular open source framework',
      'Regular speaker at tech conferences',
      'Technical blog with 50K monthly readers',
      'Contributed to major open source projects',
      'Mentored 100+ developers',
      'Online courses with 10K students'
    ],
    outcome: 'rfe-then-approved',
    keySuccess: [
      'Strong open source contributions',
      'Demonstrated influence in developer community',
      'Multiple speaking engagements',
      'Educational impact quantified'
    ],
    processingNotes: 'RFE for additional evidence of sustained acclaim, approved after response'
  },

  // Biotech Cases
  {
    id: 'eb1a-biotech-001',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'very-strong',
    title: 'Cardiovascular Disease Specialist - Medical Device Innovation',
    timeline: '4 months',
    profile: {
      position: 'Principal Research Scientist',
      company: 'Medical Device Company',
      experienceLevel: '15 years',
      education: 'MD/PhD',
      country: 'Germany'
    },
    metrics: {
      publications: 87,
      citations: 2450,
      patents: 12,
      hIndex: 28,
      funding: '$8.5M in NIH grants'
    },
    evidence: [
      'Invented FDA-approved cardiac device',
      'Clinical trials saving 1000+ lives',
      'Editorial board of cardiology journals',
      'NIH study section member',
      'Keynote at American Heart Association',
      'Licensed patents generating $50M revenue'
    ],
    outcome: 'approved',
    keySuccess: [
      'Clear commercial success of innovations',
      'Quantifiable patient impact',
      'Strong grant funding history',
      'Multiple evidence categories satisfied'
    ],
    processingNotes: 'Texas Service Center, approved without RFE, exceptional case'
  },
  {
    id: 'eb1a-biotech-002',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'strong',
    title: 'Cancer Biology Researcher - 5-Day Approval',
    timeline: '5 days with premium processing',
    profile: {
      position: 'Associate Professor',
      institution: 'Top Medical School',
      experienceLevel: '10 years',
      education: 'PhD in Cancer Biology',
      country: 'China'
    },
    metrics: {
      publications: 52,
      citations: 1876,
      hIndex: 24,
      funding: '$4.2M in grants'
    },
    evidence: [
      'Breakthrough in immunotherapy research',
      'Published in Nature, Science, Cell',
      'Peer review for top journals',
      'International conference organizer',
      'WHO advisory panel member',
      'Research led to clinical trials'
    ],
    outcome: 'approved',
    keySuccess: [
      'Publications in highest-impact journals',
      'Direct path from research to clinical application',
      'International recognition through WHO role',
      'Strong institutional support'
    ],
    processingNotes: 'Premium processing, fastest approval on record for biotech EB-1A'
  },
  {
    id: 'niw-biotech-001',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'moderate',
    title: 'Inorganic Chemistry PhD - Initially Denied Then Won on Appeal',
    timeline: '20 months including appeal',
    profile: {
      position: 'Research Scientist',
      company: 'Pharmaceutical Company',
      experienceLevel: '3 years post-PhD',
      education: 'PhD in Inorganic Chemistry',
      country: 'India'
    },
    metrics: {
      publications: 18,
      citations: 234,
      patents: 3,
      hIndex: 9
    },
    evidence: [
      'Drug delivery system research',
      'Collaboration with FDA',
      'Patents in nanoparticle technology',
      'Work on COVID-19 therapeutics',
      'Industry partnership with major pharma company'
    ],
    outcome: 'rfe-then-approved',
    keyFailure: [
      'Initial petition too focused on past achievements',
      'Insufficient evidence of future impact'
    ],
    keySuccess: [
      'Appeal emphasized COVID-19 research urgency',
      'Added letters from FDA officials',
      'Detailed proposed future research plan',
      'Showed unique expertise in specialized area'
    ],
    denialReasons: [
      'Failed to show work is of national importance',
      'Insufficient evidence applicant is well-positioned'
    ],
    processingNotes: 'Initially denied, won on administrative appeal with enhanced evidence'
  },

  // Fintech Cases
  {
    id: 'eb1a-fintech-001',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'strong',
    title: 'Asset Manager - Agricultural Equipment Creative Case',
    timeline: '6 months',
    profile: {
      position: 'Managing Director',
      company: 'Agricultural Finance Firm',
      experienceLevel: '20 years',
      education: 'MBA in Finance',
      country: 'Netherlands'
    },
    metrics: {
      transactionVolume: '$2.5B managed',
      salary: '$850,000 + bonuses'
    },
    evidence: [
      'Pioneered agricultural equipment financing model',
      'Published in Journal of Agricultural Economics',
      'Board positions on industry associations',
      'Created 500+ jobs through financing programs',
      'Government advisory roles',
      'Media coverage in major financial publications'
    ],
    outcome: 'approved',
    keySuccess: [
      'Creative interpretation of extraordinary ability',
      'Showed impact beyond traditional finance',
      'Strong economic impact evidence',
      'High compensation as proof of value'
    ],
    processingNotes: 'Nebraska Service Center, creative approach linking finance to national food security'
  },
  {
    id: 'niw-fintech-001',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'weak',
    title: 'Mathematical Statistician - Failed Due to Changing Endeavors',
    timeline: '12 months to denial',
    profile: {
      position: 'Quantitative Analyst',
      company: 'Hedge Fund',
      experienceLevel: '5 years',
      education: 'PhD in Statistics',
      country: 'Russia'
    },
    metrics: {
      publications: 8,
      citations: 112,
      salary: '$225,000'
    },
    evidence: [
      'Developed trading algorithms',
      'Published on market microstructure',
      'Speaking at quant conferences',
      'Risk management innovations'
    ],
    outcome: 'denied',
    keyFailure: [
      'Changed from academic to industry focus',
      'Could not show continuity of endeavor',
      'Weak national interest argument',
      'Work primarily benefits private investors'
    ],
    denialReasons: [
      'Proposed endeavor differs from past work',
      'Failed to establish national importance',
      'Benefits primarily accrue to employer'
    ],
    processingNotes: 'Denied at Texas Service Center, example of importance of consistent endeavor'
  },
  {
    id: 'o1a-fintech-001',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'strong',
    title: 'Fintech Founder - $100M+ Transaction Volume',
    timeline: '12 days with premium processing',
    profile: {
      position: 'Founder & CEO',
      company: 'Payment Processing Startup',
      experienceLevel: '10 years',
      education: 'BS in Computer Science',
      country: 'Nigeria'
    },
    metrics: {
      transactionVolume: '$150M processed annually',
      funding: '$25M Series B',
      conferencesSpeaking: 10
    },
    evidence: [
      'Built payment rails for emerging markets',
      'Processing $150M in annual transactions',
      'Featured in major tech and business publications',
      'Top-tier VC investment',
      'Speaking at major fintech conferences',
      'Advisory positions with central banks'
    ],
    outcome: 'approved',
    keySuccess: [
      'Significant transaction volume as impact metric',
      'High-profile venture funding',
      'Government advisory roles',
      'Media coverage in major publications'
    ],
    processingNotes: 'California Service Center, strong venture backing helped establish extraordinary ability'
  },
  
  // Additional EB-1A Tech Cases
  {
    id: 'eb1a-tech-004',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Senior AI Researcher at Major Tech Company',
    timeline: '45 days regular processing',
    profile: {
      position: 'Senior AI Research Scientist',
      company: 'Major Technology Corporation',
      institution: 'Previously at Top Research Lab',
      education: 'PhD Computer Science - Top 10 University',
      country: 'China',
      experienceLevel: '12 years in AI/ML research'
    },
    metrics: {
      publications: 15,
      citations: 450,
      hIndex: 18,
      patents: 4,
      salary: '$380,000',
      funding: 'Patents licensed by Fortune 500 companies'
    },
    evidence: [
      '15 peer-reviewed publications in top AI conferences',
      '450 citations with h-index of 18',
      '4 USPTO patents with commercial implementation',
      'IEEE Best Paper Award recipient',
      'Patents licensed and implemented by multiple Fortune 500 companies',
      'Base salary of $380K in Bay Area',
      'Invited speaker at major AI conferences'
    ],
    keySuccess: [
      'Patents with proven commercial value and licensing deals',
      'Clear documentation of technology transfer to industry',
      'Exceptional compensation relative to field',
      'Awards from recognized professional organizations'
    ],
    processingNotes: 'Approved without RFE in 45 days via regular processing. Strong commercial impact was key differentiator.'
  },
  {
    id: 'eb1a-tech-005',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Cybersecurity Principal Engineer',
    timeline: '6 months with RFE response',
    profile: {
      position: 'Principal Security Engineer',
      company: 'Cybersecurity Firm',
      institution: 'Previously at Defense Contractor',
      education: 'MS Computer Science',
      country: 'Russia',
      experienceLevel: '10 years in cybersecurity'
    },
    metrics: {
      publications: 8,
      citations: 180,
      salary: '$295,000',
      conferencesSpeaking: 15
    },
    evidence: [
      '8 publications on security vulnerabilities',
      '180 citations in security research',
      'Bug bounty awards from major tech companies',
      'Speaker at RSA Conference and BlackHat',
      'Total compensation of $295K',
      'Documented prevention of $10M+ in security breaches'
    ],
    keySuccess: [
      'Quantified economic impact of security work',
      'Recognition from major tech companies through bug bounties',
      'Speaking roles at premier security conferences'
    ],
    keyFailure: [
      'Initial petition lacked clear evidence of sustained acclaim',
      'Had to better document commercial impact of security research'
    ],
    processingNotes: 'RFE requested more evidence of critical role. Response focused on prevented financial losses and industry recognition.'
  },
  {
    id: 'eb1a-tech-006',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Software Engineer at Startup',
    timeline: '4 months to denial',
    profile: {
      position: 'Senior Software Engineer',
      company: 'Series B Startup',
      institution: 'Mid-tier Engineering School',
      education: 'BS Computer Science',
      country: 'India',
      experienceLevel: '6 years'
    },
    metrics: {
      publications: 3,
      citations: 45,
      githubStars: 1200,
      salary: '$165,000'
    },
    evidence: [
      '3 publications in minor conferences',
      '45 citations total',
      '1200 GitHub stars on open source project',
      'Mid-level role at Series B startup',
      'Salary of $165K'
    ],
    denialReasons: [
      'Insufficient evidence of sustained national or international acclaim',
      'GitHub stars alone do not demonstrate extraordinary ability',
      'Compensation not significantly above industry average',
      'Limited peer-reviewed publications',
      'No evidence of judging work of others in the field'
    ],
    processingNotes: 'Denied for lack of sustained acclaim. GitHub popularity insufficient without other strong evidence.'
  },

  // EB-1A Biotech Cases
  {
    id: 'eb1a-biotech-003',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Oncology Research Director',
    timeline: '5 days via premium processing',
    profile: {
      position: 'Director of Cancer Research',
      company: 'Major Cancer Research Institute',
      institution: 'Harvard Medical School',
      education: 'MD/PhD - Top Medical School',
      country: 'Germany',
      experienceLevel: '15 years in oncology research'
    },
    metrics: {
      publications: 22,
      citations: 680,
      hIndex: 24,
      patents: 3,
      funding: 'NIH R01 grant recipient'
    },
    evidence: [
      '22 publications in Nature, Cell, and Science',
      '680 citations with h-index of 24',
      'Principal Investigator on NIH R01 grant',
      '3 patents in cancer therapeutics',
      'Research aligned with Cancer Moonshot initiative',
      'Editorial board member of oncology journals',
      'Invited speaker at international cancer conferences'
    ],
    keySuccess: [
      'Publications in highest-impact journals',
      'Direct alignment with national health priorities',
      'NIH grant funding as principal investigator',
      'Patents with therapeutic applications'
    ],
    processingNotes: '5-day premium processing approval. Strong alignment with Cancer Moonshot was highlighted throughout petition.'
  },
  {
    id: 'eb1a-biotech-004',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Biomedical Engineer - Medical Devices',
    timeline: '3 months regular processing',
    profile: {
      position: 'Senior Biomedical Engineer',
      company: 'Medical Device Company',
      institution: 'State University',
      education: 'PhD Biomedical Engineering',
      country: 'South Korea',
      experienceLevel: '8 years'
    },
    metrics: {
      publications: 6,
      citations: 85,
      patents: 1,
      salary: '$195,000'
    },
    evidence: [
      '6 publications in specialized journals',
      '85 citations in medical device field',
      'Medical device patent pending',
      'FDA breakthrough designation for device',
      'Salary of $195K at medical device company',
      'Device addresses unmet medical need'
    ],
    keySuccess: [
      'FDA breakthrough designation proved national importance',
      'Clear documentation of unmet medical need',
      'Patent with commercial potential',
      'Strong salary relative to field'
    ],
    processingNotes: 'Approved despite modest citation count due to FDA breakthrough designation and commercial impact.'
  },
  {
    id: 'eb1a-biotech-005',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied-then-approved',
    title: 'Postdoctoral Researcher - Initially Denied',
    timeline: '8 months including appeal',
    profile: {
      position: 'Postdoctoral Researcher',
      company: 'University Research Lab',
      institution: 'State University',
      education: 'PhD Molecular Biology',
      country: 'Brazil',
      experienceLevel: '4 years post-PhD'
    },
    metrics: {
      publications: 8,
      citations: 95,
      hIndex: 6
    },
    evidence: [
      '8 publications in peer-reviewed journals',
      '95 citations',
      'No patents or commercialization initially',
      'Research on viral mechanisms',
      'Added COVID-19 therapeutic applications on appeal'
    ],
    denialReasons: [
      'Research deemed too theoretical without practical application',
      'Lack of commercialization or patents',
      'Insufficient evidence of recognition beyond academia'
    ],
    keySuccess: [
      'Won appeal by demonstrating COVID-19 therapeutic applications',
      'Added letters from pharmaceutical companies interested in research',
      'Showed alignment with pandemic response priorities'
    ],
    processingNotes: 'Initially denied as too theoretical. Appeal succeeded by pivoting to COVID-19 applications and commercial interest.'
  },

  // EB-1A Fintech Cases
  {
    id: 'eb1a-fintech-002',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Quantitative Trading VP',
    timeline: '2 months regular processing',
    profile: {
      position: 'Vice President - Quantitative Trading',
      company: 'Major Hedge Fund',
      institution: 'MIT',
      education: 'PhD Mathematics',
      country: 'France',
      experienceLevel: '12 years in quantitative finance'
    },
    metrics: {
      publications: 5,
      citations: 120,
      salary: '$425,000',
      transactionVolume: '$150M portfolio'
    },
    evidence: [
      'Published trading algorithms in quantitative finance journals',
      'Managed $150M portfolio with documented performance',
      'Speaker at QuantCon and industry conferences',
      'Total compensation of $425K in NYC',
      'Documented $20M+ in alpha generation',
      'Cited in industry publications'
    ],
    keySuccess: [
      'Quantified financial impact with specific alpha generation',
      'Exceptional compensation in competitive market',
      'Published proprietary algorithms with industry adoption',
      'Speaking engagements at premier quant conferences'
    ],
    processingNotes: 'Strong case with clear financial impact metrics. Alpha generation documentation was key.'
  },
  {
    id: 'eb1a-fintech-003',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Blockchain Developer',
    timeline: '3 months to denial',
    profile: {
      position: 'Senior Blockchain Developer',
      company: 'Crypto Startup',
      institution: 'Online Bootcamp',
      education: 'BS Computer Science',
      country: 'Nigeria',
      experienceLevel: '5 years'
    },
    metrics: {
      publications: 2,
      citations: 15,
      salary: '$180,000',
      githubStars: 500
    },
    evidence: [
      '2 whitepapers with minimal citations',
      'Open source blockchain contributions',
      'Salary of $180K at crypto startup',
      '500 GitHub stars on DeFi project',
      'Conference talks at crypto events'
    ],
    denialReasons: [
      'Emerging field lacks established recognition criteria',
      'Whitepapers not peer-reviewed publications',
      'Crypto conferences not recognized as prestigious venues',
      'Unable to demonstrate sustained acclaim in nascent field',
      'Salary not exceptional for crypto industry'
    ],
    processingNotes: 'Denied due to difficulty proving extraordinary ability in emerging blockchain field without established metrics.'
  },
  
  // Additional EB-1A Tech Cases - Mixed Outcomes
  {
    id: 'eb1a-tech-007',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'DevOps Director - Approved without RFE',
    timeline: '4 months regular processing',
    profile: {
      position: 'Director of DevOps Engineering',
      company: 'Fortune 500 Tech Company',
      experienceLevel: '15 years',
      education: 'MS in Computer Engineering',
      country: 'Canada'
    },
    metrics: {
      publications: 12,
      citations: 380,
      patents: 5,
      salary: '$420,000'
    },
    evidence: [
      'Created industry-standard CI/CD framework',
      '12 publications on DevOps practices',
      '380 citations from industry practitioners',
      '5 patents on deployment automation',
      'Led team of 50+ engineers',
      'Speaker at DevOps World conference',
      'Framework adopted by 100+ companies'
    ],
    keySuccess: [
      'Industry-standard framework as extraordinary contribution',
      'Wide adoption metrics demonstrated impact',
      'High compensation validated expertise',
      'Patents showed innovation beyond normal duties'
    ],
    processingNotes: 'Smooth approval emphasizing industry-wide impact of DevOps framework'
  },
  {
    id: 'eb1a-tech-008',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Embedded Systems Engineer - RFE then Approved',
    timeline: '7 months with RFE',
    profile: {
      position: 'Principal Embedded Systems Engineer',
      company: 'Automotive Tech Company',
      experienceLevel: '10 years',
      education: 'MS in Electrical Engineering',
      country: 'Taiwan'
    },
    metrics: {
      publications: 7,
      citations: 145,
      patents: 2
    },
    evidence: [
      '7 publications on embedded systems',
      '145 citations in automotive industry',
      '2 patents on safety-critical systems',
      'Led development of ADAS platform',
      'IEEE senior member'
    ],
    keySuccess: [
      'Board resolution establishing critical role',
      'Product impact metrics showing safety improvements',
      'Industry adoption of embedded platform'
    ],
    keyFailure: [
      'Initial petition focused too much on job duties',
      'Failed to clearly show impact beyond employer'
    ],
    processingNotes: 'RFE requested proof of critical role beyond job duties - fixed with board resolution and impact metrics'
  },
  {
    id: 'eb1a-tech-009',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Mobile App Architect - Denied',
    timeline: '3 months to denial',
    profile: {
      position: 'Mobile App Architect',
      company: 'App Development Studio',
      experienceLevel: '6 years',
      education: 'BS in Computer Science',
      country: 'Brazil'
    },
    metrics: {
      publications: 2,
      citations: 38
    },
    evidence: [
      '2 publications on mobile architecture',
      '38 citations',
      '500K app downloads',
      'Apps featured in App Store',
      'Conference presentations'
    ],
    denialReasons: [
      'Downloads alone don\'t prove extraordinary ability',
      'App Store features are commercial success, not peer recognition',
      'Insufficient evidence of sustained acclaim',
      'Conference presentations at non-prestigious venues'
    ],
    processingNotes: 'Denial shows downloads and commercial success insufficient without peer recognition'
  },

  // Additional EB-1A Biotech Cases - Diverse Roles
  {
    id: 'eb1a-biotech-006',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Clinical Research Director - Strong Approval',
    timeline: '3 months regular processing',
    profile: {
      position: 'Director of Clinical Research',
      company: 'Major Pharma Company',
      experienceLevel: '18 years',
      education: 'MD/PhD',
      country: 'Germany'
    },
    metrics: {
      publications: 28,
      citations: 920,
      salary: '$380,000'
    },
    evidence: [
      '28 publications in NEJM/Lancet',
      '920 citations from clinical researchers',
      'Led 5 FDA-approved drug trials',
      'Principal investigator on $50M grants',
      'Advisory board member for FDA',
      'Editorial board of clinical journals'
    ],
    keySuccess: [
      'NEJM/Lancet publications demonstrated top-tier recognition',
      'FDA advisory role showed government reliance',
      'Multiple approved drugs showed real-world impact',
      'High h-index in clinical research'
    ],
    processingNotes: 'Premium processing approved in 10 days - exemplary clinical research case'
  },
  {
    id: 'eb1a-biotech-007',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Bioinformatics Scientist - Moderate Approval',
    timeline: '5 months regular processing',
    profile: {
      position: 'Senior Bioinformatics Scientist',
      company: 'Genomics Institute',
      experienceLevel: '8 years',
      education: 'PhD in Computational Biology',
      country: 'China'
    },
    metrics: {
      publications: 9,
      citations: 210,
      githubStars: 1200
    },
    evidence: [
      '9 publications on genomic analysis',
      '210 citations from research community',
      'Created genomic analysis pipeline used by 50+ labs',
      'GitHub repository with 1200 stars',
      'Tool mentioned in Nature Methods',
      'Invited speaker at ASHG conference'
    ],
    keySuccess: [
      'Tool adoption across institutions showed broad impact',
      'Nature Methods mention validated significance',
      'Combined computational and biological expertise',
      'Open-source contribution to scientific community'
    ],
    processingNotes: 'Approved based on tool creation and adoption rather than pure publication metrics'
  },
  {
    id: 'eb1a-biotech-008',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Lab Manager - Denied then Approved on Appeal',
    timeline: '10 months including appeal',
    profile: {
      position: 'Laboratory Manager',
      company: 'Research Hospital',
      experienceLevel: '12 years',
      education: 'MS in Molecular Biology',
      country: 'South Korea'
    },
    metrics: {
      publications: 15,
      citations: 280,
      patents: 3
    },
    evidence: [
      '15 publications as co-author',
      '280 citations',
      '3 patents on diagnostic methods',
      'Managed lab of 20 researchers',
      'Developed novel protocols'
    ],
    keySuccess: [
      'Appeal showed 3 breakthrough discoveries',
      'Patents commercialized for diagnostics',
      'Protocols adopted internationally'
    ],
    keyFailure: [
      'Initial denial: Management not extraordinary',
      'Co-authorship minimized in initial petition'
    ],
    processingNotes: 'Initial denial overturned by demonstrating scientific breakthroughs, not just management'
  },
  {
    id: 'eb1a-biotech-009',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Protein Engineer - Weak Case Denied',
    timeline: '4 months to denial',
    profile: {
      position: 'Protein Engineer',
      company: 'Biotech Startup',
      experienceLevel: '4 years',
      education: 'PhD in Biochemistry',
      country: 'India'
    },
    metrics: {
      publications: 5,
      citations: 89
    },
    evidence: [
      '5 publications on protein engineering',
      '89 citations',
      'Junior role in research team',
      'Conference poster presentations',
      'One provisional patent pending'
    ],
    denialReasons: [
      'Insufficient leadership evidence',
      'No independent recognition beyond employer',
      'Early career with limited impact',
      'Poster presentations not oral presentations'
    ],
    processingNotes: 'Denied - typical early career researcher without sufficient independent recognition'
  },

  // Additional EB-1A Fintech Cases - Various Levels
  {
    id: 'eb1a-fintech-004',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Risk Analytics VP - Approved Fast',
    timeline: '15 days premium processing',
    profile: {
      position: 'VP of Risk Analytics',
      company: 'Major Investment Bank',
      experienceLevel: '15 years',
      education: 'PhD in Financial Mathematics',
      country: 'Russia'
    },
    metrics: {
      publications: 8,
      citations: 340,
      salary: '$450,000'
    },
    evidence: [
      'Created models preventing $2B in losses',
      'Published in Journal of Finance',
      '340 citations from risk professionals',
      'Federal Reserve consulting',
      'Risk model adopted industry-wide',
      'Expert witness in financial litigation'
    ],
    keySuccess: [
      '$2B loss prevention quantified impact',
      'Federal Reserve consulting showed government reliance',
      'Industry-wide model adoption',
      'Very high compensation validated expertise'
    ],
    processingNotes: 'Premium processing approved in 15 days - strong quantifiable financial impact'
  },
  {
    id: 'eb1a-fintech-005',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Compliance Tech Lead - RFE Success',
    timeline: '6 months with RFE',
    profile: {
      position: 'Technical Lead - Regulatory Compliance',
      company: 'RegTech Startup',
      experienceLevel: '9 years',
      education: 'MS in Computer Science',
      country: 'Singapore'
    },
    metrics: {
      publications: 4,
      citations: 95,
      salary: '$280,000'
    },
    evidence: [
      'Built RegTech platform for 20+ banks',
      '4 publications on compliance automation',
      '95 citations',
      'Platform processes $500M daily',
      'Speaking at compliance conferences',
      'Advisory role with regulators'
    ],
    keySuccess: [
      'Industry adoption metrics provided after RFE',
      'Regulatory cost savings quantified',
      'Letters from bank compliance officers'
    ],
    keyFailure: [
      'RFE: Show impact beyond employer',
      'Initial petition lacked adoption metrics'
    ],
    processingNotes: 'RFE overcome by providing detailed platform adoption and impact metrics'
  },
  {
    id: 'eb1a-fintech-006',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Junior Quant - Denied',
    timeline: '3 months to denial',
    profile: {
      position: 'Quantitative Analyst',
      company: 'Proprietary Trading Firm',
      experienceLevel: '2 years',
      education: 'MS in Financial Engineering',
      country: 'South Korea'
    },
    metrics: {
      publications: 1,
      salary: '$200,000'
    },
    evidence: [
      '2 years experience',
      '1 publication in working paper',
      'High salary for experience level',
      'Trading strategies generated profits',
      'Internal recognition at firm'
    ],
    denialReasons: [
      'Early career, need to build more evidence',
      'Internal recognition insufficient',
      'Working paper not peer-reviewed',
      'Profits benefited employer, not field'
    ],
    processingNotes: 'Denied - too early in career despite high salary, advised to reapply after building record'
  },

  // Cross-Disciplinary Cases
  {
    id: 'eb1a-biotech-010',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Healthtech CEO - Approved',
    timeline: '3 months regular processing',
    profile: {
      position: 'Founder & CEO',
      company: 'Digital Health Unicorn',
      experienceLevel: '12 years',
      education: 'MD/MBA',
      country: 'Israel'
    },
    metrics: {
      funding: '$50M raised',
      patents: 15,
      publications: 8
    },
    evidence: [
      '2 successful exits in healthtech',
      '$50M raised from top-tier VCs',
      '15 patents in digital health',
      'Featured in Forbes, WSJ',
      'WHO advisory board member',
      'Platform used by 500+ hospitals'
    ],
    keySuccess: [
      'Combined medical and business extraordinary ability',
      'WHO advisory role showed international recognition',
      'Multiple exits demonstrated sustained success',
      'Wide hospital adoption showed healthcare impact'
    ],
    processingNotes: 'Health-tech fusion case approved showing impact across medicine and technology'
  },
  {
    id: 'eb1a-tech-010',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Climate Tech Lead - Approved',
    timeline: '4 months regular processing',
    profile: {
      position: 'Climate Technology Lead',
      company: 'Cloud Infrastructure Provider',
      experienceLevel: '10 years',
      education: 'PhD in Environmental Engineering',
      country: 'Denmark'
    },
    metrics: {
      publications: 18,
      citations: 420,
      patents: 4
    },
    evidence: [
      '18 publications on green computing',
      '420 citations from sustainability researchers',
      'Reduced data center emissions by 40%',
      'UN Climate Summit speaker',
      '4 patents on cooling efficiency',
      'Created industry carbon tracking standard'
    ],
    keySuccess: [
      'Quantifiable 40% emission reduction',
      'UN speaking showed international recognition',
      'Industry standard adoption',
      'Aligned with climate priorities'
    ],
    processingNotes: 'Strong approval leveraging climate change as area of national importance'
  },
  {
    id: 'eb1a-tech-011',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'denied',
    title: 'EdTech Founder - Initially Denied',
    timeline: '4 months to denial',
    profile: {
      position: 'Founder & CTO',
      company: 'Educational Technology Platform',
      experienceLevel: '7 years',
      education: 'MS in Education Technology',
      country: 'India'
    },
    metrics: {
      funding: '$5M seed'
    },
    evidence: [
      '1M student users globally',
      '$5M seed funding',
      'Platform in 200 schools',
      'Education conference speaker',
      'Media coverage in education press',
      'No peer-reviewed publications'
    ],
    denialReasons: [
      'Commercial success alone insufficient',
      'No peer-reviewed academic publications',
      'Education conferences not prestigious venues',
      'User metrics don\'t prove extraordinary ability'
    ],
    processingNotes: 'Denied - commercial EdTech success without academic recognition insufficient'
  },

  // Unusual Pattern Cases
  {
    id: 'eb1a-biotech-011',
    visaType: 'EB-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'denied',
    title: 'Research Scientist - High Citations, Still Denied',
    timeline: '5 months to denial',
    profile: {
      position: 'Senior Research Scientist',
      company: 'Pharmaceutical Research Institute',
      experienceLevel: '10 years',
      education: 'PhD in Pharmacology',
      country: 'Japan'
    },
    metrics: {
      publications: 22,
      citations: 450
    },
    evidence: [
      '22 publications with 450 citations',
      'All publications as co-author, never first/last',
      'Member of research consortium',
      'Conference attendance but not speaking',
      'Internal awards at institution'
    ],
    denialReasons: [
      'Supporting role, not leading research',
      'No first or last author publications',
      'Internal recognition insufficient',
      'Failed to show independent contributions'
    ],
    processingNotes: 'High citations insufficient when all in supporting role - leadership required'
  },
  {
    id: 'eb1a-tech-012',
    visaType: 'EB-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Startup CTO - Low Metrics, Approved',
    timeline: '4 months regular processing',
    profile: {
      position: 'Co-founder & CTO',
      company: 'AI Startup (Acquired)',
      experienceLevel: '8 years',
      education: 'BS in Computer Science',
      country: 'Ukraine'
    },
    metrics: {
      publications: 3,
      citations: 120,
      patents: 3
    },
    evidence: [
      'Only 120 citations but 3 key patents',
      'Patents licensed by Apple, Google',
      'Company acquired for $25M',
      'Technology integrated into major products',
      'Invited talks at invitation-only events',
      'Press coverage in major tech media'
    ],
    keySuccess: [
      'Quality over quantity approach worked',
      'Patent licensing by tech giants showed value',
      'Acquisition validated technology importance',
      'Product integration demonstrated real impact'
    ],
    processingNotes: 'Low academic metrics overcome by patent quality and commercial validation'
  },
  {
    id: 'eb1a-fintech-007',
    visaType: 'EB-1A',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Industry Veteran - Age Discrimination Concerns',
    timeline: '5 months regular processing',
    profile: {
      position: 'Chief Risk Officer',
      company: 'Digital Bank',
      experienceLevel: '25 years',
      education: 'MBA in Finance',
      country: 'United Kingdom'
    },
    metrics: {
      publications: 12,
      citations: 380,
      salary: '$550,000'
    },
    evidence: [
      '25 years experience addressed elegantly',
      'Focus on recent innovations in digital banking',
      'Created next-gen risk framework',
      'Mentored 50+ risk professionals',
      'Recent publications on AI in risk',
      'Board positions on fintech companies'
    ],
    keySuccess: [
      'Emphasized current impact, not just history',
      'Recent AI risk work showed continued innovation',
      'Mentorship framed as field advancement',
      'Digital transformation leadership highlighted'
    ],
    processingNotes: 'Successfully positioned extensive experience as ongoing innovation rather than past achievements'
  },

  // NIW Tech Cases
  {
    id: 'niw-tech-011',
    visaType: 'NIW',
    field: 'tech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Autonomous Vehicle Safety Researcher',
    timeline: '2 weeks with premium processing',
    profile: {
      position: 'Research Scientist - Autonomous Vehicles',
      company: 'Self-Employed Researcher',
      institution: 'Carnegie Mellon',
      education: 'PhD Robotics',
      country: 'Japan',
      experienceLevel: '7 years'
    },
    metrics: {
      publications: 5,
      citations: 180,
      patents: 2
    },
    evidence: [
      'PhD plus 5 publications on AV safety systems',
      'Research directly cited in NHTSA reports',
      'No job offer required - self-petitioned',
      'Patents on safety-critical AV systems',
      'Aligned with federal autonomous vehicle safety priorities',
      'Letters from transportation safety experts'
    ],
    keySuccess: [
      'Clear alignment with federal transportation safety priorities',
      'NHTSA citation demonstrated government reliance on work',
      'Proposed endeavor focused on reducing traffic fatalities',
      'Strong letters from government and industry'
    ],
    processingNotes: 'Exceptionally fast approval due to clear national interest in AV safety. NHTSA citations were crucial.'
  },
  {
    id: 'niw-tech-012',
    visaType: 'NIW',
    field: 'tech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Quantum Computing Scientist',
    timeline: '4 months regular processing',
    profile: {
      position: 'Quantum Computing Researcher',
      company: 'National Lab Contractor',
      institution: 'MIT',
      education: 'PhD Physics',
      country: 'Israel',
      experienceLevel: '6 years'
    },
    metrics: {
      publications: 4,
      citations: 29,
      hIndex: 3
    },
    evidence: [
      'Only 29 citations but approved (minimum threshold case)',
      'DARPA project involvement',
      'Research on quantum cryptography',
      'National security applications highlighted',
      'Letters from defense contractors',
      'Proposed endeavor on quantum-resistant encryption'
    ],
    keySuccess: [
      'National security angle overcame low citation count',
      'DARPA involvement showed government interest',
      'Clear proposed endeavor with specific milestones',
      'Strong emphasis on protecting critical infrastructure'
    ],
    processingNotes: 'Approved despite minimal citations due to national security importance of quantum computing research.'
  },
  {
    id: 'niw-tech-013',
    visaType: 'NIW',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied-then-approved',
    title: 'Data Scientist - Healthcare Analytics',
    timeline: '8 months total with refile',
    profile: {
      position: 'Senior Data Scientist',
      company: 'Healthcare Analytics Startup',
      institution: 'State University',
      education: 'MS Data Science',
      country: 'India',
      experienceLevel: '5 years'
    },
    metrics: {
      publications: 3,
      citations: 45
    },
    evidence: [
      'Initial proposed endeavor too vague',
      'Refiled with specific focus on healthcare cost reduction',
      'Added letters from hospital administrators',
      'Demonstrated $5M in healthcare savings',
      'Aligned with CMS cost reduction initiatives'
    ],
    denialReasons: [
      'Initial proposed endeavor lacked specificity',
      'Failed to show work was different from peers',
      'Insufficient evidence of national scope'
    ],
    keySuccess: [
      'Refiled with laser focus on Medicare cost savings',
      'Quantified impact with specific dollar amounts',
      'Letters from healthcare system executives',
      'Showed scalability across multiple states'
    ],
    processingNotes: 'Initial denial for vague endeavor. Succeeded on refile with specific healthcare cost focus and quantified impact.'
  },

  // NIW Biotech Cases
  {
    id: 'niw-biotech-011',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Environmental Chemist - PFAS Research',
    timeline: '3 months regular processing',
    profile: {
      position: 'Environmental Research Scientist',
      company: 'Environmental Consulting Firm',
      institution: 'UC Berkeley',
      education: 'PhD Environmental Chemistry',
      country: 'Netherlands',
      experienceLevel: '6 years'
    },
    metrics: {
      publications: 4,
      citations: 8,
      hIndex: 2
    },
    evidence: [
      'Only 8 citations but approved',
      'Focus on PFAS water contamination',
      'EPA priority alignment documented',
      'Public health emergency connection',
      'Research affects 200+ million Americans',
      'Letters from state environmental agencies'
    ],
    keySuccess: [
      'Direct connection to EPA priority contaminants',
      'Public health emergency framing',
      'Demonstrated national scope of PFAS problem',
      'State agency letters showed practical application'
    ],
    processingNotes: 'Low citations overcome by clear public health emergency and EPA priority alignment.'
  },
  {
    id: 'niw-biotech-002',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Gene Therapy Researcher - Rare Disease',
    timeline: '5 months regular processing',
    profile: {
      position: 'Gene Therapy Scientist',
      company: 'Biotech Startup',
      institution: 'Johns Hopkins',
      education: 'PhD Molecular Biology',
      country: 'China',
      experienceLevel: '5 years'
    },
    metrics: {
      publications: 2,
      citations: 3,
      patents: 1
    },
    evidence: [
      'NIW approved with only 3 citations',
      'Rare disease affecting <1000 Americans',
      'FDA Orphan Drug pathway involvement',
      'No other researchers in specific area',
      'Patient advocacy group support letters',
      'Potential to be first treatment for disease'
    ],
    keySuccess: [
      'Uniqueness - only researcher in specific rare disease',
      'FDA Orphan Drug designation pathway',
      'Patient advocacy letters showed urgent need',
      'No alternative treatments available'
    ],
    processingNotes: 'Extreme rarity of disease and lack of other researchers compensated for minimal citations.'
  },
  {
    id: 'niw-biotech-003',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Pharmaceutical Scientist - General Drug Delivery',
    timeline: '4 months to denial',
    profile: {
      position: 'Senior Pharmaceutical Scientist',
      company: 'Generic Drug Manufacturer',
      institution: 'State University',
      education: 'PhD Pharmaceutical Sciences',
      country: 'India',
      experienceLevel: '8 years'
    },
    metrics: {
      publications: 12,
      citations: 120,
      hIndex: 8
    },
    evidence: [
      '120 citations but all in general drug delivery',
      'Work on improving bioavailability',
      'No specific disease focus',
      'Similar work done by many researchers',
      'Generic formulation improvements'
    ],
    denialReasons: [
      'Work not differentiated from peers in field',
      'Lack of specific disease focus or unique approach',
      'Proposed endeavor too broad and unfocused',
      'Failed to show why petitioner uniquely positioned',
      'Generic drug work not deemed critical national interest'
    ],
    processingNotes: 'Denied despite decent citations. Lacked unique angle and specific disease/condition focus.'
  },

  // NIW Fintech Cases
  {
    id: 'niw-fintech-008',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Financial Crime Analyst - AML Systems',
    timeline: '3 months regular processing',
    profile: {
      position: 'Principal AML Systems Architect',
      company: 'Major Bank',
      institution: 'London School of Economics',
      education: 'MS Financial Engineering',
      country: 'UK',
      experienceLevel: '10 years'
    },
    metrics: {
      publications: 2,
      citations: 35,
      transactionVolume: '$2B fraud prevented'
    },
    evidence: [
      'No PhD but approved based on expertise',
      'Created novel AML detection algorithm',
      '$2B in prevented fraud documented',
      'Treasury Department priority alignment',
      'FinCEN recognition for innovative approach',
      'Used by multiple financial institutions'
    ],
    keySuccess: [
      'Quantified national economic protection ($2B)',
      'Treasury/FinCEN priority alignment clear',
      'Algorithm adopted by multiple banks',
      'Letters from law enforcement agencies'
    ],
    processingNotes: 'No PhD overcome by exceptional real-world impact and government priority alignment.'
  },
  {
    id: 'niw-fintech-002',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Crypto Tax Specialist',
    timeline: '5 months to denial',
    profile: {
      position: 'Cryptocurrency Tax Consultant',
      company: 'Freelance Consultant',
      institution: 'Online University',
      education: 'MBA Finance',
      country: 'Turkey',
      experienceLevel: '4 years'
    },
    metrics: {
      publications: 1,
      citations: 5
    },
    evidence: [
      'Constantly changing proposed endeavor',
      'First submission: DeFi protocol taxation',
      'Then pivoted to: NFT taxation framework',
      'Finally changed to: CBDC implementation',
      'Minimal publications or citations'
    ],
    denialReasons: [
      'Lack of consistent focus in proposed endeavor',
      'Insufficient expertise demonstration',
      'Regulatory landscape too uncertain',
      'No clear national interest in crypto tax optimization',
      'Work could be done by any tax professional'
    ],
    processingNotes: 'Denied for inconsistent proposed endeavor and inability to show unique expertise in rapidly changing field.'
  },

  // O-1A Tech Cases
  {
    id: 'o1a-tech-004',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Product Manager at Unicorn Startup',
    timeline: '15 days premium processing',
    profile: {
      position: 'VP of Product',
      company: 'Unicorn Startup (>$1B valuation)',
      institution: 'Y Combinator',
      education: 'MBA from Top Business School',
      country: 'Canada',
      experienceLevel: '8 years'
    },
    metrics: {
      funding: '$3M seed funding raised',
      salary: '$280,000',
      conferencesSpeaking: 10
    },
    evidence: [
      'Y Combinator alumnus',
      '$3M seed funding raised for previous startup',
      'TechCrunch Disrupt finalist',
      '2 startups successfully acquired',
      'Salary of $280K plus equity',
      'Featured speaker at product conferences',
      'Consultation letter from product management association'
    ],
    keySuccess: [
      'Y Combinator credential highly regarded',
      'Proven track record with acquisitions',
      'TechCrunch coverage demonstrated recognition',
      'Strong consultation letter from industry org'
    ],
    processingNotes: '15-day approval. Startup success metrics and Y Combinator connection were compelling.'
  },
  {
    id: 'o1a-tech-005',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'ML Infrastructure Lead',
    timeline: '2 months regular processing',
    profile: {
      position: 'Staff ML Infrastructure Engineer',
      company: 'Major Tech Company',
      institution: 'Stanford',
      education: 'MS Computer Science',
      country: 'India',
      experienceLevel: '10 years'
    },
    metrics: {
      publications: 6,
      citations: 220,
      githubStars: 15000,
      salary: '$350,000'
    },
    evidence: [
      'Presented at NeurIPS, ICML, and other top conferences',
      '1M+ downloads of open source ML library',
      '15,000 GitHub stars on ML infrastructure project',
      'Google AI Impact Challenge winner',
      'Salary of $350K at major tech company',
      'Library used by Fortune 500 companies',
      'Peer group consultation obtained'
    ],
    keySuccess: [
      'Massive adoption of open source library',
      'Presentations at top-tier ML conferences',
      'Google AI Impact Challenge provided third-party validation',
      'Commercial adoption by major companies'
    ],
    processingNotes: 'Strong case with clear industry impact. Open source adoption metrics were key.'
  },
  {
    id: 'o1a-biotech-001',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Clinical Trial Director',
    timeline: '3 weeks premium processing',
    profile: {
      position: 'Director of Clinical Trials',
      company: 'Pharmaceutical Company',
      institution: 'Harvard Medical School',
      education: 'MD from Top Medical School',
      country: 'UK',
      experienceLevel: '12 years'
    },
    metrics: {
      publications: 8,
      citations: 340,
      salary: '$275,000'
    },
    evidence: [
      'Led Phase 3 trials resulting in FDA approval',
      'Published trial results in NEJM and Lancet',
      'Salary of $275K plus bonuses',
      'Essential role in bringing drug to market',
      'Invited speaker at medical conferences',
      'Expert witness in pharmaceutical litigation',
      'Consultation from medical association'
    ],
    keySuccess: [
      'Direct role in FDA-approved drug',
      'Publications in highest-impact medical journals',
      'Essential role documentation from employer',
      'Expert witness experience showed recognition'
    ],
    processingNotes: 'Approved quickly. FDA approval involvement and NEJM publications were decisive factors.'
  },

  // O-1A DENIAL CASES
  {
    id: 'o1a-tech-006',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Senior Software Engineer - Insufficient Evidence',
    timeline: '3 months',
    profile: {
      position: 'Staff Engineer',
      company: 'Mid-size Tech Company',
      experienceLevel: '7 years',
      education: "Master's in Computer Science",
      country: 'India'
    },
    metrics: {
      publications: 5,
      citations: 150,
      salary: '$220,000'
    },
    evidence: [
      'GitHub contributions',
      'Conference talks at regional events',
      'Internal company awards',
      'Technical blog posts'
    ],
    denialReasons: [
      'Failed to demonstrate extraordinary ability - achievements common for senior engineers',
      'No major awards or recognition outside employer',
      'Lack of media coverage',
      'No evidence of judging or critical role'
    ],
    keyFailure: [
      'Common achievements for senior-level position',
      'All recognition was internal to company',
      'Regional rather than national impact'
    ],
    processingNotes: 'Denied. USCIS found achievements typical for experienced engineers, not extraordinary.'
  },
  {
    id: 'o1a-tech-007',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Data Scientist - Weak Letters',
    timeline: '4 months',
    profile: {
      position: 'Senior Data Scientist',
      company: 'Fortune 500 Company',
      experienceLevel: '6 years',
      education: 'PhD in Statistics',
      country: 'China'
    },
    metrics: {
      publications: 3,
      citations: 89,
      patents: 2
    },
    evidence: [
      '3 patents pending',
      'Conference presentations',
      'All recommendation letters from current employer',
      'Technical contributions to products'
    ],
    denialReasons: [
      'Lack of independent expert validation',
      'All letters from current employer colleagues',
      'No external recognition of achievements',
      'Patents pending, not granted'
    ],
    keyFailure: [
      'Need 60-70% letters from external sources',
      'Internal validation insufficient',
      'Pending patents carry less weight'
    ],
    processingNotes: 'Denied due to lack of independent validation. All support was from within current organization.'
  },
  {
    id: 'o1a-tech-008',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Startup CTO - Premature Application',
    timeline: '2 months',
    profile: {
      position: 'CTO & Co-founder',
      company: 'Pre-seed Startup',
      experienceLevel: '4 years',
      education: "Bachelor's in Engineering",
      country: 'India'
    },
    metrics: {
      funding: '$500,000',
      publications: 0,
      citations: 0
    },
    evidence: [
      'CTO role at startup',
      '$500K raised in pre-seed',
      '3 employees managed',
      'Product in development'
    ],
    denialReasons: [
      'Insufficient proof of sustained acclaim',
      'No demonstrated success, only potential',
      'Startup too early stage',
      'No publications or recognized achievements'
    ],
    keyFailure: [
      'Need demonstrated success, not just potential',
      'Pre-seed stage insufficient',
      'No track record of achievements'
    ],
    processingNotes: 'Denied quickly. Startup was too early stage with no proven success or recognition.'
  },
  {
    id: 'o1a-biotech-003',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Research Associate - Below Threshold',
    timeline: '3 months',
    profile: {
      position: 'Research Associate',
      company: 'University Research Lab',
      experienceLevel: '3 years',
      education: 'PhD in Molecular Biology',
      country: 'China'
    },
    metrics: {
      publications: 4,
      citations: 67,
      patents: 0
    },
    evidence: [
      '4 publications as co-author',
      'Lab presentations',
      'Conference poster presentations',
      'Grant participation (not PI)'
    ],
    denialReasons: [
      'Supporting role rather than critical capacity',
      'Non-lead author on all papers',
      'No independent research',
      'Insufficient evidence of extraordinary ability'
    ],
    keyFailure: [
      'Never first author on publications',
      'No independent research grants',
      'Supporting rather than leading role'
    ],
    processingNotes: 'Denied. USCIS found applicant in supporting role without evidence of extraordinary individual contributions.'
  },
  {
    id: 'o1a-fintech-003',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Crypto Developer - Unestablished Field',
    timeline: '5 months',
    profile: {
      position: 'DeFi Protocol Developer',
      company: 'Crypto Startup',
      experienceLevel: '3 years',
      education: "Bachelor's in Computer Science",
      country: 'Russia'
    },
    metrics: {
      transactionVolume: '$10M TVL'
    },
    evidence: [
      '2 whitepapers authored',
      '$10M total value locked in protocol',
      'Smart contract deployments',
      'Twitter following of 5K'
    ],
    denialReasons: [
      'Field lacks established criteria for extraordinary ability',
      'Difficulty proving recognition in emerging field',
      'Metrics not recognized by USCIS',
      'Social media following insufficient'
    ],
    keyFailure: [
      'Emerging fields harder to prove recognition',
      'TVL not recognized metric',
      'Need traditional evidence of recognition'
    ],
    processingNotes: 'Denied. USCIS struggled to evaluate achievements in emerging DeFi space without established criteria.'
  },

  // Additional O-1A Cases - Startup Ecosystem
  {
    id: 'o1a-tech-009',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Serial Entrepreneur - 3rd Exit',
    timeline: '10 days premium processing',
    profile: {
      position: 'Founder & CEO',
      company: 'Enterprise SaaS Startup',
      experienceLevel: '15 years',
      education: 'MBA from Stanford',
      country: 'Canada'
    },
    metrics: {
      funding: '$20M Series B',
      salary: '$300,000'
    },
    evidence: [
      '3 successful company exits totaling $100M+',
      'TechCrunch Disruptor winner',
      'Featured in Forbes 30 Under 30 (previously)',
      'Keynote speaker at major tech conferences',
      'Active angel investor with 20+ portfolio companies',
      'Board member of 3 tech startups'
    ],
    keySuccess: [
      'Multiple successful exits demonstrated track record',
      'TechCrunch Disruptor win showed industry recognition',
      'Speaking engagements proved thought leadership',
      'Angel investing showed continued industry influence'
    ],
    processingNotes: 'Premium processing approved in 10 days at NSC - serial entrepreneur with proven track record'
  },
  {
    id: 'o1a-tech-010',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'First-Time Founder - YC but Denied',
    timeline: '3 months to denial',
    profile: {
      position: 'Founder & CEO',
      company: 'Pre-revenue B2B SaaS',
      experienceLevel: '2 years',
      education: 'BS in Computer Science',
      country: 'India'
    },
    metrics: {
      funding: '$125K from Y Combinator'
    },
    evidence: [
      'Y Combinator acceptance (current batch)',
      'No revenue yet',
      '3 employees',
      'Product in beta with 10 pilot customers',
      'One provisional patent filed',
      'Demo Day presentation upcoming'
    ],
    denialReasons: [
      'Too early stage - no demonstrated success',
      'YC acceptance alone insufficient',
      'No revenue or significant user traction',
      'Potential for success not enough for O-1A'
    ],
    processingNotes: 'Denied at TSC - YC acceptance without traction insufficient, advised to reapply after demonstrating growth'
  },
  {
    id: 'o1a-tech-011',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Growth Stage CEO - Approved',
    timeline: '15 days premium processing',
    profile: {
      position: 'CEO',
      company: 'B2C Marketplace Platform',
      experienceLevel: '8 years',
      education: 'MS in Engineering Management',
      country: 'Brazil'
    },
    metrics: {
      funding: '$15M Series B',
      salary: '$250,000'
    },
    evidence: [
      '$15M Series B from tier-1 VCs',
      '100 employees across 3 countries',
      'Inc 5000 fastest growing companies',
      '$25M ARR with 150% YoY growth',
      'Industry awards for innovation',
      'Regular media coverage in tech press'
    ],
    keySuccess: [
      'Demonstrated traction with revenue and growth metrics',
      'Inc 5000 recognition validated extraordinary ability',
      'Tier-1 VC backing showed industry validation',
      'Clear metrics of business success'
    ],
    processingNotes: 'Approved showing growth-stage success metrics and third-party validation'
  },

  // O-1A Tech Specialists
  {
    id: 'o1a-tech-012',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'AI Ethics Researcher - Approved',
    timeline: '12 days premium processing',
    profile: {
      position: 'Director of AI Ethics',
      company: 'AI Research Institute',
      experienceLevel: '10 years',
      education: 'PhD in Computer Science',
      country: 'France'
    },
    metrics: {
      publications: 15,
      citations: 450,
      salary: '$280,000'
    },
    evidence: [
      'Congressional testimony on AI safety',
      'Published in Nature, Science',
      'Speaking at Davos, TED main stage',
      'Advising EU on AI regulation',
      'Media appearances on CNN, BBC',
      'Book on AI ethics bestseller'
    ],
    keySuccess: [
      'Congressional testimony showed government reliance',
      'Nature/Science publications proved top-tier recognition',
      'Davos/TED speaking showed international prominence',
      'Cross-disciplinary impact beyond just tech'
    ],
    processingNotes: 'Strong approval based on policy influence and public intellectual status'
  },
  {
    id: 'o1a-tech-013',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Blockchain Architect - RFE then Approved',
    timeline: '5 months with RFE',
    profile: {
      position: 'Lead Blockchain Architect',
      company: 'Enterprise Blockchain Company',
      experienceLevel: '7 years',
      education: 'MS in Distributed Systems',
      country: 'Russia'
    },
    metrics: {
      githubStars: 2500,
      salary: '$220,000'
    },
    evidence: [
      'Created widely-used blockchain framework',
      '2500+ GitHub stars on projects',
      'Conference keynotes at blockchain events',
      'Technical advisor to 5 blockchain startups',
      'Published blockchain standards adopted by consortium'
    ],
    keySuccess: [
      'Added conference keynotes after RFE',
      'Quantified GitHub impact and adoption',
      'Industry consortium adoption proved influence'
    ],
    keyFailure: [
      'RFE requested proof of field recognition',
      'Initial petition lacked speaking engagements'
    ],
    processingNotes: 'RFE overcome by demonstrating thought leadership through speaking and standards work'
  },
  {
    id: 'o1a-tech-014',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'AR/VR Developer - Denied',
    timeline: '4 months to denial',
    profile: {
      position: 'Senior AR/VR Developer',
      company: 'Gaming Studio',
      experienceLevel: '5 years',
      education: 'BS in Game Design',
      country: 'South Korea'
    },
    metrics: {
      salary: '$150,000'
    },
    evidence: [
      'Created impressive AR/VR demos',
      'YouTube channel with 10K subscribers',
      'Hackathon wins',
      'No commercial product success',
      'Conference attendee, not speaker'
    ],
    denialReasons: [
      'Great demos but no commercial success',
      'Potential not sufficient for O-1A',
      'Hackathon wins not prestigious awards',
      'YouTube following not extraordinary'
    ],
    processingNotes: 'Denied - technical skill without commercial validation or industry recognition insufficient'
  },

  // O-1A Biotech Variety
  {
    id: 'o1a-biotech-004',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Gene Therapy Pioneer - Fast Approval',
    timeline: '5 days premium processing',
    profile: {
      position: 'Chief Scientific Officer',
      company: 'Gene Therapy Startup',
      experienceLevel: '12 years',
      education: 'MD/PhD',
      country: 'UK'
    },
    metrics: {
      publications: 25,
      citations: 850,
      funding: '$30M Series A',
      salary: '$350,000'
    },
    evidence: [
      'Leading first-in-human gene therapy trial',
      'Nature cover story on breakthrough',
      'NIH grant recipient ($5M)',
      'Scientific advisory board of 3 biotechs',
      'Keynote at major medical conferences',
      'Patents on novel gene delivery methods'
    ],
    keySuccess: [
      'First-in-human trial leadership showed pioneering work',
      'Nature cover story demonstrated field prominence',
      'NIH funding validated government support',
      'Multiple SAB positions showed industry recognition'
    ],
    processingNotes: 'Premium processing approved in 5 days - exceptional biotech credentials'
  },
  {
    id: 'o1a-biotech-005',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Drug Discovery Scientist - Moderate',
    timeline: '3 months regular processing',
    profile: {
      position: 'Director of Drug Discovery',
      company: 'Mid-size Pharma',
      experienceLevel: '8 years',
      education: 'PhD in Medicinal Chemistry',
      country: 'China'
    },
    metrics: {
      publications: 12,
      citations: 180,
      patents: 4,
      salary: '$200,000'
    },
    evidence: [
      '2 drugs in Phase 2 clinical trials',
      '180 citations in drug discovery field',
      'Industry awards from pharma associations',
      'Speaking at drug discovery conferences',
      'Consulting for biotech startups',
      'Review editor for pharmacology journal'
    ],
    keySuccess: [
      'Phase 2 trials showed real-world impact',
      'Industry awards validated peer recognition',
      'Editorial role demonstrated field expertise',
      'Consulting showed industry demand for expertise'
    ],
    processingNotes: 'Approved based on drug pipeline progress and industry recognition'
  },
  {
    id: 'o1a-biotech-006',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Medical Device Engineer - RFE',
    timeline: '6 months with RFE',
    profile: {
      position: 'Principal Medical Device Engineer',
      company: 'Medical Device Startup',
      experienceLevel: '9 years',
      education: 'MS in Biomedical Engineering',
      country: 'Israel'
    },
    metrics: {
      patents: 6,
      salary: '$180,000'
    },
    evidence: [
      'Designed FDA-approved cardiac device',
      '6 patents in medical devices',
      'Device used in 500+ hospitals',
      'Speaking at medical device conferences',
      'Awards from engineering societies'
    ],
    keySuccess: [
      'FDA approval documentation provided after RFE',
      'Patient testimonials added showing impact',
      'Hospital adoption metrics quantified'
    ],
    keyFailure: [
      'RFE requested proof of patient impact',
      'Initial petition focused too much on technical details'
    ],
    processingNotes: 'RFE overcome by shifting focus from technical innovation to patient impact'
  },
  {
    id: 'o1a-biotech-007',
    visaType: 'O-1A',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Postdoc Researcher - Denied',
    timeline: '3 months to denial',
    profile: {
      position: 'Postdoctoral Researcher',
      company: 'University Research Lab',
      experienceLevel: '2 years post-PhD',
      education: 'PhD in Molecular Biology',
      country: 'India'
    },
    metrics: {
      publications: 4,
      citations: 45,
      salary: '$55,000'
    },
    evidence: [
      'Strong research but no leadership role',
      '4 publications as middle author',
      'Conference poster presentations',
      'No independent funding',
      'Still in training position'
    ],
    denialReasons: [
      'Still in training position (postdoc)',
      'No evidence of independent research',
      'Middle authorship shows supporting role',
      'Salary reflects training position'
    ],
    processingNotes: 'Denied - postdoc positions generally considered training, not extraordinary ability'
  },

  // O-1A Fintech Leaders
  {
    id: 'o1a-fintech-004',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Crypto Exchange CTO - Approved Despite Controversy',
    timeline: '15 days premium processing',
    profile: {
      position: 'CTO & Co-founder',
      company: 'Regulated Crypto Exchange',
      experienceLevel: '10 years',
      education: 'MS in Computer Science',
      country: 'Japan'
    },
    metrics: {
      transactionVolume: '$5B monthly volume',
      salary: '$400,000'
    },
    evidence: [
      'Built SEC-compliant crypto platform',
      '$5B monthly trading volume',
      'BitLicense obtained in New York',
      'Congressional testimony on crypto regulation',
      'Speaking at major fintech conferences',
      'Advisor to central banks on CBDC'
    ],
    keySuccess: [
      'Focus on regulatory compliance overcame crypto stigma',
      'BitLicense showed meeting highest standards',
      'Congressional testimony proved expertise value',
      'Central bank advisory showed institutional trust'
    ],
    processingNotes: 'Approved by emphasizing compliance and regulation rather than crypto speculation'
  },
  {
    id: 'o1a-fintech-005',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Payment Innovation VP - Approved',
    timeline: '12 days premium processing',
    profile: {
      position: 'VP of Payment Innovation',
      company: 'Payment Processing Giant',
      experienceLevel: '12 years',
      education: 'MBA in Finance',
      country: 'Netherlands'
    },
    metrics: {
      transactionVolume: '$10B+ processed',
      patents: 8,
      salary: '$320,000'
    },
    evidence: [
      '8 patents in contactless payment technology',
      'Processed $10B+ in transactions',
      'Led Apple Pay integration project',
      'Industry awards for payment innovation',
      'Speaking at Money 20/20',
      'Published in payment industry journals'
    ],
    keySuccess: [
      'Patents showed technical innovation',
      'Transaction volume demonstrated scale of impact',
      'Apple Pay integration showed industry significance',
      'Money 20/20 speaking validated thought leadership'
    ],
    processingNotes: 'Strong approval based on technical innovation and industry-wide impact'
  },
  {
    id: 'o1a-fintech-006',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'moderate',
    outcome: 'denied',
    title: 'Algorithmic Trading Lead - Denied',
    timeline: '4 months to denial',
    profile: {
      position: 'Head of Algorithmic Trading',
      company: 'Proprietary Trading Firm',
      experienceLevel: '8 years',
      education: 'PhD in Mathematics',
      country: 'Russia'
    },
    metrics: {
      salary: '$500,000'
    },
    evidence: [
      'Developed profitable trading strategies',
      'High salary but proprietary work',
      'Cannot share performance metrics',
      'No public speaking or publications',
      'Internal recognition only'
    ],
    denialReasons: [
      'Proprietary work - couldn\'t share details',
      'Insufficient public evidence of recognition',
      'High salary alone not sufficient',
      'No external validation of expertise'
    ],
    processingNotes: 'Denied - proprietary trading work difficult to document for O-1A without public evidence'
  },

  // Corporate to O-1A Transitions
  {
    id: 'o1a-tech-015',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Google L7 to Startup - Approved',
    timeline: '10 days premium processing',
    profile: {
      position: 'Founder & CEO (Former Google L7)',
      company: 'AI Infrastructure Startup',
      experienceLevel: '12 years',
      education: 'PhD from MIT',
      country: 'India'
    },
    metrics: {
      salary: '$200,000',
      funding: '$8M seed'
    },
    evidence: [
      'Google L7 (Staff Engineer) for 5 years',
      'Led team of 30+ at Google',
      'Published 10+ papers while at Google',
      '3 patents from Google work',
      '$8M seed from Sequoia',
      'Building team of ex-FAANG engineers'
    ],
    keySuccess: [
      'Leveraged big tech credibility effectively',
      'L7 position showed extraordinary achievement',
      'Sequoia funding validated startup potential',
      'Patents and publications from Google strengthened case'
    ],
    processingNotes: 'FAANG credentials successfully leveraged for startup O-1A approval'
  },
  {
    id: 'o1a-fintech-007',
    visaType: 'O-1A',
    field: 'fintech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'McKinsey Partner to Fintech - Approved',
    timeline: '8 days premium processing',
    profile: {
      position: 'CEO (Former McKinsey Partner)',
      company: 'B2B Fintech Platform',
      experienceLevel: '15 years',
      education: 'Harvard MBA',
      country: 'Germany'
    },
    metrics: {
      salary: '$350,000',
      funding: '$20M Series A'
    },
    evidence: [
      'McKinsey Partner for 3 years',
      'Led financial services transformation practice',
      'Published McKinsey reports on fintech',
      'Board member of 2 financial institutions',
      'Regular speaker at banking conferences',
      '$20M raised from tier-1 VCs'
    ],
    keySuccess: [
      'McKinsey Partner role demonstrated elite status',
      'Industry transformation work showed impact',
      'Board positions proved industry recognition',
      'Thought leadership through publications and speaking'
    ],
    processingNotes: 'Premium tier consulting background provided strong foundation for O-1A'
  },

  // Edge Cases
  {
    id: 'o1a-tech-016',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Remote Founder - No US Presence, Approved',
    timeline: '15 days premium processing',
    profile: {
      position: 'Founder & CEO',
      company: 'Remote-First SaaS',
      experienceLevel: '6 years',
      education: 'BS in Business',
      country: 'Estonia'
    },
    metrics: {
      funding: '$10M Series A'
    },
    evidence: [
      'Built $5M ARR from abroad',
      '80% of customers in US',
      'US investors (YC, Kleiner Perkins)',
      'Delaware C-Corp',
      'US employees (10 of 25 total)',
      'Planning US expansion'
    ],
    keySuccess: [
      'US economic impact proven despite no presence',
      'US customer base showed market relevance',
      'US investors validated US business interests',
      'Clear plan for US expansion'
    ],
    processingNotes: 'Approved despite no US presence by showing clear US economic ties and impact'
  },
  {
    id: 'o1a-tech-017',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Academic to Industry - RFE Success',
    timeline: '5 months with RFE',
    profile: {
      position: 'Founder & CTO (Former Professor)',
      company: 'Deep Tech Startup',
      experienceLevel: '15 years',
      education: 'PhD in Physics',
      country: 'Switzerland'
    },
    metrics: {
      publications: 40,
      citations: 1200,
      patents: 5
    },
    evidence: [
      'Tenured professor commercializing research',
      '40 publications, 1200 citations',
      '5 patents being commercialized',
      'LOIs from Fortune 500 customers',
      '$3M SBIR grant',
      'Seed funding from deep tech VCs'
    ],
    keySuccess: [
      'LOIs from customers proved business viability',
      'SBIR grant showed government support',
      'VC funding validated commercial potential'
    ],
    keyFailure: [
      'RFE requested proof of business viability',
      'Initial focus too academic'
    ],
    processingNotes: 'Academic credentials supplemented with commercial validation after RFE'
  },
  {
    id: 'o1a-tech-018',
    visaType: 'O-1A',
    field: 'tech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Acqui-hire Target - Approved',
    timeline: '10 days premium processing',
    profile: {
      position: 'CTO & Co-founder',
      company: 'AI Startup (Being Acquired)',
      experienceLevel: '7 years',
      education: 'MS in Machine Learning',
      country: 'Canada'
    },
    metrics: {
      salary: '$250,000'
    },
    evidence: [
      'Company being acquired by Microsoft',
      'Critical to $15M acquisition',
      'Retaining entire 12-person team',
      'Letter from Microsoft VP',
      'Key patents included in acquisition',
      '2-year retention package'
    ],
    keySuccess: [
      'Buyer testimony crucial to approval',
      'Acquisition price validated value',
      'Retention package showed critical role',
      'Patents central to acquisition'
    ],
    processingNotes: 'Acqui-hire scenario approved with strong support letter from acquiring company'
  },

  // COMPREHENSIVE NIW CASES - TECH APPROVED
  {
    id: 'niw-tech-008',
    visaType: 'NIW',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Cloud Security Architect - No PhD, Approved',
    timeline: '4 months',
    profile: {
      position: 'Principal Security Architect',
      company: 'Cloud Infrastructure Provider',
      experienceLevel: '8 years',
      education: "Bachelor's in Computer Science",
      country: 'India'
    },
    metrics: {
      salary: '$285,000'
    },
    evidence: [
      'Developing zero-trust architecture for critical infrastructure',
      'Letters from DHS officials',
      'Letters from banking executives',
      'Direct alignment with national cybersecurity strategy',
      'Led security for systems protecting 50M users',
      'Prevented $100M+ in potential breaches'
    ],
    keySuccess: [
      'Direct alignment with national security priorities',
      'Quantified impact on critical infrastructure',
      'Strong government and industry support letters',
      'Proved expertise despite no advanced degree'
    ],
    processingNotes: 'Approved without RFE. National security angle and government support letters were decisive.'
  },
  {
    id: 'niw-tech-009',
    visaType: 'NIW',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Robotics Engineer - Manufacturing Innovation',
    timeline: '6 months',
    profile: {
      position: 'Senior Robotics Engineer',
      company: 'Industrial Automation Company',
      experienceLevel: '12 years',
      education: "Master's in Robotics",
      country: 'India'
    },
    metrics: {
      publications: 6,
      citations: 95,
      patents: 3
    },
    evidence: [
      'Reshoring manufacturing through automation',
      'Aligned with CHIPS Act priorities',
      'Supply chain resilience focus',
      'Created 200+ US manufacturing jobs',
      'Reduced dependency on foreign suppliers by 40%'
    ],
    keySuccess: [
      'Aligned with CHIPS Act and supply chain priorities',
      'Quantified job creation',
      'Demonstrated reduced foreign dependency'
    ],
    processingNotes: 'Approved regular processing. Manufacturing reshoring angle resonated strongly with current priorities.'
  },
  {
    id: 'niw-tech-010',
    visaType: 'NIW',
    field: 'tech',
    strength: 'moderate',
    outcome: 'approved',
    title: 'Edge Computing Researcher - Rural Broadband',
    timeline: '7 months',
    profile: {
      position: 'Research Scientist',
      company: 'Telecommunications Research Lab',
      experienceLevel: '8 years',
      education: 'PhD in Computer Engineering',
      country: 'South Korea'
    },
    metrics: {
      publications: 8,
      citations: 42
    },
    evidence: [
      'Bringing high-speed internet to underserved communities',
      'Infrastructure bill alignment',
      'Rural impact documentation',
      'Letters from rural community leaders',
      'FCC interest in the technology'
    ],
    keySuccess: [
      'Infrastructure bill alignment',
      'Direct rural community impact',
      'Government interest despite low citations'
    ],
    processingNotes: 'Approved despite low citations. Rural broadband access aligned perfectly with infrastructure priorities.'
  },

  // NIW TECH DENIED
  {
    id: 'niw-tech-004',
    visaType: 'NIW',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Full Stack Developer - Too Generic',
    timeline: '5 months',
    profile: {
      position: 'Senior Full Stack Developer',
      company: 'Software Consultancy',
      experienceLevel: '10 years',
      education: "Bachelor's in Computer Science, 10 years experience",
      country: 'Brazil'
    },
    metrics: {
      salary: '$165,000'
    },
    evidence: [
      'Improving web applications',
      'General software development',
      'Client testimonials',
      'No specific national interest focus'
    ],
    denialReasons: [
      'Endeavor not of national importance',
      'Too generic and broad',
      'Many others doing similar work',
      'No unique contribution identified'
    ],
    keyFailure: [
      'Need specific, impactful focus',
      'Generic web development insufficient',
      'Failed to articulate national importance'
    ],
    processingNotes: 'Denied on Prong 1. USCIS found proposed endeavor too generic without national importance.'
  },
  {
    id: 'niw-tech-005',
    visaType: 'NIW',
    field: 'tech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Blockchain Engineer - Constantly Shifting Focus',
    timeline: '8 months',
    profile: {
      position: 'Blockchain Developer',
      company: 'Crypto Consulting Firm',
      experienceLevel: '5 years',
      education: "Master's in Computer Science",
      country: 'Ukraine'
    },
    metrics: {
      publications: 2
    },
    evidence: [
      'Changed endeavor 3 times during application',
      'First: DeFi protocols',
      'Then: NFT marketplaces',
      'Finally: Central Bank Digital Currencies',
      'Inconsistent narrative'
    ],
    denialReasons: [
      'Lack of commitment to specific endeavor',
      'Constantly shifting focus',
      'Inconsistent application',
      'No clear expertise in any single area'
    ],
    keyFailure: [
      'Must maintain consistent endeavor',
      'Shifting focus shows lack of commitment',
      'Damaged credibility with USCIS'
    ],
    processingNotes: 'Denied after RFE. Multiple endeavor changes during processing raised credibility concerns.'
  },

  // NIW BIOTECH APPROVED
  {
    id: 'niw-biotech-007',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'strong',
    outcome: 'approved',
    title: "Alzheimer's Researcher - 12 Citations Approved",
    timeline: '8 months',
    profile: {
      position: 'Postdoctoral Researcher',
      company: 'University Medical Center',
      experienceLevel: '2 years',
      education: 'PhD in Neuroscience',
      country: 'Germany'
    },
    metrics: {
      publications: 5,
      citations: 12
    },
    evidence: [
      "Novel biomarkers for early Alzheimer's detection",
      'Addressing national health crisis',
      "Letters from Alzheimer's Association",
      'NIH interest in the research',
      'Potential to save billions in healthcare costs'
    ],
    keySuccess: [
      'Addressing major national health crisis',
      'Strong support from disease advocacy groups',
      'Quantified healthcare cost savings',
      'Approved despite very low citations'
    ],
    processingNotes: 'Approved after RFE response. National health crisis angle overcame weak publication record.'
  },
  {
    id: 'niw-biotech-008',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Agricultural Biotechnologist - Food Security',
    timeline: '6 months',
    profile: {
      position: 'Senior Research Scientist',
      company: 'Agricultural Research Institute',
      experienceLevel: '10 years',
      education: 'PhD in Plant Biology',
      country: 'India'
    },
    metrics: {
      publications: 5,
      citations: 78,
      patents: 2
    },
    evidence: [
      'Drought-resistant crop development',
      'Climate change adaptation',
      'Food security alignment',
      'USDA collaboration',
      'Potential to increase crop yields by 30%'
    ],
    keySuccess: [
      'Climate change and food security alignment',
      'Government agency collaboration',
      'Quantified agricultural impact'
    ],
    processingNotes: 'Approved regular processing. Food security and climate adaptation were compelling factors.'
  },
  {
    id: 'niw-biotech-009',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Vaccine Developer - Expedited Approval',
    timeline: '3 weeks premium',
    profile: {
      position: 'Principal Scientist',
      company: 'Vaccine Development Company',
      experienceLevel: '15 years',
      education: 'PhD in Immunology',
      country: 'UK'
    },
    metrics: {
      publications: 15,
      citations: 425,
      patents: 6
    },
    evidence: [
      'mRNA platform for emerging diseases',
      'Pandemic preparedness priority',
      'BARDA funding recipient',
      'WHO consultation experience',
      'Platform adaptable to multiple pathogens'
    ],
    keySuccess: [
      'Pandemic preparedness critical priority',
      'Government funding and support',
      'Platform technology with broad application'
    ],
    processingNotes: 'Approved via premium processing in 3 weeks. Pandemic preparedness was decisive factor.'
  },

  // NIW BIOTECH RFE THEN APPROVED
  {
    id: 'niw-biotech-004',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'moderate',
    outcome: 'rfe-then-approved',
    title: 'Marine Biologist - Environmental Focus',
    timeline: '10 months total',
    profile: {
      position: 'Senior Marine Researcher',
      company: 'Oceanographic Institute',
      experienceLevel: '12 years',
      education: 'PhD in Marine Biology',
      country: 'Australia'
    },
    metrics: {
      publications: 7,
      citations: 156
    },
    evidence: [
      'Coral reef restoration technology',
      'Carbon sequestration research',
      'Initial RFE: Economic impact unclear',
      'Added fishing industry impact data',
      'Added tourism economic analysis'
    ],
    keySuccess: [
      'Successfully addressed economic impact in RFE',
      'Quantified carbon sequestration value',
      'Showed fishing industry benefits'
    ],
    processingNotes: 'Approved 2 months after RFE response. Economic impact quantification was key to approval.'
  },

  // NIW BIOTECH DENIED
  {
    id: 'niw-biotech-005',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Generic Drug Formulation Scientist',
    timeline: '6 months',
    profile: {
      position: 'Senior Formulation Scientist',
      company: 'Generic Pharmaceutical Company',
      experienceLevel: '5 years',
      education: 'PhD in Pharmaceutical Sciences',
      country: 'India'
    },
    metrics: {
      publications: 12,
      citations: 145
    },
    evidence: [
      'Developing generic drug formulations',
      'Cost reduction focus',
      'Incremental improvements',
      'No novel approach'
    ],
    denialReasons: [
      'Work represents incremental advances',
      'No novel approach or significant improvement',
      'Many others doing similar work',
      'Insufficient national importance'
    ],
    keyFailure: [
      'Incremental work insufficient for NIW',
      'Need novel or significant advances',
      'Generic drug work too common'
    ],
    processingNotes: 'Denied despite strong publication record. Work deemed incremental rather than transformative.'
  },

  // NIW FINTECH APPROVED
  {
    id: 'niw-fintech-005',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'RegTech Compliance Architect - No Publications',
    timeline: '5 months',
    profile: {
      position: 'Chief Compliance Architect',
      company: 'RegTech Startup',
      experienceLevel: '5 years',
      education: "Master's in Computer Science, JD",
      country: 'India'
    },
    metrics: {
      transactionVolume: '$500M fraud prevented'
    },
    evidence: [
      'Built AML system for major banks',
      'Preventing financial crimes through AI',
      '$500M in prevented fraud documented',
      'Letters from Treasury officials',
      'FinCEN interest in the technology'
    ],
    keySuccess: [
      'Quantified national economic protection',
      'Government agency support',
      'Clear crime prevention impact',
      'Approved without academic publications'
    ],
    processingNotes: 'Approved without publications. Quantified fraud prevention and government support were key.'
  },
  {
    id: 'niw-fintech-006',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Pension Technology Specialist - Social Impact',
    timeline: '7 months',
    profile: {
      position: 'Senior Product Manager',
      company: 'Retirement Technology Company',
      experienceLevel: '5 years',
      education: "MBA, CFA",
      country: 'India'
    },
    metrics: {
      salary: '$225,000'
    },
    evidence: [
      'Securing retirement savings through blockchain',
      'Protecting elderly from financial fraud',
      'AARP endorsement',
      'Senate aging committee interest',
      'Prevented $50M in elder fraud'
    ],
    keySuccess: [
      'Social impact on vulnerable population',
      'Elder fraud prevention angle',
      'Bipartisan political support'
    ],
    processingNotes: 'Approved regular processing. Elder protection and social impact were compelling factors.'
  },

  // NIW FINTECH DENIED
  {
    id: 'niw-fintech-003',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Quantitative Analyst - Purely Commercial',
    timeline: '4 months',
    profile: {
      position: 'Senior Quant',
      company: 'Hedge Fund',
      experienceLevel: '5 years',
      education: 'PhD in Mathematics',
      country: 'India'
    },
    metrics: {
      salary: '$450,000',
      publications: 8,
      citations: 234
    },
    evidence: [
      'Improving trading algorithms',
      'Alpha generation strategies',
      'Published in quantitative finance journals',
      'Strong academic credentials'
    ],
    denialReasons: [
      'Benefits private investors, not national interest',
      'Purely commercial focus',
      'No broader societal benefit',
      'Wealth generation for few, not many'
    ],
    keyFailure: [
      'Hedge fund work rarely qualifies',
      'Must show broader benefit beyond profits',
      'Commercial success insufficient'
    ],
    processingNotes: 'Denied quickly despite strong credentials. Hedge fund work deemed purely commercial.'
  },
  {
    id: 'niw-fintech-004',
    visaType: 'NIW',
    field: 'fintech',
    strength: 'weak',
    outcome: 'denied',
    title: 'Payment Systems Developer - Not Differentiated',
    timeline: '6 months',
    profile: {
      position: 'Payment Systems Architect',
      company: 'Payment Processing Company',
      experienceLevel: '5 years',
      education: "Bachelor's in Computer Science",
      country: 'India'
    },
    metrics: {
      transactionVolume: '$1B processed annually'
    },
    evidence: [
      'Faster payment processing',
      'Reduced transaction costs',
      'Industry standard implementations',
      'No unique innovation'
    ],
    denialReasons: [
      'Many others doing similar work',
      'Not sufficiently differentiated',
      'Standard industry practices',
      'No unique contribution'
    ],
    keyFailure: [
      'Must show unique contribution',
      'Standard implementations insufficient',
      'Need innovation beyond industry norms'
    ],
    processingNotes: 'Denied. Work deemed standard industry practice without unique national benefit.'
  },

  // UNIQUE CROSS-SECTOR NIW CASES
  {
    id: 'niw-tech-006',
    visaType: 'NIW',
    field: 'tech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Climate Tech Data Scientist - Cross-Sector',
    timeline: '5 months',
    profile: {
      position: 'Principal Data Scientist',
      company: 'Climate Analytics Startup',
      experienceLevel: '5 years',
      education: 'PhD in Environmental Data Science',
      country: 'India'
    },
    metrics: {
      publications: 11,
      citations: 189
    },
    evidence: [
      'AI for wildfire prediction',
      'Cross-sector: Tech + Environmental',
      'CalFire implementation',
      '30% improvement in prediction accuracy',
      'Estimated 100+ lives saved annually'
    ],
    keySuccess: [
      'Lives saved quantification',
      'Property protection impact',
      'Government agency adoption',
      'Cross-sector national priorities'
    ],
    processingNotes: 'Approved quickly. Life-saving technology with government adoption was compelling.'
  },
  {
    id: 'niw-biotech-006',
    visaType: 'NIW',
    field: 'biotech',
    strength: 'very-strong',
    outcome: 'approved',
    title: 'Biotech/AI Hybrid - Drug Discovery',
    timeline: '4 months',
    profile: {
      position: 'Computational Biology Director',
      company: 'AI Drug Discovery Company',
      experienceLevel: '5 years',
      education: 'PhD in Computational Biology, MS in AI',
      country: 'India'
    },
    metrics: {
      publications: 18,
      citations: 567,
      patents: 8
    },
    evidence: [
      'AI-driven rare disease drug discovery',
      'Combining biotech and AI priorities',
      'FDA breakthrough designation',
      'Patient advocacy group support',
      '3 drugs in clinical trials'
    ],
    keySuccess: [
      'Combines multiple national priorities',
      'Rare disease focus',
      'FDA recognition',
      'Clear pipeline to patient impact'
    ],
    processingNotes: 'Approved without RFE. Rare disease focus and FDA breakthrough designation were decisive.'
  },
  {
    id: 'niw-tech-007',
    visaType: 'NIW',
    field: 'tech',
    strength: 'strong',
    outcome: 'approved',
    title: 'Social Impact Technologist - Disability Access',
    timeline: '9 months',
    profile: {
      position: 'Accessibility Technology Lead',
      company: 'Assistive Technology Company',
      experienceLevel: '5 years',
      education: "Master's in Human-Computer Interaction",
      country: 'India'
    },
    metrics: {
      citations: 23
    },
    evidence: [
      'Technology for disability access',
      'ADA compliance innovations',
      'No traditional academic metrics',
      'Letters from disability advocates',
      'Congressional testimony on accessibility',
      'Technology adopted by 500+ organizations'
    ],
    keySuccess: [
      'ADA compliance and inclusion priorities',
      'Broad organizational adoption',
      'Congressional recognition',
      'Approved despite minimal citations'
    ],
    processingNotes: 'Approved after RFE. Social impact and ADA compliance overcame weak academic metrics.'
  }
];

// Helper functions
export function getCasesByVisaType(visaType: 'EB-1A' | 'O-1A' | 'NIW'): CaseStudy[] {
  return caseStudies.filter(c => c.visaType === visaType);
}

export function getCasesByField(field: 'tech' | 'biotech' | 'fintech'): CaseStudy[] {
  return caseStudies.filter(c => c.field === field);
}

export function getCasesByStrength(strength: 'very-strong' | 'strong' | 'moderate' | 'weak'): CaseStudy[] {
  return caseStudies.filter(c => c.strength === strength);
}

export function findSimilarCases(
  visaType: 'EB-1A' | 'O-1A' | 'NIW',
  field: 'tech' | 'biotech' | 'fintech',
  metrics?: Partial<CaseStudy['metrics']>
): CaseStudy[] {
  let filtered = caseStudies.filter(c => c.visaType === visaType && c.field === field);
  
  if (metrics?.citations !== undefined) {
    // Sort by citation similarity
    filtered = filtered.sort((a, b) => {
      const aDiff = Math.abs((a.metrics.citations || 0) - metrics.citations!);
      const bDiff = Math.abs((b.metrics.citations || 0) - metrics.citations!);
      return aDiff - bDiff;
    });
    // Return more cases for NIW, fewer for others
    const limit = visaType === 'NIW' ? 8 : 6;
    return filtered.slice(0, limit);
  }
  
  return filtered;
}

export function getSuccessfulCases(): CaseStudy[] {
  return caseStudies.filter(c => c.outcome === 'approved' || c.outcome === 'rfe-then-approved');
}

export function getDeniedCases(): CaseStudy[] {
  return caseStudies.filter(c => c.outcome === 'denied');
}

export function getCaseById(id: string): CaseStudy | undefined {
  return caseStudies.find(c => c.id === id);
}

export function getAverageTimeline(visaType: 'EB-1A' | 'O-1A' | 'NIW'): string {
  const cases = getCasesByVisaType(visaType);
  const timelines = cases.map(c => {
    const match = c.timeline.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }).filter(t => t > 0);
  
  if (timelines.length === 0) return 'No data';
  
  const avg = timelines.reduce((a, b) => a + b, 0) / timelines.length;
  const unit = cases[0].timeline.includes('day') ? 'days' : 'months';
  
  return `${Math.round(avg)} ${unit} average`;
}

export function getStrengthDistribution(visaType: 'EB-1A' | 'O-1A' | 'NIW'): Record<string, number> {
  const cases = getCasesByVisaType(visaType);
  return cases.reduce((acc, c) => {
    acc[c.strength] = (acc[c.strength] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}