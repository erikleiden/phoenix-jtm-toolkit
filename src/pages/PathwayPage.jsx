import { useState, useMemo } from 'react'
import { PMM_INDUSTRIES } from '../data/mobilityMonitor'
import { PATHWAYS } from '../data/pathways'
import { RESOURCES } from '../data/resources'
import { ArrowRight, ChevronLeft, Zap, GraduationCap, Clock, ExternalLink } from 'lucide-react'

const RESOURCE_NAME_MAP = Object.fromEntries(RESOURCES.map(r => [r.id, r.name]))

const INDUSTRY_SHORT = {
  'Accommodation and Food Services': 'Hospitality',
  'Administrative and Support and Waste Management and Remediation Services': 'Admin & Support',
  'Arts, Entertainment, and Recreation': 'Arts & Recreation',
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

function MIBadge({ score }) {
  if (!score) return null
  const color = score >= 90 ? '#2D6A4F' : score >= 70 ? '#E0732B' : '#6b7280'
  return (
    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color + '20', color }}>
      MI {score}
    </span>
  )
}

function TSIBadge({ score }) {
  if (!score) return null
  const color = score >= 80 ? '#dc2626' : score >= 60 ? '#d97706' : '#6b7280'
  return (
    <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: color + '15', color }}>
      TSI {score}
    </span>
  )
}

function SkillPill({ label, type, delay = 0 }) {
  const styles = {
    shared: 'bg-green-100 text-green-700 border-green-200',
    gap: 'bg-orange/10 text-orange-dark border-orange/20',
  }
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border animate-fade-in-up ${styles[type]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {type === 'shared' && <span className="mr-1">✓</span>}
      {type === 'gap' && <span className="mr-1">+</span>}
      {label}
    </span>
  )
}

function FeederRoleBar({ role, maxGain, isSelected, onClick, hasDetailedBridge }) {
  const pct = Math.max(8, Math.round((role.salaryIncrease / maxGain) * 100))
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
        isSelected
          ? 'bg-navy/5 ring-1 ring-navy/20'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-sm leading-tight text-gray-800">{role.name}</span>
        <span className="text-sm font-bold text-green-600 shrink-0">+${role.salaryIncrease.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-navy' : 'bg-green-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {hasDetailedBridge && (
        <div className="text-xs text-orange font-medium mt-1.5">✦ Skill bridge available</div>
      )}
    </button>
  )
}

