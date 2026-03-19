import { useState, useMemo } from 'react'
import { RESOURCES, RESOURCE_TYPES } from '../data/resources'
import { PERSONAS } from '../data/personas'
import { ExternalLink, Search, Star } from 'lucide-react'

export default function ResourcePage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState(null)
  const [personaFilter, setPersonaFilter] = useState(null)

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter && r.type !== typeFilter) return false
      if (personaFilter && !r.personas.includes(personaFilter)) return false
      return true
    }).sort((a, b) => (b.keyPartner ? 1 : 0) - (a.keyPartner ? 1 : 0))
  }, [search, typeFilter, personaFilter])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-display font-bold text-navy mb-2">Resource Hub</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Phoenix-specific resources, programs, and partners for activating JTM pathways. Every tool mentioned in the toolkit, one click away.
      </p>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-warm-gray border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange/30"
            />
          </div>
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            onClick={() => setTypeFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${!typeFilter ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Types
          </button>
          {RESOURCE_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? null : t)}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${typeFilter === t ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Persona filters */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <button
            onClick={() => setPersonaFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${!personaFilter ? 'bg-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Roles
          </button>
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => setPersonaFilter(personaFilter === p.id ? null : p.id)}
              className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors"
              style={personaFilter === p.id
                ? { backgroundColor: p.color, color: 'white' }
                : { backgroundColor: '#f3f4f6', color: '#4b5563' }
              }
            >
              {p.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-xs text-gray-500 mb-3">{filtered.length} resources</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="card-hover bg-white rounded-xl shadow-sm p-5 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-navy text-sm flex items-center gap-1.5">
                {r.keyPartner && <Star size={12} className="text-orange fill-orange" />}
                {r.name}
              </h3>
              <span className="text-xs bg-warm-gray-dark text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                {r.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 flex-1 mb-4">{r.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {r.personas.map(pid => {
                const p = PERSONAS.find(x => x.id === pid)
                return p ? (
                  <span
                    key={pid}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: p.color + '18', color: p.color }}
                  >
                    {p.shortLabel}
                  </span>
                ) : null
              })}
            </div>
            {r.url && (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-orange font-medium hover:text-orange-dark no-underline mt-auto"
              >
                Visit site <ExternalLink size={10} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
