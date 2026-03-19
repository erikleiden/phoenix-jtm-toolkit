import { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts'
import { DollarSign, TrendingDown, Users, ChevronDown, ChevronUp, ExternalLink, Info, ArrowRight, Search, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── Research constants ───────────────────────────────────────────────────────
const REPLACEMENT_COST_PCT  = 0.21   // Center for American Progress (2012): median replacement cost = 21% of salary
const SBH_RETENTION_GAIN    = 0.10   // BGI Pronouncements to Practice (2024): SBH Leader firms +10pp two-year retention
const PRODUCTIVITY_GAP_PCT  = 0.07   // Cappelli, HBR (2019): external hires underperform internal hires for ~3 years; ~7% year-1 proxy
const WORKER_WAGE_GAIN      = 12400  // BGI Pronouncements to Practice (2024): avg +$12,400/yr for non-degreed workers in new roles
const NONDEGREED_SHARE      = 0.40   // Illustrative: 40% of newly-internalized hires are non-degreed workers accessing JTM occupations

// ─── Sector presets ───────────────────────────────────────────────────────────
// Turnover rates from BLS Job Openings and Labor Turnover Survey; salaries reflect Phoenix JTM occupations in each sector

const SECTORS = [
  { label: 'Construction & Trades',       turnoverRate: 0.25, avgSalary: 58000, pctExternal: 0.65, note: 'HVAC, crane operators, facilities management' },
  { label: 'Manufacturing & Production',  turnoverRate: 0.22, avgSalary: 52000, pctExternal: 0.70, note: 'Production supervisors, quality technicians' },
  { label: 'Healthcare Services',         turnoverRate: 0.28, avgSalary: 56000, pctExternal: 0.72, note: 'Medical equipment repairers, health technicians' },
  { label: 'Logistics & Transportation',  turnoverRate: 0.30, avgSalary: 55000, pctExternal: 0.75, note: 'Logisticians, transportation inspectors' },
  { label: 'Technology & Professional',   turnoverRate: 0.18, avgSalary: 82000, pctExternal: 0.60, note: 'IT support, technical project roles' },
  { label: 'General / Other',             turnoverRate: 0.25, avgSalary: 45000, pctExternal: 0.70, note: 'Use this as your starting point and adjust' },
]

// ─── Slider definitions ───────────────────────────────────────────────────────

const SLIDERS = [
  {
    key: 'employees',
    label: 'Employees in JTM-eligible roles',
    tooltip: 'Number of employees in roles that qualify as Jobs That Mobilize occupations — typically skilled technical, trades, logistics, or healthcare support roles. Not your entire workforce.',
    min: 10, max: 500, step: 10,
    format: v => v.toLocaleString(),
  },
  {
    key: 'avgSalary',
    label: 'Average annual salary',
    tooltip: 'Average total compensation for your JTM-eligible roles. Phoenix JTM occupations range from $45K–$82K. Pre-selected based on your sector.',
    min: 25000, max: 120000, step: 2500,
    format: v => '$' + v.toLocaleString(),
  },
  {
    key: 'turnoverRate',
    label: 'Annual turnover rate',
    tooltip: 'Share of employees in these roles who leave each year. Pre-selected based on your sector using BLS data. Adjust if your organization runs higher or lower.',
    min: 0.05, max: 0.60, step: 0.01,
    format: v => Math.round(v * 100) + '%',
  },
  {
    key: 'pctExternal',
    label: 'Share of vacancies filled externally',
    tooltip: 'When a role opens, how often do you hire from outside vs. promote or transfer from within? The national average is ~67%; organizations with strong internal pathways run 40–50%.',
    min: 0.20, max: 1.00, step: 0.05,
    format: v => Math.round(v * 100) + '%',
  },
]

// ─── Calculation ──────────────────────────────────────────────────────────────

function calculate({ employees, avgSalary, turnoverRate, pctExternal, maturity }) {
  // maturity = 0 (no practices) to 1 (fully implemented)
  // Remaining savings potential shrinks as maturity increases
  const remaining = 1 - maturity

  const turnoverEvents = employees * turnoverRate
  const externalHires  = turnoverEvents * pctExternal

  // Current burden ─────────────────────────────────────
  // Replacement cost includes recruiting, onboarding, lost productivity (CAP 2012)
  const replacementCost  = turnoverEvents * avgSalary * REPLACEMENT_COST_PCT
  // Productivity gap: external hires at ~7% deficit year 1 (Cappelli, HBR 2019)
  const productivityCost = externalHires * avgSalary * PRODUCTIVITY_GAP_PCT
  const totalBurden      = replacementCost + productivityCost

  // Savings from Talent Sourcing + Validating Skills practices ─────────────────
  // Employers who open JTM occupations to feeder-role candidates (skills-based hiring)
  // retain those workers 10pp longer — BGI P2P (2024)
  const retentionGain    = Math.min(SBH_RETENTION_GAIN, turnoverRate - 0.05) * remaining
  const retentionSavings = employees * retentionGain * avgSalary * REPLACEMENT_COST_PCT

  // Savings from Job Placement practices ─────────────────────────────────────
  // Filling JTM vacancies from feeder-role workers (internal pathways) vs. external recruiting
  // External hires take 3 years to match internal hire performance — Cappelli, HBR 2019
  const mobilityShift      = Math.min(0.20, Math.max(0, pctExternal - 0.10)) * remaining
  const shiftedHires       = turnoverEvents * mobilityShift
  const productivitySavings = shiftedHires * avgSalary * PRODUCTIVITY_GAP_PCT

  const totalSavings = retentionSavings + productivitySavings
  const newBurden    = totalBurden - totalSavings

  // Worker impact ───────────────────────────────────────────────────────────────
  // Non-degreed workers placed into JTM occupations previously requiring a degree
  const nonDegreeHires = Math.round(shiftedHires * NONDEGREED_SHARE)
  const workerWageGain = nonDegreeHires * WORKER_WAGE_GAIN

  return {
    turnoverEvents:     Math.round(turnoverEvents),
    externalHires:      Math.round(externalHires),
    replacementCost:    Math.round(replacementCost),
    productivityCost:   Math.round(productivityCost),
    totalBurden:        Math.round(totalBurden),
    retentionSavings:   Math.round(retentionSavings),
    productivitySavings: Math.round(productivitySavings),
    totalSavings:       Math.round(totalSavings),
    newBurden:          Math.round(newBurden),
    pctSaved:           totalBurden > 0 ? Math.round((totalSavings / totalBurden) * 100) : 0,
    nonDegreeHires,
    workerWageGain:     Math.round(workerWageGain),
    newTurnoverRate:    Math.round((turnoverRate - retentionGain) * 100),
  }
}

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmt(n)     { return n >= 1_000_000 ? '$' + (n/1_000_000).toFixed(1)+'M' : n >= 1_000 ? '$'+Math.round(n/1000)+'K' : '$'+n }
function fmtFull(n) { return '$' + n.toLocaleString() }

// ─── Sub-components ───────────────────────────────────────────────────────────

function SliderInput({ config, value, onChange }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-sm font-semibold text-navy flex items-center gap-1.5">
          {config.label}
          <span className="group relative cursor-help">
            <Info size={13} className="text-gray-400" />
            <span className="absolute left-5 top-0 z-10 hidden group-hover:block w-64 bg-navy text-white text-xs p-2.5 rounded-lg shadow-lg">
              {config.tooltip}
            </span>
          </span>
        </label>
        <span className="text-base font-bold text-orange">{config.format(value)}</span>
      </div>
      <input
        type="range" min={config.min} max={config.max} step={config.step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#E0732B' }}
      />
      <div className="flex justify-between text-xs text-gray-400 mt-0.5">
        <span>{config.format(config.min)}</span>
        <span>{config.format(config.max)}</span>
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, color = 'navy', icon: Icon }) {
  const styles = {
    navy:   'bg-navy text-white',
    orange: 'bg-orange text-white',
    green:  'bg-green text-white',
  }
  return (
    <div className={`${styles[color]} rounded-xl p-5`}>
      {Icon && <Icon size={20} className="opacity-70 mb-2" />}
      <div className="text-2xl font-bold font-display mb-0.5">{value}</div>
      <div className="text-sm font-semibold leading-tight">{label}</div>
      {sub && <div className="text-xs mt-1.5 opacity-75">{sub}</div>}
    </div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <div className="font-semibold text-navy mb-1">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="flex justify-between gap-4">
          <span style={{ color: p.fill }}>{p.name}</span>
          <span className="font-mono font-semibold">{fmtFull(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const EVIDENCE = [
  { stat: '21%',    label: 'of salary',     bgi: false, desc: 'Median cost to replace an employee — recruiting, onboarding, and productivity ramp-up combined.', source: 'Center for American Progress', detail: '30-study meta-analysis (1992–2007)', url: 'https://americanprogress.org' },
  { stat: '+10pp',  label: 'retention',      bgi: true,  desc: 'Higher two-year retention at firms that open JTM occupations to feeder-role workers (SBH Leaders) vs. degree-holders in the same roles.', source: 'BGI: Pronouncements to Practice', detail: 'Sigelman, Fuller, Martin — February 2024', url: 'https://burningglassinstitute.org' },
  { stat: '3 yrs',  label: 'to match',       bgi: false, desc: 'Time for an external hire to perform as well as an internal hire promoted from a feeder role.', source: 'Peter Cappelli, Harvard Business Review', detail: '"Your Approach to Hiring Is All Wrong," 2019', url: 'https://hbr.org' },
  { stat: '+$12.4K', label: 'per year',      bgi: true,  desc: 'Average annual salary gain for workers placed into JTM occupations that previously required a degree they didn\'t hold.', source: 'BGI: Pronouncements to Practice', detail: 'Sigelman, Fuller, Martin — February 2024', url: 'https://burningglassinstitute.org' },
  { stat: '63%',    label: 'of quitters',    bgi: false, desc: 'Workers who quit in 2021 citing "no opportunities for advancement" — the primary reason JTM pathway-building reduces turnover.', source: 'Pew Research Center', detail: 'Why Workers Quit, 2022', url: 'https://pewresearch.org' },
  { stat: '52%',    label: 'preventable',    bgi: false, desc: 'Share of voluntary exits that employees say their manager or organization could have prevented — mostly through better advancement pathways.', source: 'Gallup', detail: 'Employee Turnover Research, 2019', url: 'https://gallup.com' },
]

// Maps each savings lever to specific playbook sections and actions
const PLAYBOOK_CONNECTIONS = [
  {
    lever: 'Hire for skills, retain longer',
    icon: Search,
    sectionColor: '#1B2A4A',
    description: 'Open JTM occupations to feeder-role workers. Employers who remove degree barriers and accept verified skills records retain these workers 10 percentage points longer.',
    source: 'BGI Pronouncements to Practice (2024)',
    playbookSections: [
      { sectionId: 1, sectionName: 'Talent Sourcing', actions: ['Rewrite Job Postings Around Skills', 'Build Feeder-Role Worker Profiles'] },
      { sectionId: 3, sectionName: 'Validating Skills', actions: ['Train Employers to Use Skills Records'] },
    ],
  },
  {
    lever: 'Fill JTM roles from the inside',
    icon: Briefcase,
    sectionColor: '#7C3AED',
    description: 'Build internal pathways from feeder occupations into JTM roles. Workers promoted from within reach full productivity 2+ years faster than external hires.',
    source: 'Cappelli, HBR (2019)',
    playbookSections: [
      { sectionId: 4, sectionName: 'Job Placement', actions: ['Identify JTM-Hiring Employers', 'Make the Skills Argument', 'Prepare Candidates for Success'] },
      { sectionId: 1, sectionName: 'Talent Sourcing', actions: ['Build Feeder-Role Worker Profiles', 'Partner with Community Organizations'] },
    ],
  },
]

const METHODOLOGY = [
  { term: 'Annual turnover cost', calc: 'Employees × turnover rate × avg salary × 21%', basis: 'Center for American Progress (2012): median replacement cost across 30 case studies = 21% of annual salary, covering separation, recruiting, onboarding, and first-year productivity loss.' },
  { term: 'Retention savings', calc: 'Employees × 10pp improvement × avg salary × 21% × (1 − maturity)', basis: 'BGI Pronouncements to Practice (2024): Skills-Based Hiring Leader firms — those that genuinely open JTM occupations to feeder-role workers — see 10pp higher two-year retention for those hires vs. degreed colleagues. Maturity adjustment reduces savings for employers already implementing these practices.' },
  { term: 'Internal pathway dividend', calc: 'Shifted hires × avg salary × 7% × (1 − maturity)', basis: 'Cappelli (HBR, 2019): external hires take ~3 years to match internal hire performance. We model a conservative 7% year-1 productivity deficit. Assumes a 20pp shift from external to internal hiring where practices allow.' },
  { term: 'Worker wage gain', calc: 'Non-degreed internal hires × $12,400', basis: 'BGI Pronouncements to Practice (2024): non-degreed workers placed into JTM occupations (previously requiring a degree) earn +$12,400/yr on average. We assume 40% of newly-internal hires are non-degreed workers accessing previously out-of-reach roles — an illustrative estimate.' },
  { term: 'Maturity adjustment', calc: 'Remaining savings = savings × (1 − maturity)', basis: 'Employers already implementing skills-based hiring have already captured some of these savings. A 50% maturity score means roughly half the savings have already been realized; adjusting ensures the calculator does not overstate potential for employers mid-implementation.' },
]

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ROICalculatorPage() {
  const defaultSector = SECTORS[5] // General / Other
  const [selectedSector, setSelectedSector] = useState(5)
  const [inputs, setInputs] = useState({
    employees: 100,
    avgSalary: defaultSector.avgSalary,
    turnoverRate: defaultSector.turnoverRate,
    pctExternal: defaultSector.pctExternal,
    maturity: 0,
  })
  const [methodOpen, setMethodOpen] = useState(false)

  const set = (key, val) => setInputs(prev => ({ ...prev, [key]: val }))

  const handleSectorChange = (idx) => {
    const s = SECTORS[idx]
    setSelectedSector(idx)
    setInputs(prev => ({ ...prev, avgSalary: s.avgSalary, turnoverRate: s.turnoverRate, pctExternal: s.pctExternal }))
  }

  const r = useMemo(() => calculate(inputs), [inputs])

  const chartData = [
    { name: 'Turnover\nReplacement', Current: r.replacementCost, 'Skills-first hiring': r.replacementCost - r.retentionSavings },
    { name: 'External Hire\nProductivity Gap', Current: r.productivityCost, 'Skills-first hiring': r.productivityCost - r.productivitySavings },
  ]

  const maturityLabel = inputs.maturity === 0 ? 'No current practices' : inputs.maturity <= 0.33 ? 'Early stages' : inputs.maturity <= 0.66 ? 'Partially implemented' : 'Mostly implemented'

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Employer ROI Calculator
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 max-w-2xl">
            The Business Case for Skills-Based Hiring into JTM Occupations
          </h1>
          <p className="text-white/75 max-w-2xl text-base leading-relaxed mb-3">
            JTM occupations have proven feeder pathways — workers already in adjacent roles who hold 60–80% of the skills required.
            The question is whether your employer's hiring practices will find them, and whether the organization will keep them once hired.
          </p>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
            <strong className="text-white/70">For workforce practitioners:</strong> Use this with employers to quantify what skills-based hiring is worth before making the case for JTM adoption. Adjust the inputs to match their context.
          </p>
        </div>
      </div>

      {/* ── Calculator body ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">

          {/* ── Inputs ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-20">
            <h2 className="font-display text-lg font-bold text-navy mb-1">Employer Context</h2>
            <p className="text-xs text-gray-500 mb-5">Start by selecting a sector — it sets realistic defaults for this type of employer. Then adjust any input to match the specific organization.</p>

            {/* Sector selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-navy block mb-2 flex items-center gap-1.5">
                Sector
                <span className="group relative cursor-help">
                  <Info size={13} className="text-gray-400" />
                  <span className="absolute left-5 top-0 z-10 hidden group-hover:block w-64 bg-navy text-white text-xs p-2.5 rounded-lg shadow-lg">
                    Selecting a sector pre-fills salary and turnover defaults based on BLS data and Phoenix JTM occupation ranges.
                  </span>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SECTORS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSectorChange(i)}
                    className={`text-left px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      selectedSector === i
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-navy/40'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {SECTORS[selectedSector].note && (
                <p className="text-xs text-gray-400 mt-2 italic">{SECTORS[selectedSector].note}</p>
              )}
            </div>

            {/* Sliders */}
            {SLIDERS.map(s => (
              <SliderInput key={s.key} config={s} value={inputs[s.key]} onChange={v => set(s.key, v)} />
            ))}

            {/* Maturity slider */}
            <div className="mt-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-baseline mb-1">
                <label className="text-sm font-semibold text-navy flex items-center gap-1.5">
                  Current skills-based hiring maturity
                  <span className="group relative cursor-help">
                    <Info size={13} className="text-gray-400" />
                    <span className="absolute left-5 top-0 z-10 hidden group-hover:block w-64 bg-navy text-white text-xs p-2.5 rounded-lg shadow-lg">
                      How far along is this employer in removing credential barriers and building internal pathways? Adjusting this prevents overstating savings for employers already mid-implementation.
                    </span>
                  </span>
                </label>
                <span className="text-sm font-bold text-orange">{maturityLabel}</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.05} value={inputs.maturity}
                onChange={e => set('maturity', parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#E0732B' }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>No practices yet</span>
                <span>Mostly implemented</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
              Estimates are illustrative and based on published research benchmarks. Organizations should validate against their own HR data.
            </div>
          </div>

          {/* ── Results ── */}
          <div className="space-y-6">

            {/* Metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard label="Estimated current annual burden" value={fmt(r.totalBurden)} sub={`~${r.turnoverEvents} turnover events/yr`} color="navy" icon={DollarSign} />
              <MetricCard label="Estimated savings with skills-first hiring" value={fmt(r.totalSavings)} sub={`${r.pctSaved}% reduction in burden`} color="green" icon={TrendingDown} />
              <MetricCard label="Per-employee impact" value={fmt(Math.round(r.totalSavings / inputs.employees))} sub="annual savings per employee" color="orange" icon={Users} />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-display font-bold text-navy text-base mb-1">Current burden vs. with skills-first hiring practices</h3>
              <p className="text-xs text-gray-500 mb-5">Two cost categories, each reduced by a different set of practices. See the breakdown below.</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 10 }} barCategoryGap="35%" barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => '$' + (v/1000).toFixed(0) + 'K'} axisLine={false} tickLine={false} width={55} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="Current" name="Current" fill="#1B2A4A" radius={[4,4,0,0]}>
                    <LabelList dataKey="Current" position="top" formatter={fmt} style={{ fontSize: 11, fill: '#1B2A4A', fontWeight: 600 }} />
                  </Bar>
                  <Bar dataKey="Skills-first hiring" name="Skills-first hiring" fill="#E0732B" radius={[4,4,0,0]}>
                    <LabelList dataKey="With JTM Practices" position="top" formatter={fmt} style={{ fontSize: 11, fill: '#E0732B', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-6 mt-2 justify-center">
                <div className="flex items-center gap-1.5 text-xs text-gray-500"><div className="w-3 h-3 rounded-sm bg-navy" /> Current</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500"><div className="w-3 h-3 rounded-sm bg-orange" /> Skills-first hiring</div>
              </div>
            </div>

            {/* Savings breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-display font-bold text-navy text-base mb-4">Savings breakdown</h3>
              <div className="space-y-3">
                <SavingsRow label="Hire for skills, retain longer" value={r.retentionSavings} detail={`Turnover drops from ${Math.round(inputs.turnoverRate*100)}% → ${r.newTurnoverRate}%`} badge="BGI Pronouncements to Practice" bgi />
                <SavingsRow label="Fill JTM roles from the inside" value={r.productivitySavings} detail="Feeder-role workers reach full productivity 2+ yrs faster" badge="Cappelli, HBR 2019" />
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-semibold text-navy text-sm">Total annual savings</span>
                  <span className="font-bold text-green text-xl font-display">{fmt(r.totalSavings)}</span>
                </div>
              </div>
            </div>

            {/* Worker impact */}
            <div className="bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-orange uppercase tracking-wide mb-1">Beyond the bottom line</div>
                  <h3 className="font-display font-bold text-navy text-base mb-2">Worker wage impact</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                    Based on your inputs, approximately{' '}
                    <strong className="text-navy">{r.nonDegreeHires} workers</strong> per year
                    could access JTM occupations previously out of reach. At an average of{' '}
                    <strong className="text-navy">+$12,400/year</strong> in wage gains (BGI research), that's:
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-3xl font-bold font-display text-orange">{fmt(r.workerWageGain)}</div>
                  <div className="text-xs text-gray-500">in annual worker wages</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-orange/20 text-xs text-gray-500">
                Assumes 40% of newly-internalized hires are non-degreed workers accessing JTM occupations that previously required a degree.
                Source: BGI <em>Pronouncements to Practice</em> (2024).
              </div>
            </div>
          </div>
        </div>

        {/* ── From calculation to action ── */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">From calculation to action</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-2xl">
            These savings come from two distinct shifts in how an employer sources and develops talent for JTM occupations.
            Each maps directly to specific sections of the Action Playbook.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLAYBOOK_CONNECTIONS.map((conn, i) => {
              const Icon = conn.icon
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: conn.sectionColor + '15' }}>
                      <Icon size={18} style={{ color: conn.sectionColor }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy text-base leading-tight">{conn.lever}</div>
                      <div className="text-xs text-orange mt-0.5">{conn.source}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{conn.description}</p>
                  <div className="space-y-3">
                    {conn.playbookSections.map((s, j) => (
                      <div key={j} className="bg-warm-gray rounded-lg p-3">
                        <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-1.5">{s.sectionName}</div>
                        <ul className="space-y-1">
                          {s.actions.map((a, k) => (
                            <li key={k} className="text-xs text-gray-600 flex items-start gap-1.5">
                              <ArrowRight size={11} className="text-orange mt-0.5 shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/playbook"
              className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 rounded-lg font-semibold text-sm no-underline hover:bg-navy-dark transition-colors"
            >
              Open the Action Playbook <ArrowRight size={16} />
            </Link>
            <Link
              to="/pathways"
              className="inline-flex items-center gap-2 border border-navy text-navy px-5 py-3 rounded-lg font-semibold text-sm no-underline hover:bg-navy/5 transition-colors"
            >
              Explore feeder-role pathways <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── Evidence cards ── */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy mb-2">The evidence behind the numbers</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-2xl">Every figure in this calculator is grounded in peer-reviewed research or original BGI analysis of 65 million worker career histories.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVIDENCE.map((e, i) => (
              <div key={i} className={`bg-white rounded-xl border p-5 ${e.bgi ? 'border-orange/30' : 'border-gray-100'}`}>
                {e.bgi && <div className="inline-flex items-center gap-1 text-xs font-semibold text-orange bg-orange/10 px-2 py-0.5 rounded-full mb-3">BGI Research</div>}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-3xl font-bold text-navy">{e.stat}</span>
                  <span className="text-sm text-gray-500">{e.label}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{e.desc}</p>
                <a href={e.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-navy transition-colors no-underline">
                  <ExternalLink size={11} />
                  <div><div className="font-semibold">{e.source}</div><div>{e.detail}</div></div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Methodology ── */}
        <div className="mt-10">
          <button
            onClick={() => setMethodOpen(o => !o)}
            className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-navy text-sm">Methodology & assumptions</span>
            {methodOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          <div className={`expand-content ${methodOpen ? 'open' : ''}`}>
            <div className="expand-inner">
              <div className="bg-white border border-t-0 border-gray-100 rounded-b-xl px-6 pb-6 pt-4">
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  This calculator produces illustrative estimates for use in practitioner conversations with employers.
                  The intent is to translate research findings into a specific employer's context — not to provide auditable financial projections.
                  All estimates should be validated against the employer's actual HR data before being cited in formal planning documents.
                </p>
                <div className="space-y-5">
                  {METHODOLOGY.map((m, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 text-sm">
                      <div>
                        <div className="font-semibold text-navy">{m.term}</div>
                        <div className="text-xs text-orange font-mono mt-1">{m.calc}</div>
                      </div>
                      <div className="text-gray-600 leading-relaxed">{m.basis}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
                  <strong>Additional context:</strong> Gallup (2019) estimates replacing an employee costs 0.5×–2× annual salary, consistent with CAP's 21% median.
                  Pew Research (2022): 63% of workers who quit cited "no advancement opportunities" — the core problem JTM pathways address.
                  BGI's "1 in 700 hires" finding reflects aggregate national impact of skills-based hiring to date; individual employer outcomes
                  are substantially higher when practices are implemented with fidelity, as shown by the Leader cohort's 18–20% increase in non-degreed hiring.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SavingsRow({ label, value, detail, badge, bgi }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-navy truncate">{label}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500">{detail}</span>
          {badge && <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${bgi ? 'bg-orange/10 text-orange' : 'bg-gray-100 text-gray-500'}`}>{badge}</span>}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="font-bold text-green text-lg font-display">{fmt(value)}</span>
        <span className="text-xs text-gray-400 ml-1">saved/yr</span>
      </div>
    </div>
  )
}
