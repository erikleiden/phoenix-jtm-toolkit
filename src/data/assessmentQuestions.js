export const ASSESSMENT = {
  employer: [
    {
      id: 'eq1',
      question: 'How do your current job postings describe requirements?',
      options: [
        { label: 'Primarily degree requirements', value: 'degree-focused', weights: { 'ts-5': 3, 'vs-3': 2 } },
        { label: 'Mix of degrees and skills', value: 'mixed', weights: { 'ts-5': 2, 'jp-3': 1 } },
        { label: 'Skills-first language', value: 'skills-first', weights: { 'jp-3': 2, 'jp-1': 1 } },
      ],
    },
    {
      id: 'eq2',
      question: 'How familiar are you with digital skills records and verifiable credentials?',
      options: [
        { label: 'Not at all', value: 'unfamiliar', weights: { 'vs-3': 3, 'vs-1': 2 } },
        { label: 'Somewhat aware', value: 'somewhat', weights: { 'vs-3': 2 } },
        { label: 'Already using them', value: 'using', weights: { 'jp-3': 2, 'jp-2': 1 } },
      ],
    },
    {
      id: 'eq3',
      question: 'What is your biggest hiring challenge right now?',
      options: [
        { label: 'Not enough qualified applicants', value: 'volume', weights: { 'ts-2': 3, 'ts-6': 2, 'ts-1': 1 } },
        { label: 'Can\'t verify candidates\' skills', value: 'verification', weights: { 'vs-3': 3, 'jp-3': 2 } },
        { label: 'High turnover in key roles', value: 'retention', weights: { 'jp-2': 2, 'ts-1': 2 } },
        { label: 'Credential requirements exclude good candidates', value: 'credentials', weights: { 'ts-5': 3, 'jp-3': 2 } },
      ],
    },
    {
      id: 'eq4',
      question: 'Do you currently partner with workforce development organizations?',
      options: [
        { label: 'No partnerships currently', value: 'none', weights: { 'ts-2': 3, 'jp-1': 2 } },
        { label: 'Some, but not JTM-focused', value: 'some', weights: { 'jp-1': 2, 'jp-2': 1 } },
        { label: 'Yes, actively engaged', value: 'active', weights: { 'jp-3': 2, 'ts-5': 1 } },
      ],
    },
    {
      id: 'eq5',
      question: 'How open is your organization to hiring candidates from non-traditional backgrounds?',
      options: [
        { label: 'Still working on it', value: 'early', weights: { 'ts-5': 3, 'ts-6': 2, 'vs-3': 1 } },
        { label: 'Open but need a process', value: 'open', weights: { 'jp-3': 2, 'vs-3': 2 } },
        { label: 'Already doing this', value: 'doing', weights: { 'jp-2': 2, 'jp-6': 1 } },
      ],
    },
  ],
  navigator: [
    {
      id: 'nq1',
      question: 'How do you currently identify workers who might be good JTM candidates?',
      options: [
        { label: 'We wait for them to come to us', value: 'passive', weights: { 'ts-1': 3, 'ts-2': 2 } },
        { label: 'Some targeted outreach', value: 'some', weights: { 'ts-3': 2, 'ts-4': 1 } },
        { label: 'Systematic skills-based identification', value: 'systematic', weights: { 'jp-3': 2, 'jp-5': 2 } },
      ],
    },
    {
      id: 'nq2',
      question: 'Do you have relationships with employers hiring for JTM roles?',
      options: [
        { label: 'Not yet', value: 'none', weights: { 'jp-1': 3, 'jp-2': 2 } },
        { label: 'A few, informally', value: 'few', weights: { 'jp-2': 2, 'jp-3': 2 } },
        { label: 'Strong employer partnerships', value: 'strong', weights: { 'jp-5': 2, 'jp-6': 2 } },
      ],
    },
    {
      id: 'nq3',
      question: 'How do you prepare candidates for interviews?',
      options: [
        { label: 'Basic resume help', value: 'basic', weights: { 'jp-5': 3, 'jp-3': 2 } },
        { label: 'Resume + interview coaching', value: 'moderate', weights: { 'jp-5': 2, 'vs-2': 2 } },
        { label: 'Skills-mapped preparation', value: 'advanced', weights: { 'jp-6': 2, 'vs-2': 1 } },
      ],
    },
    {
      id: 'nq4',
      question: 'Are you currently using digital skills records with clients?',
      options: [
        { label: 'No', value: 'no', weights: { 'vs-1': 3, 'vs-2': 2 } },
        { label: 'Exploring options', value: 'exploring', weights: { 'vs-1': 2, 'vs-2': 2 } },
        { label: 'Yes, actively', value: 'yes', weights: { 'vs-3': 2, 'jp-3': 1 } },
      ],
    },
    {
      id: 'nq5',
      question: 'How connected are you to education stop-out databases?',
      options: [
        { label: 'Not at all', value: 'not', weights: { 'ts-3': 3, 'ts-4': 1 } },
        { label: 'Aware but not using', value: 'aware', weights: { 'ts-3': 2, 'ts-2': 1 } },
        { label: 'Actively using this data', value: 'active', weights: { 'ts-1': 2, 'ts-6': 1 } },
      ],
    },
  ],
  training: [
    {
      id: 'tq1',
      question: 'How does your program handle students with prior relevant experience?',
      options: [
        { label: 'Everyone starts at the beginning', value: 'rigid', weights: { 'sd-2': 3, 'sd-3': 2 } },
        { label: 'Some credit for prior learning', value: 'some-cpl', weights: { 'sd-3': 2, 'sd-4': 2 } },
        { label: 'Robust CPL and skills assessment', value: 'robust', weights: { 'sd-4': 2, 'vs-4': 2 } },
      ],
    },
    {
      id: 'tq2',
      question: 'Is your program content organized in modules that can be taken independently?',
      options: [
        { label: 'No, it\'s a fixed sequence', value: 'fixed', weights: { 'sd-4': 3, 'sd-1': 2 } },
        { label: 'Partially modular', value: 'partial', weights: { 'sd-4': 2, 'sd-3': 1 } },
        { label: 'Fully modular', value: 'modular', weights: { 'sd-2': 2, 'vs-4': 1 } },
      ],
    },
    {
      id: 'tq3',
      question: 'How flexible is your program scheduling?',
      options: [
        { label: 'Fixed semester schedule only', value: 'fixed', weights: { 'sd-1': 3, 'sd-4': 1 } },
        { label: 'Some evening/weekend options', value: 'some', weights: { 'sd-1': 2, 'sd-4': 1 } },
        { label: 'Fully flexible / self-paced', value: 'flexible', weights: { 'sd-2': 2, 'sd-3': 1 } },
      ],
    },
    {
      id: 'tq4',
      question: 'Do you currently use or accept digital skills records?',
      options: [
        { label: 'No', value: 'no', weights: { 'vs-1': 3, 'vs-4': 2 } },
        { label: 'Planning to', value: 'planning', weights: { 'vs-4': 2, 'vs-1': 1 } },
        { label: 'Yes', value: 'yes', weights: { 'sd-2': 2, 'sd-3': 1 } },
      ],
    },
    {
      id: 'tq5',
      question: 'How aligned is your curriculum to JTM skill requirements?',
      options: [
        { label: 'Haven\'t mapped it yet', value: 'not-mapped', weights: { 'sd-4': 3, 'sd-3': 2 } },
        { label: 'Somewhat aligned', value: 'somewhat', weights: { 'sd-3': 2, 'sd-2': 1 } },
        { label: 'Directly mapped', value: 'mapped', weights: { 'vs-4': 2, 'sd-1': 1 } },
      ],
    },
  ],
  worker: [
    {
      id: 'wq1',
      question: 'How would you describe your current career situation?',
      options: [
        { label: 'Feeling stuck in my current role', value: 'stuck', weights: { 'vs-2': 3, 'jp-5': 2 } },
        { label: 'Actively looking for something better', value: 'looking', weights: { 'jp-5': 3, 'vs-2': 1 } },
        { label: 'Interested but not sure where to start', value: 'exploring', weights: { 'vs-2': 2, 'vs-1': 2 } },
      ],
    },
    {
      id: 'wq2',
      question: 'Do you have a record of your skills, certifications, and training?',
      options: [
        { label: 'No, just a resume', value: 'resume-only', weights: { 'vs-2': 3, 'vs-1': 2 } },
        { label: 'Some documentation', value: 'some', weights: { 'vs-2': 2, 'jp-5': 1 } },
        { label: 'Comprehensive skills portfolio', value: 'portfolio', weights: { 'jp-5': 3, 'jp-3': 1 } },
      ],
    },
    {
      id: 'wq3',
      question: 'Have you started any education or training programs you didn\'t complete?',
      options: [
        { label: 'Yes', value: 'yes', weights: { 'vs-2': 2, 'vs-1': 2 } },
        { label: 'No', value: 'no', weights: { 'jp-5': 2 } },
      ],
    },
    {
      id: 'wq4',
      question: 'How confident are you in describing your skills to a potential employer?',
      options: [
        { label: 'Not very confident', value: 'low', weights: { 'jp-5': 3, 'vs-2': 2 } },
        { label: 'Somewhat confident', value: 'medium', weights: { 'jp-5': 2, 'jp-3': 1 } },
        { label: 'Very confident', value: 'high', weights: { 'jp-3': 2 } },
      ],
    },
    {
      id: 'wq5',
      question: 'What would help you most right now?',
      options: [
        { label: 'Understanding what jobs my skills qualify me for', value: 'discovery', weights: { 'vs-2': 3, 'vs-1': 1 } },
        { label: 'Getting my skills verified and documented', value: 'verification', weights: { 'vs-1': 3, 'vs-2': 2 } },
        { label: 'Connecting with employers who hire for skills', value: 'connection', weights: { 'jp-5': 3, 'jp-3': 1 } },
        { label: 'Filling a specific skills gap through training', value: 'training', weights: { 'vs-2': 2, 'jp-5': 1 } },
      ],
    },
  ],
}
