import { useState, useEffect, useRef } from 'react'
import { PATHWAYS } from '../data/pathways'
import { RESOURCES } from '../data/resources'
import { ArrowRight, Clock, DollarSign, GraduationCap, Zap } from 'lucide-react'

const RESOURCE_NAME_MAP = Object.fromEntries(RESOURCES.map(r => [r.id, r.name]))

function SkillPill({ label, type, delay = 0 }) {
  const colors = {
    shared: 'bg-green-100 text-green-700 border-green-200',
    gap: 'bg-orange/10 text-orange-dark border-orange/20',
    feederOnly: 'bg-gray-100 text-gray-500 border-gray-200',
  }
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border animate-fade-in-up ${colors[type]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {type === 'shared' && <span className="mr-1">&#10003;</span>}
      {type === 'gap' && <span className="mr-1">+</span>}
      {label}
    </span>
  )
}

function PathwayDiagram({ pathway }) {
  const totalFeeder = pathway.feeder.skills.length
  const totalTarget = pathway.target.skills.length
  const sharedCount = pathway.sharedSkills.length
  const gapCount = pathway.gapSkills.length
  const overlapPct = Math.round(sharedCount / totalTarget * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Title bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-warm-gray px-4 py-2 rounded-lg">
            <div className="text-xs text-gray-500">From</div>
            <div className="font-display font-semibold text-navy">{pathway.feeder.title}</div>
            <div className="text-sm text-gray-500">${pathway.feeder.medianWage.toLocaleString()}/yr</div>
          </div>
          <ArrowRight size={24} className="text-orange" />
          <div className="bg-orange/5 border border-orange/20 px-4 py-2 rounded-lg">
            <div className="text-xs text-orange">JTM Target</div>
            <div className="font-display font-semibold text-navy">{pathway.target.title}</div>
            <div className="text-sm text-gray-500">${pathway.target.medianWage.toLocaleString()}/yr</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold text-green-600">
            +${pathway.wageGain.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">annual wage gain</div>
        </div>
      </div>

      {/* Visual overlap bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">Skills Overlap</span>
          <span className="font-semibold text-navy">{overlapPct}% of target skills already present</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-green-500 rounded-l-full transition-all duration-1000"
            style={{ width: `${overlapPct}%` }}
          />
          <div
            className="h-full bg-orange transition-all duration-1000"
            style={{ width: `${100 - overlapPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span className="text-green-600">{sharedCount} shared skills</span>
          <span className="text-orange">{gapCount} skills to develop</span>
        </div>
      </div>

      {/* Skills sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shared skills */}
        <div>
          <h4 className="font-semibold text-sm text-green-700 mb-3 flex items-center gap-2">
            <Zap size={14} /> Skills You Already Have
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {pathway.sharedSkills.map((s, i) => (
              <SkillPill key={s} label={s} type="shared" delay={i * 80} />
            ))}
          </div>
          {pathway.adjacentSkills && pathway.adjacentSkills.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1.5">Adjacent skills (transferable with context)</div>
              <div className="flex flex-wrap gap-1.5">
                {pathway.adjacentSkills.map((s, i) => (
                  <span key={s} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Gap skills */}
        <div>
          <h4 className="font-semibold text-sm text-orange-dark mb-3 flex items-center gap-2">
            <GraduationCap size={14} /> Skills to Develop
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {pathway.gapSkills.map((s, i) => (
              <SkillPill key={s} label={s} type="gap" delay={i * 80 + 400} />
            ))}
          </div>
        </div>
      </div>

      {/* Training info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Training Time</div>
              <div className="text-sm font-semibold text-navy">{pathway.trainingWeeks} weeks</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Wage Gain</div>
              <div className="text-sm font-semibold text-green-600">+${pathway.wageGain.toLocaleString()}/yr</div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-gray-500 mb-1">Training Partners</div>
            <div className="flex flex-wrap gap-1.5">
              {pathway.trainingPartners.map(p => (
                <span key={p} className="text-xs bg-navy/5 text-navy px-2 py-1 rounded-full">{RESOURCE_NAME_MAP[p] || p}</span>
              ))}
            </div>
          </div>
        </div>
        {pathway.certifications && (
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">Relevant Certifications</div>
            <div className="flex flex-wrap gap-1.5">
              {pathway.certifications.map(c => (
                <span key={c} className="text-xs bg-orange/5 text-orange-dark px-2 py-1 rounded-full border border-orange/10">{c}</span>
              ))}
            </div>
          </div>
        )}
        {pathway.trainingNotes && (
          <p className="text-xs text-gray-500 mt-3 italic">{pathway.trainingNotes}</p>
        )}
      </div>
    </div>
  )
}

export default function PathwayPage() {
  const [selected, setSelected] = useState(0)
  const pathway = PATHWAYS[selected]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-display font-bold text-navy mb-2">Skills Pathway Visualizer</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        See how workers in feeder roles already have many of the skills needed for higher-paying JTM target roles.
        The gap is smaller than you think -- and bridgeable with targeted training.
      </p>

      {/* Pathway selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PATHWAYS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setSelected(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              selected === i
                ? 'bg-navy text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {p.feeder.title} &rarr; {p.target.title}
            <span className="ml-2 text-xs opacity-60">+${(p.wageGain / 1000).toFixed(0)}K</span>
          </button>
        ))}
      </div>

      <PathwayDiagram key={pathway.id} pathway={pathway} />

      <div className="mt-8 bg-navy/5 rounded-xl p-6 text-center">
        <h3 className="font-display font-semibold text-navy mb-2">Ready to explore pathways?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Connect with Arizona@Work or explore AZ Pipeline Connect to find your next career step.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://www.azcommerce.com/workforce" target="_blank" rel="noopener noreferrer"
            className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-medium no-underline hover:bg-navy-light transition-colors">
            Arizona@Work
          </a>
          <a href="https://www.azpipelineconnect.com" target="_blank" rel="noopener noreferrer"
            className="bg-orange text-white px-5 py-2 rounded-lg text-sm font-medium no-underline hover:bg-orange-dark transition-colors">
            AZ Pipeline Connect
          </a>
        </div>
      </div>
    </div>
  )
}