function SkillBridgePanel({ pathway }) {
  const sharedCount = pathway.sharedSkills.length
  const gapCount = pathway.gapSkills.length
  const totalTarget = pathway.target.skills.length
  const overlapPct = Math.round(sharedCount / totalTarget * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 h-full flex flex-col">
      <h3 className="font-display font-semibold text-navy mb-4 text-sm">Skill Bridge Detail</h3>

      {/* Wages */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <div className="bg-warm-gray px-3 py-2 rounded-lg">
          <div className="text-xs text-gray-400">From</div>
          <div className="font-semibold text-navy text-sm">{pathway.feeder.title}</div>
          <div className="text-xs text-gray-500">${pathway.feeder.medianWage.toLocaleString()}/yr</div>
        </div>
        <ArrowRight size={16} className="text-orange shrink-0" />
        <div className="bg-orange/5 border border-orange/20 px-3 py-2 rounded-lg">
          <div className="text-xs text-orange">Target</div>
          <div className="font-semibold text-navy text-sm">{pathway.target.title}</div>
          <div className="text-xs text-gray-500">${pathway.target.medianWage.toLocaleString()}/yr</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xl font-display font-bold text-green-600">+${pathway.wageGain.toLocaleString()}</div>
          <div className="text-xs text-gray-400">annual gain</div>
        </div>
      </div>

      {/* Overlap bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 font-medium">Skills overlap</span>
          <span className="font-semibold text-navy">{overlapPct}% of target skills already present</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500 rounded-l-full transition-all duration-700" style={{ width: `${overlapPct}%` }} />
          <div className="h-full bg-orange" style={{ width: `${100 - overlapPct}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-green-600">{sharedCount} shared skills</span>
          <span className="text-orange">{gapCount} skills to develop</span>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        <div>
          <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Zap size={11} /> Already have
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {pathway.sharedSkills.map((s, i) => (
              <SkillPill key={s} label={s} type="shared" delay={i * 60} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-orange-dark uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <GraduationCap size={11} /> To develop
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {pathway.gapSkills.map((s, i) => (
              <SkillPill key={s} label={s} type="gap" delay={i * 60 + 300} />
            ))}
          </div>
        </div>
      </div>

      {/* Training */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {pathway.trainingWeeks >= 52
              ? `~${(pathway.trainingWeeks / 52).toFixed(0)} yr${pathway.trainingWeeks >= 104 ? 's' : ''}`
              : `${pathway.trainingWeeks} wks`}
          </span>
          {pathway.trainingPartners.map(p => (
            <span key={p} className="bg-navy/5 text-navy px-2 py-0.5 rounded-full">
              {RESOURCE_NAME_MAP[p] || p}
            </span>
          ))}
        </div>
        {pathway.trainingNotes && (
          <p className="text-xs text-gray-400 italic">{pathway.trainingNotes}</p>
        )}
      </div>
    </div>
  )
}

// ── Browse mode card ──────────────────────────────────────────────────────────
function DestinationCard({ dest, onClick }) {
  const roleInfo = dest.roles.find(r => r.name === dest.targetRole)
  const hasDetailed = PATHWAYS.some(p => p.pmmIndustry === dest.industry)
  const topGain = Math.max(...dest.feederRoles.map(f => f.salaryIncrease))

  return (
    <button
      onClick={onClick}
      className="card-hover bg-white rounded-xl shadow-sm p-5 text-left cursor-pointer flex flex-col gap-2.5 w-full"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-navy text-sm leading-tight flex-1">
          {dest.targetRole}
        </h3>
        {hasDetailed && (
          <span className="text-xs bg-green/10 text-green font-semibold px-1.5 py-0.5 rounded shrink-0">
            ✦ Detailed
          </span>
        )}
      </div>
      <div className="text-xs text-gray-400">{INDUSTRY_SHORT[dest.industry] || dest.industry}</div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {roleInfo && <MIBadge score={roleInfo.mobilityIndex} />}
        {roleInfo && <TSIBadge score={roleInfo.talentShortageIndex} />}
      </div>
      <div className="text-xs text-gray-600 mt-auto pt-1 border-t border-gray-50">
        <span className="font-medium">{dest.feederRoles.length}</span> feeder roles ·{' '}
        <span className="font-semibold text-green-600">up to +${(topGain / 1000).toFixed(0)}K</span> wage gain
      </div>
    </button>
  )
}

// ── Detail mode ───────────────────────────────────────────────────────────────
function DestinationDetail({ dest, onBack }) {
  const [selectedFeeder, setSelectedFeeder] = useState(null)

  const roleInfo = dest.roles.find(r => r.name === dest.targetRole)
  const detailedPathway = PATHWAYS.find(p => p.pmmIndustry === dest.industry)
  const sortedFeeders = useMemo(
    () => [...dest.feederRoles].sort((a, b) => b.salaryIncrease - a.salaryIncrease),
    [dest]
  )
  const maxGain = sortedFeeders[0]?.salaryIncrease || 1

  // Check if the selected feeder matches the detailed pathway's feeder role
  const showBridge = selectedFeeder && detailedPathway &&
    detailedPathway.feeder.title.toLowerCase().split(' ').some(w =>
      selectedFeeder.toLowerCase().includes(w) && w.length > 4
    )

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy mb-6 cursor-pointer transition-colors"
      >
        <ChevronLeft size={15} /> Back to all destinations
      </button>

      {/* Target role header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs bg-orange/10 text-orange font-semibold px-2 py-0.5 rounded">
                JTM Target Role
              </span>
              {roleInfo && <MIBadge score={roleInfo.mobilityIndex} />}
              {roleInfo && <TSIBadge score={roleInfo.talentShortageIndex} />}
            </div>
            <h2 className="text-2xl font-display font-bold text-navy mb-1">{dest.targetRole}</h2>
            <div className="text-sm text-gray-500">{dest.industry}</div>
            {detailedPathway && (
              <div className="text-sm text-gray-600 mt-1">
                Median wage: <strong>${detailedPathway.target.medianWage.toLocaleString()}/yr</strong>
              </div>
            )}
          </div>
          <a
            href="https://phoenix.ourtalentmobility.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange flex items-center gap-1 no-underline hover:text-orange-dark shrink-0"
          >
            View on Phoenix Mobility Monitor <ExternalLink size={11} />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-warm-gray rounded-lg p-3 text-center">
            <div className="text-2xl font-display font-bold" style={{ color: roleInfo?.mobilityIndex >= 90 ? '#2D6A4F' : '#E0732B' }}>
              {roleInfo?.mobilityIndex ?? '—'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Mobility Index</div>
            <div className="text-xs text-gray-400 mt-0.5">out of 100</div>
          </div>
          <div className="bg-warm-gray rounded-lg p-3 text-center">
            <div className="text-2xl font-display font-bold text-red-600">
              {roleInfo?.talentShortageIndex ?? '—'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Talent Shortage</div>
            <div className="text-xs text-gray-400 mt-0.5">employers can't fill</div>
          </div>
          <div className="bg-warm-gray rounded-lg p-3 text-center">
            <div className="text-2xl font-display font-bold text-green-600">
              {sortedFeeders.length}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Feeder Pathways</div>
            <div className="text-xs text-gray-400 mt-0.5">identified in Phoenix</div>
          </div>
        </div>

        {/* Other high-mobility roles in this industry */}
        {dest.roles.length > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-400 mb-2">Also high-mobility in {INDUSTRY_SHORT[dest.industry] || dest.industry}</div>
            <div className="flex flex-wrap gap-2">
              {dest.roles.filter(r => r.name !== dest.targetRole).map(r => (
                <span key={r.name} className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full text-gray-600 flex items-center gap-1.5">
                  {r.name}
                  {r.mobilityIndex && <MIBadge score={r.mobilityIndex} />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two-column: feeders + skill bridge */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Feeder roles */}
        <div className="lg:col-span-2">
          <h3 className="font-display font-semibold text-navy text-base mb-1">Feeder Roles</h3>
          <p className="text-xs text-gray-500 mb-4">
            Workers in these roles can transition to <strong>{dest.targetRole}</strong>.
            Bars show estimated annual salary gain (Phoenix MSA).
            {detailedPathway && (
              <span className="block mt-1 text-orange">
                ✦ Roles marked with a skill bridge have full skill gap analysis.
              </span>
            )}
          </p>
          <div className="space-y-0.5">
            {sortedFeeders.map(feeder => {
              const hasBridge = detailedPathway &&
                detailedPathway.feeder.title.toLowerCase().split(' ').some(w =>
                  feeder.name.toLowerCase().includes(w) && w.length > 4
                )
              return (
                <FeederRoleBar
                  key={feeder.name}
                  role={feeder}
                  maxGain={maxGain}
                  isSelected={selectedFeeder === feeder.name}
                  hasDetailedBridge={hasBridge}
                  onClick={() => setSelectedFeeder(selectedFeeder === feeder.name ? null : feeder.name)}
                />
              )
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">Source: BGI/Lightcast, Phoenix MSA</p>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-3 min-h-64">
          {selectedFeeder ? (
            showBridge ? (
              <SkillBridgePanel pathway={detailedPathway} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full">
                <h3 className="font-display font-semibold text-navy mb-3 text-sm">
                  {selectedFeeder} → {dest.targetRole}
                </h3>
                <div className="flex gap-4 mb-5">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-green-600">
                      +${sortedFeeders.find(f => f.name === selectedFeeder)?.salaryIncrease.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">estimated annual salary gain</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  This pathway is identified in the Phoenix Mobility Monitor as a viable transition route.
                  Detailed skill gap analysis isn't available for this specific pairing, but the
                  Phoenix Mobility Monitor can help you explore it further.
                </p>
                <div className="mt-auto space-y-2">
                  <a
                    href="https://phoenix.ourtalentmobility.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-orange font-medium no-underline hover:text-orange-dark"
                  >
                    Explore on Phoenix Mobility Monitor <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://www.onetonline.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-500 no-underline hover:text-navy"
                  >
                    Look up skills on O*NET <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )
          ) : (
            <div className="bg-warm-gray rounded-xl p-6 flex flex-col items-center justify-center h-full text-center min-h-48">
              <Zap size={28} className="text-orange mb-3 opacity-50" />
              <p className="text-sm text-gray-600 max-w-xs">
                Select a feeder role on the left to explore the wage gain and skill pathway into <strong>{dest.targetRole}</strong>.
              </p>
              {detailedPathway && (
                <p className="text-xs text-orange mt-3 font-medium">
                  ✦ Select <em>{detailedPathway.feeder.title}</em> for a detailed skill bridge
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PathwayPage() {
  const [industryFilter, setIndustryFilter] = useState(null)
  const [selectedDest, setSelectedDest] = useState(null)

  const destinations = useMemo(
    () => PMM_INDUSTRIES.filter(d => d.feederRoles.length > 0),
    []
  )

  const filtered = useMemo(
    () => industryFilter ? destinations.filter(d => d.industry === industryFilter) : destinations,
    [destinations, industryFilter]
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {selectedDest ? (
        <DestinationDetail dest={selectedDest} onBack={() => setSelectedDest(null)} />
      ) : (
        <>
          <h1 className="text-3xl font-display font-bold text-navy mb-2">Skills Pathway Visualizer</h1>
          <p className="text-gray-600 mb-2 max-w-2xl">
            Pick a destination — a high-mobility Jobs That Mobilize role in Phoenix — then see which feeder
            roles lead there and how large the wage gain is for workers who make the move.
          </p>
          <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
            <span>Occupation data sourced from the</span>
            <a href="https://phoenix.ourtalentmobility.org/" target="_blank" rel="noopener noreferrer"
              className="text-orange underline hover:text-orange-dark">Phoenix Mobility Monitor</a>
            <span>(Burning Glass Institute / Lightcast, Phoenix MSA) ·</span>
            <span>✦ Detailed = full skill gap analysis available</span>
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5 bg-white rounded-lg px-4 py-3 shadow-sm">
            <span><strong className="text-gray-700">MI</strong> = Mobility Index — how strongly this role drives economic mobility</span>
            <span><strong className="text-gray-700">TSI</strong> = Talent Shortage Index — how hard employers find it to fill through traditional hiring</span>
          </div>

          {/* Industry filter */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <button
              onClick={() => setIndustryFilter(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                !industryFilter ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              All ({destinations.length})
            </button>
            {destinations.map(d => (
              <button
                key={d.industry}
                onClick={() => setIndustryFilter(industryFilter === d.industry ? null : d.industry)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  industryFilter === d.industry ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {INDUSTRY_SHORT[d.industry] || d.industry}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400 mb-3">{filtered.length} destination role{filtered.length !== 1 ? 's' : ''}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(dest => (
              <DestinationCard
                key={dest.industry}
                dest={dest}
                onClick={() => setSelectedDest(dest)}
              />
            ))}
          </div>

          <div className="mt-8 bg-navy/5 rounded-xl p-6 text-center">
            <h3 className="font-display font-semibold text-navy mb-1">Explore the full Phoenix picture</h3>
            <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
              The Phoenix Mobility Monitor shows mobility scores across all occupations and industries in the Phoenix MSA.
            </p>
            <a
              href="https://phoenix.ourtalentmobility.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-orange-dark transition-colors"
            >
              Open Phoenix Mobility Monitor <ExternalLink size={14} />
            </a>
          </div>
        </>
      )}
    </div>
  )
}
