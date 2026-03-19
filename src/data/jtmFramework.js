export const FRAMEWORK_STEPS = [
  { id: 1, title: 'Map the Skill Landscape', description: 'Analyze the region\'s unique skill concentrations, workforce strengths, gaps, and location quotients for key industries.' },
  { id: 2, title: 'Identify Jobs That Mobilize', description: 'Score occupations across four key dimensions and generate a list of potential Jobs That Mobilize occupations, then validate with local stakeholders.' },
  { id: 3, title: 'Build Skill Profiles', description: 'Map required technical competencies and work-ready skills for each JTM, grouped into functional categories with proficiency benchmarks.' },
  { id: 4, title: 'Validate with Employers', description: 'Establish a common skill language, define proficiency levels, align credentialing requirements, and create assessment frameworks.' },
  { id: 5, title: 'Map Career Pathways', description: 'Identify skill-based transition opportunities, define feeder roles, and chart paths to higher-paying target occupations.' },
  { id: 6, title: 'Design Training Solutions', description: 'Develop targeted upskilling programs, locate untapped talent pools, create skill-based credentials, and build education partnerships.' },
]

export const PILLARS = [
  {
    id: 'employers',
    title: 'Employers',
    color: '#1B2A4A',
    icon: 'Building2',
    description: 'Measures how well a role addresses employer talent needs and business sustainability.',
    indicators: [
      { name: 'Employment Growth (2022-32)', description: 'Projected job growth over 10 years' },
      { name: 'Share of Entrants', description: 'Rate of new workers entering the occupation' },
      { name: 'Share of Workers 55+', description: 'Retirement risk from aging workforce' },
      { name: 'Voluntary Quits Rate', description: 'Worker satisfaction and retention signal' },
      { name: 'Wage Growth', description: 'Trend in compensation competitiveness' },
      { name: 'AI Exposure', description: 'Resilience to automation and AI displacement' },
    ],
  },
  {
    id: 'workers',
    title: 'Workers',
    color: '#E0732B',
    icon: 'Users',
    description: 'Measures how well a role delivers economic mobility and career advancement for workers.',
    indicators: [
      { name: 'Median Annual Wage', description: 'Current compensation level' },
      { name: 'Transition to Higher Pay', description: 'Probability of moving to a better-paying role' },
      { name: 'Promotion Rate', description: 'Rate of internal career advancement' },
      { name: 'Transition to Unemployment', description: 'Job security and stability (lower is better)' },
      { name: 'Typical Years of Schooling', description: 'Educational accessibility (fewer years = more accessible)' },
      { name: 'AI Exposure', description: 'Long-term viability in an AI-transformed economy' },
    ],
  },
  {
    id: 'equity',
    title: 'Equity',
    color: '#2D6A4F',
    icon: 'Scale',
    description: 'Measures how equitably a role distributes opportunity across demographic groups.',
    indicators: [
      { name: 'Wage Parity by Race', description: 'Pay equity across racial groups' },
      { name: 'Integration Index', description: 'Workforce diversity relative to population' },
      { name: 'Wage Parity by Gender', description: 'Pay equity between men and women' },
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy',
    color: '#7C3AED',
    icon: 'Target',
    description: 'Measures how strategically valuable a role is for long-term regional economic development.',
    indicators: [
      { name: 'Skill Set Centrality', description: 'How broadly applicable the role\'s skills are across occupations' },
      { name: 'Industry Dispersion', description: 'Whether skills transfer across multiple industries' },
      { name: 'Geographic Dispersion', description: 'Whether the role exists broadly or is concentrated in one area' },
    ],
  },
]

export const SAMPLE_OCCUPATIONS = [
  {
    title: 'HVAC Technician',
    soc: '49-9021',
    scores: { employers: 82, workers: 75, equity: 68, strategy: 71 },
    composite: 74,
    highlights: ['11.6% projected growth', '$52,600 median wage', 'No degree required', 'Skills transfer to 6+ industries'],
  },
  {
    title: 'Logistician',
    soc: '13-1081',
    scores: { employers: 78, workers: 85, equity: 72, strategy: 88 },
    composite: 81,
    highlights: ['Strong promotion pathway', '$79,400 median wage', 'Cusp of degree requirement', 'High skill centrality'],
  },
  {
    title: 'Medical Equipment Repairer',
    soc: '49-9062',
    scores: { employers: 88, workers: 72, equity: 65, strategy: 60 },
    composite: 71,
    highlights: ['14.7% projected growth', 'Low automation risk', '$56,200 median wage', 'Aging workforce creates openings'],
  },
  {
    title: 'Transportation Inspector',
    soc: '53-6051',
    scores: { employers: 91, workers: 86, equity: 74, strategy: 65 },
    composite: 79,
    highlights: ['95th percentile for employers', '95th percentile for workers', 'Very low unemployment transition', 'Strong wage premium'],
  },
  {
    title: 'Crane & Tower Operator',
    soc: '53-7021',
    scores: { employers: 76, workers: 80, equity: 70, strategy: 58 },
    composite: 71,
    highlights: ['Robust career path for all workers', 'Gateway to management', '$65,200 median wage', 'High employer demand'],
  },
]
