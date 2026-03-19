// Skills Pathways — sourced from Phoenix Mobility Monitor (phoenix.ourtalentmobility.org)
// Feeder roles, target roles, and salary increase figures are BGI/Lightcast data for Phoenix MSA.
// Skill bridges are derived from O*NET occupational skill profiles.

export const PATHWAYS = [
  {
    id: 'nursing-assistant-to-nurse-midwife',
    pmmIndustry: 'Health Care and Social Assistance',
    feeder: {
      title: 'Nursing Assistant',
      medianWage: 35800,
      skills: [
        'Patient care', 'Vital signs monitoring', 'Clinical documentation',
        'Infection control', 'Patient communication', 'Team coordination', 'Safety protocols',
      ],
    },
    target: {
      title: 'Nurse Midwife',
      medianWage: 93990,
      isJTM: true,
      mobilityIndex: 97,
      talentShortageIndex: 95,
      skills: [
        'Patient care', 'Vital signs monitoring', 'Clinical documentation',
        'Infection control', 'Patient communication', 'Safety protocols',
        'Prenatal & labor care', 'Clinical assessment', 'Pharmacology basics',
        'Medical procedures', 'RN licensure', 'Graduate clinical training',
      ],
    },
    sharedSkills: [
      'Patient care', 'Vital signs monitoring', 'Clinical documentation',
      'Infection control', 'Patient communication', 'Safety protocols',
    ],
    gapSkills: [
      'Prenatal & labor care', 'Clinical assessment', 'Pharmacology basics',
      'Medical procedures', 'RN licensure', 'Graduate clinical training',
    ],
    wageGain: 58190,
    trainingWeeks: 156,
    trainingNotes: 'Path runs through RN (2-yr ADN or BSN) then a graduate-level nurse-midwifery program. Many Phoenix CNAs accelerate via Maricopa CC bridge programs.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work', 'arizona-des'],
  },
  {
    id: 'pharmacy-tech-to-pharmacist',
    pmmIndustry: 'Retail Trade',
    feeder: {
      title: 'Pharmacy Technician',
      medianWage: 38320,
      skills: [
        'Medication dispensing', 'Prescription processing', 'Pharmaceutical inventory',
        'Patient interaction', 'Insurance verification', 'Safety & accuracy', 'HIPAA compliance',
      ],
    },
    target: {
      title: 'Pharmacist',
      medianWage: 116990,
      isJTM: true,
      mobilityIndex: 94,
      talentShortageIndex: 73,
      skills: [
        'Medication dispensing', 'Prescription processing', 'Pharmaceutical inventory',
        'Patient interaction', 'Safety & accuracy', 'HIPAA compliance',
        'Pharmacology', 'Drug interactions', 'Clinical counseling',
        'PharmD degree', 'NAPLEX licensure', 'Patient care management',
      ],
    },
    sharedSkills: [
      'Medication dispensing', 'Prescription processing', 'Pharmaceutical inventory',
      'Patient interaction', 'Safety & accuracy', 'HIPAA compliance',
    ],
    gapSkills: [
      'Pharmacology', 'Drug interactions', 'Clinical counseling',
      'PharmD degree', 'NAPLEX licensure', 'Patient care management',
    ],
    wageGain: 78670,
    trainingWeeks: 208,
    trainingNotes: 'Pharmacy technician certification → pre-pharmacy prerequisites → PharmD (4 years). Midland University and other accredited programs accept Phoenix-area applicants.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work'],
  },
  {
    id: 'teller-to-financial-advisor',
    pmmIndustry: 'Finance and Insurance',
    feeder: {
      title: 'Bank Teller',
      medianWage: 37930,
      skills: [
        'Financial transactions', 'Customer service', 'Regulatory compliance',
        'Cash handling', 'Attention to detail', 'Client communication', 'Banking products',
      ],
    },
    target: {
      title: 'Personal Financial Advisor',
      medianWage: 63000,
      isJTM: true,
      mobilityIndex: 97,
      talentShortageIndex: 48,
      skills: [
        'Financial transactions', 'Customer service', 'Regulatory compliance',
        'Client communication', 'Banking products', 'Attention to detail',
        'Investment planning', 'Portfolio management', 'Risk analysis',
        'Securities licensing (Series 65/66)', 'Retirement planning', 'Tax basics',
      ],
    },
    sharedSkills: [
      'Financial transactions', 'Customer service', 'Regulatory compliance',
      'Client communication', 'Banking products', 'Attention to detail',
    ],
    gapSkills: [
      'Investment planning', 'Portfolio management', 'Risk analysis',
      'Securities licensing (Series 65/66)', 'Retirement planning', 'Tax basics',
    ],
    wageGain: 25070,
    trainingWeeks: 26,
    trainingNotes: 'CFP coursework or Series 65 exam prep (6–12 months). Many Phoenix banks sponsor internal advisor development programs for tellers.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work'],
  },
  {
    id: 'emt-to-fire-supervisor',
    pmmIndustry: 'Public Administration',
    feeder: {
      title: 'Emergency Medical Technician',
      medianWage: 40600,
      skills: [
        'Emergency response', 'Patient assessment', 'Safety protocols',
        'Team coordination', 'Crisis communication', 'Physical fitness', 'Incident reporting',
      ],
    },
    target: {
      title: 'Fire Supervisor',
      medianWage: 64680,
      isJTM: true,
      mobilityIndex: 98,
      talentShortageIndex: 90,
      skills: [
        'Emergency response', 'Safety protocols', 'Team coordination',
        'Crisis communication', 'Physical fitness', 'Incident reporting',
        'Fire suppression', 'Hazmat operations', 'Supervisory leadership',
        'NFPA standards', 'Fire science certification', 'Budget management',
      ],
    },
    sharedSkills: [
      'Emergency response', 'Safety protocols', 'Team coordination',
      'Crisis communication', 'Physical fitness', 'Incident reporting',
    ],
    gapSkills: [
      'Fire suppression', 'Hazmat operations', 'Supervisory leadership',
      'NFPA standards', 'Fire science certification', 'Budget management',
    ],
    wageGain: 24080,
    trainingWeeks: 52,
    trainingNotes: 'Fire science certificate or associate degree at Mesa or GateWay Community College. Phoenix Fire Dept. and surrounding cities actively recruit EMTs.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work', 'arizona-des'],
  },
  {
    id: 'admin-to-construction-manager',
    pmmIndustry: 'Construction',
    feeder: {
      title: 'Administrative Assistant',
      medianWage: 43040,
      skills: [
        'Scheduling', 'Communication', 'Documentation', 'Vendor coordination',
        'Budget tracking', 'Microsoft Office', 'Project coordination',
      ],
    },
    target: {
      title: 'Construction Manager',
      medianWage: 87400,
      isJTM: true,
      mobilityIndex: 91,
      talentShortageIndex: 51,
      skills: [
        'Scheduling', 'Communication', 'Documentation', 'Vendor coordination',
        'Budget tracking', 'Project coordination',
        'Construction methods', 'Blueprint reading', 'Site safety (OSHA)',
        'Project management software', 'Subcontractor management', 'Cost estimating',
      ],
    },
    sharedSkills: [
      'Scheduling', 'Communication', 'Documentation', 'Vendor coordination',
      'Budget tracking', 'Project coordination',
    ],
    gapSkills: [
      'Construction methods', 'Blueprint reading', 'Site safety (OSHA)',
      'Project management software', 'Subcontractor management', 'Cost estimating',
    ],
    wageGain: 44360,
    trainingWeeks: 52,
    trainingNotes: 'Construction management certificate or associate degree at Maricopa CC. OSHA-10/30 certification is a common first step. Phoenix construction boom creating strong demand.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work'],
  },
  {
    id: 'customer-service-to-sales-engineer',
    pmmIndustry: 'Wholesale Trade',
    feeder: {
      title: 'Customer Service Representative',
      medianWage: 37450,
      skills: [
        'Client communication', 'Problem solving', 'Product knowledge',
        'CRM systems', 'Active listening', 'Conflict resolution', 'Documentation',
      ],
    },
    target: {
      title: 'Sales Engineer',
      medianWage: 77000,
      isJTM: true,
      mobilityIndex: 97,
      talentShortageIndex: 58,
      skills: [
        'Client communication', 'Problem solving', 'Product knowledge',
        'CRM systems', 'Active listening', 'Documentation',
        'Technical product knowledge', 'Solution selling', 'Proposal writing',
        'Industry certifications', 'Demonstrations & training', 'Contract negotiation',
      ],
    },
    sharedSkills: [
      'Client communication', 'Problem solving', 'Product knowledge',
      'CRM systems', 'Active listening', 'Documentation',
    ],
    gapSkills: [
      'Technical product knowledge', 'Solution selling', 'Proposal writing',
      'Industry certifications', 'Demonstrations & training', 'Contract negotiation',
    ],
    wageGain: 40550,
    trainingWeeks: 20,
    trainingNotes: 'Technical sales training programs, vendor certifications (e.g., Salesforce, AWS), and product-specific training. Many employers provide on-the-job paths from inside sales.',
    trainingPartners: ['maricopa-cc', 'arizona-at-work'],
  },
]
