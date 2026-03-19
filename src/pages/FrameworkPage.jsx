import { useState, useMemo } from 'react'
import { FRAMEWORK_STEPS, PILLARS, SAMPLE_OCCUPATIONS } from '../data/jtmFramework'
import { PMM_INDUSTRIES } from '../data/mobilityMonitor'
import { Building2, Users, Scale, Target, ChevronDown, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts'

const PILLAR_ICONS = { Building2, Users, Scale, Target }
const PILLAR_ICON_MAP = {
  employers: 'Building2',
  workers: 'Users',
  equity: 'Scale',
  strategy: 'Target',
}

const INDUSTRY_SHORT = {
  'Accommodation and Food Services': 'Hospitality',
  'Administrative and Support and Waste Management and Remediation Services': 'Admin & Support',
  'Arts, Entertainment, and Recreation': 'Arts & Rec',
  'Construction': 'Construction',
  'Educational Services': 'Education',
  'Finance and Insurance': 'Finance',
  'Health Care and Social Assistance': 'Healthcare',
  'Information': 'Information',
  'Management of Companies and Enterprises': 'Management',
  'Manufacturing': 'Manufacturing',
  'Mining, Quarrying, and Oil and Gas Extraction': 'Mining & Energy',
  'Other Services (except Public Administration)': 'Other Services',
  'Professional, Scientific, and Technical Services': 'Prof. Services',
  'Public Administration': 'Public Admin',
  'Real Estate and Rental and Leasing': 'Real Estate',
  'Retail Trade': 'Retail',
  'Wholesale Trade': 'Wholesale',
  'Utilities': 'Utilities',
  'Transportation and Warehousing': 'Transportation',
}

function PMMLeaderboard() {
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState('mi') // 'mi' | 'tsi'

  const allRoles = useMemo(() => {
    return PMM_INDUSTRIES.flatMap(d =>
      d.roles
        .filter(r => r.mobilityIndex !== null)
        .map(r => ({
          ...r,
          industry: d.industry,
          isTargetRole: r.name === d.targetRole,
          feederCount: r.name === d.targetRole ? d.feederRoles.length : 0,
        }))
    ).sort((a, b) =>
      sortBy === 'mi'
        ? (b.mobilityIndex - a.mobilityIndex)
        : (b.talentShortageIndex - a.talentShortageIndex)
    )
  }, [sortBy])

  const displayed = showAll ? allRoles : allRoles.slice(0, 12)

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h2 className="font-display font-semibold text-navy text-xl">Phoenix's Top JTM Roles</h2>
        <a
          href="https://phoenix.ourtalentmobility.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-orange flex items-center gap-1 no-underline hover:text-orange-dark"
        >
          Phoenix Mobility Monitor <ExternalLink size={11} />
        </a>
      </div>
      <p className="text-gray-600 text-sm mb-4 max-w-2xl">
        Every high-mobility occupation identified by BGI in the Phoenix MSA, ranked by Mobility Index.
        High Talent Shortage Index (TSI) signals roles where skills-first hiring opens the biggest pipeline.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500">Sort by:</span>
        <button
          onClick={() => setSortBy('mi')}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${sortBy === 'mi' ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          Mobility Index
        </button>
        <button
          onClick={() => setSortBy('tsi')}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${sortBy === 'tsi' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          Talent Shortage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <div className="col-span-5">Occupation</div>
          <div className="col-span-3">Industry</div>
          <div className="col-span-2 text-center">MI</div>
          <div className="col-span-2 text-center">TSI</div>
        </div>
        {displayed.map((role, i) => {
          const miColor = role.mobilityIndex >= 90 ? '#2D6A4F' : role.mobilityIndex >= 70 ? '#E0732B' : '#6b7280'
          const tsiColor = role.talentShortageIndex >= 80 ? '#dc2626' : role.talentShortageIndex >= 60 ? '#d97706' : '#6b7280'
          return (
            <div
              key={`${role.name}-${role.industry}`}
              className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-50 hover:bg-warm-gray transition-colors items-center"
            >
              <div className="col-span-5 flex items-center gap-2">
                <span className="text-xs text-gray-300 w-5 text-right shrink-0">{i + 1}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800 leading-tight">{role.name}</div>
                  {role.isTargetRole && role.feederCount > 0 && (
                    <div className="text-xs text-orange mt-0.5">{role.feederCount} feeder pathways</div>
                  )}
                </div>
              </div>
              <div className="col-span-3 text-xs text-gray-500 leading-tight">
                {INDUSTRY_SHORT[role.industry] || role.industry}
              </div>
              <div className="col-span-2 flex flex-col items-center gap-1">
                <div className="text-sm font-bold" style={{ color: miColor }}>{role.mobilityIndex}</div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${role.mobilityIndex}%`, backgroundColor: miColor }} />
                </div>
              </div>
              <div className="col-span-2 flex flex-col items-center gap-1">
                <div className="text-sm font-bold" style={{ color: tsiColor }}>{role.talentShortageIndex}</div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${role.talentShortageIndex}%`, backgroundColor: tsiColor }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-400 italic">
          Source: BGI / Lightcast, Phoenix MSA · MI = Mobility Index · TSI = Talent Shortage Index
        </p>
        <button
          onClick={() => setShowAll(v => !v)}
          className="text-xs text-orange font-medium hover:text-orange-dark cursor-pointer transition-colors"
        >
          {showAll ? `Show fewer ↑` : `Show all ${allRoles.length} roles ↓`}
        </button>
      </div>
    </section>
  )
}

export default function FrameworkPage() {
  const [activeStep, setActiveStep] = useState(null)
  const [expandedPillar, setExpandedPillar] = useState(null)
  const [selectedOcc, setSelectedOcc] = useState(0)

  const occ = SAMPLE_OCCUPATIONS[selectedOcc]
  const radarData = PILLARS.map(p => ({
    pillar: p.title,
    score: occ.scores[p.id],
    fullMark: 100,
  }))
  const barData = PILLARS.map(p => ({
    name: p.title,
    score: occ.scores[p.id],
    color: p.color,
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-display font-bold text-navy mb-2">The JTM Framework</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        A data-driven process that identifies jobs driving economic mobility -- scoring occupations
        across four dimensions to find roles that work for workers, employers, and communities.
      </p>

      {/* 6-Step Process */}
      <section className="mb-14">
        <h2 className="font-display font-semibold text-navy text-xl mb-6">The Six-Step Process</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {FRAMEWORK_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`card-hover bg-white rounded-xl p-4 text-left cursor-pointer border-2 transition-colors ${
                activeStep === i ? 'border-orange' : 'border-transparent'
              } shadow-sm`}
            >
              <div className="text-orange font-display font-bold text-2xl mb-1">
                {String(step.id).padStart(2, '0')}
              </div>
              <div className="font-semibold text-navy text-sm mb-2 leading-tight">{step.title}</div>
              <div className={`text-xs text-gray-500 transition-all ${activeStep === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {step.description}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Four Pillars */}
      <section className="mb-14">
        <h2 className="font-display font-semibold text-navy text-xl mb-6">The Four Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {PILLARS.map(pillar => {
            const iconName = PILLAR_ICON_MAP[pillar.id]
            const Icon = PILLAR_ICONS[iconName]
            const isOpen = expandedPillar === pillar.id
            return (
              <div key={pillar.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedPillar(isOpen ? null : pillar.id)}
                  className="w-full p-5 flex items-start gap-4 text-left cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: pillar.color + '15' }}
                  >
                    {Icon && <Icon size={22} style={{ color: pillar.color }} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-lg" style={{ color: pillar.color }}>
                      {pillar.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{pillar.description}</div>
                  </div>
                  {isOpen ? <ChevronDown size={18} className="text-gray-400 mt-1" /> : <ChevronRight size={18} className="text-gray-400 mt-1" />}
                </button>
                <div className={`expand-content ${isOpen ? 'open' : ''}`}>
                  <div className="expand-inner">
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <div className="text-xs font-semibold uppercase text-gray-400 mb-3">Indicators</div>
                      <div className="space-y-2.5">
                        {pillar.indicators.map(ind => (
                          <div key={ind.name} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: pillar.color }} />
                            <div>
                              <div className="text-sm font-medium text-gray-800">{ind.name}</div>
                              <div className="text-xs text-gray-500">{ind.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Phoenix JTM Role Leaderboard */}
      <PMMLeaderboard />

      {/* Scoring Explorer */}
      <section className="mb-10">
        <h2 className="font-display font-semibold text-navy text-xl mb-2">See How Occupations Score</h2>
        <p className="text-gray-600 text-sm mb-6">
          Each occupation is scored across all four pillars. Higher scores indicate stronger performance relative to other jobs.
        </p>

        {/* Occupation selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SAMPLE_OCCUPATIONS.map((o, i) => (
            <button
              key={o.soc}
              onClick={() => setSelectedOcc(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                selectedOcc === i
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy hover:bg-gray-100'
              }`}
            >
              {o.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-navy text-xl">{occ.title}</h3>
              <div className="text-sm text-gray-500">SOC {occ.soc}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Composite Score</div>
              <div className="text-3xl font-display font-bold text-orange">{occ.composite}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar chart */}
            <div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 13 }} width={80} />
                  <Tooltip formatter={(v) => `${v}th percentile`} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} animationDuration={1200}>
                    {barData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar chart */}
            <div>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="pillar" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Radar dataKey="score" stroke="#E0732B" fill="#E0732B" fillOpacity={0.2} animationDuration={1000} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-4 flex flex-wrap gap-2">
            {occ.highlights.map((h, i) => (
              <span key={i} className="bg-warm-gray text-gray-700 px-3 py-1 rounded-full text-xs">
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
