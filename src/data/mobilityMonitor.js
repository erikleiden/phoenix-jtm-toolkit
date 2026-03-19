// Phoenix Mobility Monitor — scraped from phoenix.ourtalentmobility.org
// Source: Burning Glass Institute / Lightcast, Phoenix MSA
// Each industry entry includes the top 3 high-mobility roles (by Mobility Index),
// the primary target role, and feeder roles with estimated salary increase.

export const PMM_INDUSTRIES = [
  {
    industry: "Accommodation and Food Services",
    roles: [
      { name: "Lodging Managers", mobilityIndex: 98, talentShortageIndex: 70 },
      { name: "Maids and Housekeeping Cleaners", mobilityIndex: 88, talentShortageIndex: 89 },
      { name: "Concierges", mobilityIndex: 77, talentShortageIndex: 78 },
    ],
    targetRole: "Lodging Managers",
    feederRoles: [
      { name: "Hotel, Motel, and Resort Desk Clerks", salaryIncrease: 12610 },
      { name: "Concierges", salaryIncrease: 4340 },
      { name: "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop", salaryIncrease: 14200 },
      { name: "Baggage Porters and Bellhops", salaryIncrease: 9260 },
      { name: "Maids and Housekeeping Cleaners", salaryIncrease: 11530 },
      { name: "Receptionists and Information Clerks", salaryIncrease: 5970 },
      { name: "Dining Room and Cafeteria Attendants and Bartender Helpers", salaryIncrease: 13160 },
      { name: "Bartenders", salaryIncrease: 7500 },
    ],
  },
  {
    industry: "Administrative and Support and Waste Management and Remediation Services",
    roles: [
      { name: "First-Line Supervisors of Security Workers", mobilityIndex: 85, talentShortageIndex: 96 },
      { name: "Landscape Architects", mobilityIndex: 52, talentShortageIndex: 96 },
      { name: "Travel Agents", mobilityIndex: 44, talentShortageIndex: 94 },
    ],
    targetRole: "First-Line Supervisors of Security Workers",
    feederRoles: [
      { name: "Lifeguards, Ski Patrol, and Other Recreational Protective Service Workers", salaryIncrease: 8320 },
      { name: "Ushers, Lobby Attendants, and Ticket Takers", salaryIncrease: 10420 },
      { name: "Receptionists and Information Clerks", salaryIncrease: 2000 },
      { name: "Concierges", salaryIncrease: 370 },
      { name: "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop", salaryIncrease: 10230 },
      { name: "Retail Salespersons", salaryIncrease: 8220 },
      { name: "Stockers and Order Fillers", salaryIncrease: 2930 },
      { name: "Cashiers", salaryIncrease: 10660 },
    ],
  },
  {
    industry: "Arts, Entertainment, and Recreation",
    roles: [
      { name: "Facilities Managers", mobilityIndex: 69, talentShortageIndex: 68 },
      { name: "Concierges", mobilityIndex: 60, talentShortageIndex: 78 },
      { name: "First-Line Supervisors of Landscaping, Lawn Service, and Groundskeeping Workers", mobilityIndex: 48, talentShortageIndex: 85 },
    ],
    targetRole: "Facilities Managers",
    feederRoles: [
      { name: "Maintenance and Repair Workers, General", salaryIncrease: 18440 },
      { name: "Security Guards", salaryIncrease: 33490 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 24500 },
      { name: "First-Line Supervisors of Retail Sales Workers", salaryIncrease: 19640 },
      { name: "Customer Service Representatives", salaryIncrease: 30010 },
      { name: "Computer User Support Specialists", salaryIncrease: 3140 },
      { name: "Retail Salespersons", salaryIncrease: 42300 },
    ],
  },
  {
    industry: "Construction",
    roles: [
      { name: "Managers, All Other", mobilityIndex: 91, talentShortageIndex: 51 },
      { name: "Crane and Tower Operators", mobilityIndex: 79, talentShortageIndex: 96 },
      { name: "Construction and Building Inspectors", mobilityIndex: 51, talentShortageIndex: 96 },
    ],
    targetRole: "Managers, All Other",
    feederRoles: [
      { name: "Personal Service Managers, All Other", salaryIncrease: 17120 },
      { name: "Food Service Managers", salaryIncrease: 17710 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 44360 },
      { name: "First-Line Supervisors of Retail Sales Workers", salaryIncrease: 39500 },
      { name: "Human Resources Specialists", salaryIncrease: 2740 },
      { name: "Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel", salaryIncrease: 1230 },
      { name: "Social Science Research Assistants", salaryIncrease: 26950 },
      { name: "Retail Salespersons", salaryIncrease: 62160 },
    ],
  },
  {
    industry: "Educational Services",
    roles: [
      { name: "Atmospheric, Earth, Marine, and Space Sciences Teachers, Postsecondary", mobilityIndex: 98, talentShortageIndex: 77 },
      { name: "Special Education Teachers, Middle School", mobilityIndex: 94, talentShortageIndex: 79 },
      { name: "Career/Technical Education Teachers, Postsecondary", mobilityIndex: 91, talentShortageIndex: 86 },
    ],
    targetRole: "Atmospheric, Earth, Marine, and Space Sciences Teachers, Postsecondary",
    feederRoles: [],
  },
  {
    industry: "Finance and Insurance",
    roles: [
      { name: "Personal Financial Advisors", mobilityIndex: 97, talentShortageIndex: 48 },
      { name: "Computer Programmers", mobilityIndex: 91, talentShortageIndex: 66 },
      { name: "Credit Analysts", mobilityIndex: 72, talentShortageIndex: 71 },
    ],
    targetRole: "Personal Financial Advisors",
    feederRoles: [
      { name: "Residential Advisors", salaryIncrease: 23030 },
      { name: "Tellers", salaryIncrease: 25070 },
      { name: "New Accounts Clerks", salaryIncrease: 19110 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 14970 },
      { name: "Coaches and Scouts", salaryIncrease: 8690 },
      { name: "Retail Salespersons", salaryIncrease: 32770 },
      { name: "Customer Service Representatives", salaryIncrease: 20480 },
    ],
  },
  {
    industry: "Health Care and Social Assistance",
    roles: [
      { name: "Nurse Midwives", mobilityIndex: 97, talentShortageIndex: 95 },
      { name: "Medical Dosimetrists", mobilityIndex: 86, talentShortageIndex: 94 },
      { name: "Nurse Practitioners", mobilityIndex: 84, talentShortageIndex: 95 },
    ],
    targetRole: "Nurse Midwives",
    feederRoles: [
      { name: "Nursing Assistants", salaryIncrease: 58190 },
      { name: "Community Health Workers", salaryIncrease: 41110 },
      { name: "Licensed Practical and Licensed Vocational Nurses", salaryIncrease: 31100 },
      { name: "Medical Assistants", salaryIncrease: 56100 },
      { name: "Healthcare Support Workers, All Other", salaryIncrease: 46610 },
      { name: "Childcare Workers", salaryIncrease: 67300 },
      { name: "Healthcare Practitioners and Technical Workers, All Other", salaryIncrease: 13260 },
    ],
  },
  {
    industry: "Information",
    roles: [
      { name: "Sales Engineers", mobilityIndex: 95, talentShortageIndex: 58 },
      { name: "Computer Hardware Engineers", mobilityIndex: 93, talentShortageIndex: 72 },
      { name: "Engineers, All Other", mobilityIndex: 91, talentShortageIndex: 58 },
    ],
    targetRole: "Sales Engineers",
    feederRoles: [
      { name: "Real Estate Sales Agents", salaryIncrease: 5250 },
      { name: "Retail Salespersons", salaryIncrease: 52840 },
      { name: "Customer Service Representatives", salaryIncrease: 40550 },
      { name: "Mechanical Engineering Technologists and Technicians", salaryIncrease: 7710 },
      { name: "Computer User Support Specialists", salaryIncrease: 13680 },
    ],
  },
  {
    industry: "Management of Companies and Enterprises",
    roles: [
      { name: "Marketing Managers", mobilityIndex: null, talentShortageIndex: 6 },
    ],
    targetRole: "Marketing Managers",
    feederRoles: [
      { name: "Market Research Analysts and Marketing Specialists", salaryIncrease: 6340 },
      { name: "Social and Community Service Managers", salaryIncrease: 10610 },
      { name: "Advertising Sales Agents", salaryIncrease: 19780 },
      { name: "Public Relations Specialists", salaryIncrease: 15270 },
      { name: "Personal Service Managers, All Other", salaryIncrease: 28320 },
      { name: "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products", salaryIncrease: 13640 },
      { name: "Graphic Designers", salaryIncrease: 32210 },
      { name: "Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel", salaryIncrease: 12430 },
    ],
  },
  {
    industry: "Manufacturing",
    roles: [
      { name: "Industrial Engineers", mobilityIndex: 94, talentShortageIndex: 65 },
      { name: "Electrical Engineers", mobilityIndex: 93, talentShortageIndex: 69 },
      { name: "Aerospace Engineers", mobilityIndex: 84, talentShortageIndex: 79 },
    ],
    targetRole: "Industrial Engineers",
    feederRoles: [
      { name: "Industrial Engineering Technologists and Technicians", salaryIncrease: 2870 },
      { name: "Civil Engineering Technologists and Technicians", salaryIncrease: 2360 },
      { name: "Retail Salespersons", salaryIncrease: 44060 },
      { name: "Social Science Research Assistants", salaryIncrease: 8850 },
      { name: "Teaching Assistants, Postsecondary", salaryIncrease: 21500 },
    ],
  },
  {
    industry: "Mining, Quarrying, and Oil and Gas Extraction",
    roles: [
      { name: "Mining and Geological Engineers, Including Mining Safety Engineers", mobilityIndex: 94, talentShortageIndex: 49 },
      { name: "Engineers, All Other", mobilityIndex: 81, talentShortageIndex: 58 },
      { name: "Occupational Health and Safety Specialists", mobilityIndex: 56, talentShortageIndex: 44 },
    ],
    targetRole: "Mining and Geological Engineers, Including Mining Safety Engineers",
    feederRoles: [
      { name: "Geological Technicians, Except Hydrologic Technicians", salaryIncrease: 16570 },
      { name: "Continuous Mining Machine Operators", salaryIncrease: 4190 },
      { name: "Excavating and Loading Machine and Dragline Operators, Surface Mining", salaryIncrease: 17410 },
      { name: "Explosives Workers, Ordnance Handling Experts, and Blasters", salaryIncrease: 990 },
      { name: "Civil Engineering Technologists and Technicians", salaryIncrease: 1490 },
      { name: "Industrial Engineering Technologists and Technicians", salaryIncrease: 2000 },
      { name: "Social Science Research Assistants", salaryIncrease: 7980 },
    ],
  },
  {
    industry: "Other Services (except Public Administration)",
    roles: [
      { name: "Social and Community Service Managers", mobilityIndex: 80, talentShortageIndex: 60 },
      { name: "Animal Trainers", mobilityIndex: 65, talentShortageIndex: 68 },
      { name: "Clergy", mobilityIndex: 38, talentShortageIndex: 93 },
    ],
    targetRole: "Social and Community Service Managers",
    feederRoles: [
      { name: "Social and Human Service Assistants", salaryIncrease: 9380 },
      { name: "Recreation Workers", salaryIncrease: 21300 },
      { name: "Customer Service Representatives", salaryIncrease: 12280 },
      { name: "First-Line Supervisors of Retail Sales Workers", salaryIncrease: 1910 },
      { name: "Residential Advisors", salaryIncrease: 14830 },
      { name: "Coaches and Scouts", salaryIncrease: 490 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 6770 },
      { name: "Retail Salespersons", salaryIncrease: 24570 },
    ],
  },
  {
    industry: "Professional, Scientific, and Technical Services",
    roles: [
      { name: "Arbitrators, Mediators, and Conciliators", mobilityIndex: 88, talentShortageIndex: 89 },
      { name: "Lawyers", mobilityIndex: 84, talentShortageIndex: 90 },
      { name: "Architects, Except Landscape and Naval", mobilityIndex: 76, talentShortageIndex: 88 },
    ],
    targetRole: "Arbitrators, Mediators, and Conciliators",
    feederRoles: [
      { name: "Residential Advisors", salaryIncrease: 12440 },
      { name: "Rehabilitation Counselors", salaryIncrease: 990 },
      { name: "Customer Service Representatives", salaryIncrease: 9890 },
      { name: "Receptionists and Information Clerks", salaryIncrease: 15960 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 4380 },
      { name: "Social and Human Service Assistants", salaryIncrease: 6990 },
      { name: "Retail Salespersons", salaryIncrease: 22180 },
    ],
  },
  {
    industry: "Public Administration",
    roles: [
      { name: "First-Line Supervisors of Firefighting and Prevention Workers", mobilityIndex: 98, talentShortageIndex: 90 },
      { name: "Construction and Building Inspectors", mobilityIndex: 93, talentShortageIndex: 96 },
      { name: "Tax Examiners and Collectors, and Revenue Agents", mobilityIndex: 81, talentShortageIndex: 91 },
    ],
    targetRole: "First-Line Supervisors of Firefighting and Prevention Workers",
    feederRoles: [
      { name: "First-Line Supervisors of Retail Sales Workers", salaryIncrease: 11730 },
      { name: "Lifeguards, Ski Patrol, and Other Recreational Protective Service Workers", salaryIncrease: 34490 },
      { name: "Paramedics", salaryIncrease: 3820 },
      { name: "Public Safety Telecommunicators", salaryIncrease: 9400 },
      { name: "Dispatchers, Except Police, Fire, and Ambulance", salaryIncrease: 10720 },
      { name: "Emergency Medical Technicians", salaryIncrease: 24080 },
      { name: "Security and Fire Alarm Systems Installers", salaryIncrease: 900 },
      { name: "Security Guards", salaryIncrease: 25580 },
    ],
  },
  {
    industry: "Real Estate and Rental and Leasing",
    roles: [
      { name: "Accountants and Auditors", mobilityIndex: 91, talentShortageIndex: 54 },
      { name: "Facilities Managers", mobilityIndex: 84, talentShortageIndex: 68 },
      { name: "Real Estate Sales Agents", mobilityIndex: 78, talentShortageIndex: 91 },
    ],
    targetRole: "Accountants and Auditors",
    feederRoles: [
      { name: "Bookkeeping, Accounting, and Auditing Clerks", salaryIncrease: 4440 },
      { name: "Billing and Posting Clerks", salaryIncrease: 8310 },
      { name: "New Accounts Clerks", salaryIncrease: 13150 },
      { name: "Bill and Account Collectors", salaryIncrease: 9670 },
      { name: "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", salaryIncrease: 9010 },
      { name: "Cashiers", salaryIncrease: 29250 },
      { name: "Retail Salespersons", salaryIncrease: 26810 },
    ],
  },
  {
    industry: "Retail Trade",
    roles: [
      { name: "Pharmacists", mobilityIndex: 94, talentShortageIndex: 73 },
      { name: "First-Line Supervisors of Retail Sales Workers", mobilityIndex: 90, talentShortageIndex: 51 },
      { name: "Jewelers and Precious Stone and Metal Workers", mobilityIndex: 78, talentShortageIndex: 88 },
    ],
    targetRole: "Pharmacists",
    feederRoles: [
      { name: "Pharmacy Technicians", salaryIncrease: 78670 },
      { name: "Pharmacy Aides", salaryIncrease: 84680 },
      { name: "Registered Nurses", salaryIncrease: 19290 },
      { name: "Community Health Workers", salaryIncrease: 64100 },
      { name: "Chemists", salaryIncrease: 7040 },
      { name: "Health Technologists and Technicians, All Other", salaryIncrease: 64970 },
      { name: "Cashiers", salaryIncrease: 91840 },
      { name: "Retail Salespersons", salaryIncrease: 89400 },
    ],
  },
  {
    industry: "Wholesale Trade",
    roles: [
      { name: "Sales Engineers", mobilityIndex: 97, talentShortageIndex: 58 },
      { name: "Credit Analysts", mobilityIndex: 92, talentShortageIndex: 71 },
      { name: "Purchasing Managers", mobilityIndex: 81, talentShortageIndex: 64 },
    ],
    targetRole: "Sales Engineers",
    feederRoles: [
      { name: "Real Estate Sales Agents", salaryIncrease: 5250 },
      { name: "Retail Salespersons", salaryIncrease: 52840 },
      { name: "Customer Service Representatives", salaryIncrease: 40550 },
      { name: "Mechanical Engineering Technologists and Technicians", salaryIncrease: 7710 },
      { name: "Computer User Support Specialists", salaryIncrease: 13680 },
    ],
  },
  {
    industry: "Utilities",
    roles: [
      { name: "Engineers, All Other", mobilityIndex: 96, talentShortageIndex: 58 },
      { name: "Power Plant Operators", mobilityIndex: 90, talentShortageIndex: 93 },
      { name: "Training and Development Specialists", mobilityIndex: 84, talentShortageIndex: 56 },
    ],
    targetRole: "Engineers, All Other",
    feederRoles: [
      { name: "Industrial Engineering Technologists and Technicians", salaryIncrease: 6710 },
      { name: "Mechanical Engineering Technologists and Technicians", salaryIncrease: 2770 },
      { name: "Civil Engineering Technologists and Technicians", salaryIncrease: 6200 },
      { name: "Electricians", salaryIncrease: 4020 },
      { name: "Social Science Research Assistants", salaryIncrease: 12690 },
      { name: "Teaching Assistants, Postsecondary", salaryIncrease: 25340 },
    ],
  },
  {
    industry: "Transportation and Warehousing",
    roles: [
      { name: "Airline Pilots, Copilots, and Flight Engineers", mobilityIndex: 99, talentShortageIndex: 92 },
      { name: "Commercial Pilots", mobilityIndex: 97, talentShortageIndex: 92 },
      { name: "Bus and Truck Mechanics and Diesel Engine Specialists", mobilityIndex: 72, talentShortageIndex: 80 },
    ],
    targetRole: "Airline Pilots, Copilots, and Flight Engineers",
    feederRoles: [
      { name: "Flight Attendants", salaryIncrease: 56200 },
      { name: "Captains, Mates, and Pilots of Water Vessels", salaryIncrease: 29830 },
      { name: "Aerospace Engineering and Operations Technologists and Technicians", salaryIncrease: 52140 },
      { name: "Aircraft Mechanics and Service Technicians", salaryIncrease: 59310 },
      { name: "Airfield Operations Specialists", salaryIncrease: 76040 },
      { name: "Avionics Technicians", salaryIncrease: 55370 },
      { name: "Transportation Inspectors", salaryIncrease: 49340 },
    ],
  },
]

// Helper: get an industry by name
export function getIndustry(name) {
  return PMM_INDUSTRIES.find(d => d.industry === name)
}

// Helper: get top feeder for a given industry's target role
export function getTopFeeder(industryName) {
  const ind = getIndustry(industryName)
  if (!ind || !ind.feederRoles.length) return null
  return [...ind.feederRoles].sort((a, b) => b.salaryIncrease - a.salaryIncrease)[0]
}
