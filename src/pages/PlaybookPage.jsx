import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { TOOLKIT_SECTIONS } from '../data/toolkit'
import { RESOURCES } from '../data/resources'
import {
  Search, BookOpen, BadgeCheck, Briefcase,
  ChevronDown, ChevronRight, CheckCircle2, Circle,
  ExternalLink, ArrowRight, DollarSign,
} from 'lucide-react'

const SECTION_ICONS = { Search, BookOpen, BadgeCheck, Briefcase }

function usePlaybookProgress() {
  const key = 'jtm-playbook-progress'
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || '{}') }
    catch { return {} }
  })
  const toggle = useCallback((actionId) => {
    setProgress(prev => {
      const next = { ...prev, [actionId]: !prev[actionId] }
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [])
  return { progress, toggle }
}

function DifficultyBadge({ level }) {
  const styles = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[level] || ''}`}>
      {level}
    </span>
  )
}

function ImpactBadge({ level }) {
  const styles = {
    high: 'bg-navy/10 text-navy',
    medium: 'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[level] || 'bg-gray-50 text-gray-400'}`}>
      {level} impact
    </span>
  )
}

function ActionCard({ action, isChecked, onToggle, sectionColor }) {
  const [expanded, setExpanded] = useState(false)
  const resourceList = RESOURCES.filter(r => action.resources.includes(r.id))

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-l-4 transition-all ${isChecked ? 'opacity-60' : ''}`}
      style={{ borderLeftColor: sectionColor }}
    >
      <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <button
          onClick={e => { e.stopPropagation(); onToggle(action.id) }}
          className="mt-0.5 shrink-0 cursor-pointer"
        >
          {isChecked
            ? <CheckCircle2 size={22} className="text-green-500" />
            : <Circle size={22} className="text-gray-300" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-sm ${isChecked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {action.title}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0">
              <DifficultyBadge level={action.difficulty} />
              <ImpactBadge level={action.impact} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{action.summary}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {action.personas.map(p => (
              <span key={p} className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {p === 'employer' ? 'Employers' : p === 'navigator' ? 'Navigators' : p === 'training' ? 'Training' : 'Workers'}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
        </div>
      </div>

      <div className={`expand-content ${expanded ? 'open' : ''}`}>
        <div className="expand-inner">
          <div className="px-4 pb-4 pt-0 ml-10 border-t border-gray-50">
            <p className="text-sm text-gray-600 mt-3 mb-4">{action.detail}</p>
            {action.steps.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase text-gray-400 mb-2">Steps</div>
                <ol className="space-y-1.5">
                  {action.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-orange font-semibold text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {resourceList.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase text-gray-400 mb-2">Local Resources</div>
                <div className="flex flex-wrap gap-2">
                  {resourceList.map(r => (
                    <a
                      key={r.id}
                      href={r.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-warm-gray rounded-lg text-xs font-medium text-navy hover:bg-warm-gray-dark no-underline transition-colors"
                    >
                      {r.name}
                      {r.url && <ExternalLink size={10} />}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlaybookPage() {
  const { progress, toggle } = usePlaybookProgress()
  const [activeTab, setActiveTab] = useState(1)

  const currentSection = TOOLKIT_SECTIONS.find(s => s.id === activeTab)
  const allActions = TOOLKIT_SECTIONS.flatMap(s => s.actions)
  const completedCount = allActions.filter(a => progress[a.id]).length

  const sectionProgress = (sectionId) => {
    const sec = TOOLKIT_SECTIONS.find(s => s.id === sectionId)
    if (!sec.actions.length) return 0
    return Math.round(sec.actions.filter(a => progress[a.id]).length / sec.actions.length * 100)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy mb-1">Action Playbook</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Concrete steps for employers, navigators, training providers, and workers to connect people to JTM occupations. Each action shows who it's most relevant for.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">Actions completed</div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full progress-fill"
                style={{ width: `${allActions.length ? Math.round(completedCount / allActions.length * 100) : 0}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-navy">{completedCount}/{allActions.length}</span>
          </div>
        </div>
      </div>

      {/* ROI callout */}
      <div className="mb-6 bg-navy/5 border border-navy/15 rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          <DollarSign size={18} className="text-navy mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-navy">Making the case to an employer?</div>
            <div className="text-xs text-gray-500 mt-0.5">
              The ROI Calculator translates the Talent Sourcing and Job Placement actions below into a projected dollar figure — useful when working with employers on JTM adoption.
            </div>
          </div>
        </div>
        <Link
          to="/roi"
          className="inline-flex items-center gap-1.5 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg no-underline hover:bg-navy-dark transition-colors whitespace-nowrap shrink-0"
        >
          Open ROI Calculator <ArrowRight size={13} />
        </Link>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TOOLKIT_SECTIONS.map(s => {
          const Icon = SECTION_ICONS[s.icon]
          const prog = sectionProgress(s.id)
          const isActive = activeTab === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                isActive ? 'text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              style={isActive ? { backgroundColor: s.color } : {}}
            >
              {Icon && <Icon size={16} />}
              {s.title}
              {prog > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {prog}%
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Section header */}
      <div className="mb-4">
        <h2 className="font-display font-semibold text-lg text-navy">{currentSection.title}</h2>
        <p className="text-sm text-gray-500">{currentSection.subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">Primary audience: {currentSection.primaryAudience}</p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {currentSection.actions.map(action => (
          <ActionCard
            key={action.id}
            action={action}
            isChecked={!!progress[action.id]}
            onToggle={toggle}
            sectionColor={currentSection.color}
          />
        ))}
      </div>
    </div>
  )
}
