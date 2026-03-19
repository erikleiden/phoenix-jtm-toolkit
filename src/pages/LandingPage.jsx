import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, BookOpen, Target, Building2, Search, Briefcase, BadgeCheck, DollarSign, Map, Database } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

function StatCard({ value, suffix, label, delay }) {
  const { count, ref } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl p-6 border-l-4 border-orange shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl font-display font-bold text-navy">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy to-navy-light text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            {Array.from({ length: 30 }, (_, i) => (
              <circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={Math.random() * 3 + 1}
                fill="white"
                opacity={Math.random() * 0.5 + 0.2}
              />
            ))}
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 leading-tight">
            Phoenix Jobs That Mobilize
          </h1>
          <p className="text-xl text-white/80 mb-3 max-w-2xl mx-auto">
            A practitioner toolkit for connecting workers to JTM occupations — roles the Burning Glass Institute has identified as high-value on-ramps to economic mobility in the Phoenix region.
          </p>
          <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
            Not every job mobilizes workers. The JTM Framework scores occupations on four dimensions to find the ones that genuinely do — and this toolkit helps employers, navigators, and training providers act on that analysis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#personas" className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors no-underline flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </a>
            <Link to="/framework" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors no-underline">
              Explore the Framework
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={700} suffix="K+" label="Arizonans with some college but no credential — a primary JTM talent pool" delay={0} />
          <StatCard value={14} suffix="%" label="Average wage gain when workers move into a JTM occupation" delay={150} />
          <StatCard value={39} suffix="M" label="U.S. workers whose existing skills already qualify them for higher-paying JTM occupations" delay={300} />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-display font-bold text-navy text-center mb-3">How BGI Identifies JTM Occupations</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          A job earns the "Jobs That Mobilize" designation by scoring well across all four dimensions — not just employer demand, and not just worker benefit.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Building2, title: 'Employers', desc: 'Strong demand, growth, and resilience to automation', color: '#1B2A4A' },
            { icon: Users, title: 'Workers', desc: 'Good wages, advancement pathways, and accessible entry', color: '#E0732B' },
            { icon: Target, title: 'Equity', desc: 'Pay parity and proportional representation across groups', color: '#2D6A4F' },
            { icon: TrendingUp, title: 'Strategy', desc: 'Skills that transfer across multiple industries and regions', color: '#7C3AED' },
          ].map(p => (
            <div key={p.title} className="bg-white rounded-xl p-5 text-center shadow-sm">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: p.color + '15' }}
              >
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <h3 className="font-display font-semibold text-navy text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Toolkit grid */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-display font-bold text-navy text-center mb-2">
          What's in this toolkit
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
          Five tools built around the JTM Framework — from understanding the analysis to taking action with employers and workers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              to: '/framework',
              icon: Target,
              color: '#1B2A4A',
              title: 'Framework Explorer',
              desc: 'Understand how BGI scores occupations across the four JTM dimensions and explore Phoenix\'s target roles.',
            },
            {
              to: '/playbook',
              icon: BookOpen,
              color: '#2D6A4F',
              title: 'Action Playbook',
              desc: 'Concrete steps across Talent Sourcing, Skills Development, Validating Skills, and Job Placement.',
              primary: true,
            },
            {
              to: '/pathways',
              icon: Map,
              color: '#E0732B',
              title: 'Skills Pathways',
              desc: 'See which feeder occupations feed into each JTM role and how large the skill gap actually is.',
            },
            {
              to: '/roi',
              icon: DollarSign,
              color: '#1B2A4A',
              title: 'ROI Calculator',
              desc: 'Quantify the business case for skills-based hiring — retention savings, productivity gains, and worker wage impact.',
            },
            {
              to: '/resources',
              icon: Database,
              color: '#7C3AED',
              title: 'Resource Hub',
              desc: 'Phoenix-specific tools, data sources, and partner organizations for each stage of JTM implementation.',
            },
          ].map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`card-hover bg-white rounded-xl p-5 no-underline flex flex-col gap-3 shadow-sm border-2 ${item.primary ? 'border-green' : 'border-transparent'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '15' }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="font-display font-semibold text-navy text-sm">{item.title}</div>
                  {item.primary && <span className="ml-auto text-xs bg-green/10 text-green font-semibold px-2 py-0.5 rounded-full">Start here</span>}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: item.color }}>
                  Open <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
