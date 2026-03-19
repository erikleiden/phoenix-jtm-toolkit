import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersona } from '../context/PersonaContext'
import { ASSESSMENT } from '../data/assessmentQuestions'
import { TOOLKIT_SECTIONS } from '../data/toolkit'
import { PERSONAS } from '../data/personas'
import { Building2, Compass, GraduationCap, User, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react'

const ICON_MAP = { Building2, Compass, GraduationCap, User }

function getAllActions() {
  const map = {}
  TOOLKIT_SECTIONS.forEach(s => {
    s.actions.forEach(a => {
      map[a.id] = { ...a, sectionTitle: s.title, sectionColor: s.color }
    })
  })
  return map
}

export default function AssessmentPage() {
  const { persona, setPersona } = usePersona()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  // Persona selection if none
  if (!persona) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-display font-bold text-navy mb-3">Quick Start Assessment</h1>
        <p className="text-gray-600 mb-8">Select your role to get personalized recommendations in 90 seconds.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {PERSONAS.map(p => {
            const Icon = ICON_MAP[p.icon]
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className="card-hover bg-white rounded-xl p-4 flex items-center gap-3 cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: p.lightBg }}>
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <span className="font-semibold text-sm" style={{ color: p.color }}>{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const questions = ASSESSMENT[persona.id] || []
  const currentQ = questions[step]
  const actionMap = getAllActions()

  const handleAnswer = (optionValue, weights) => {
    const newAnswers = { ...answers, [currentQ.id]: { value: optionValue, weights } }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const results = useMemo(() => {
    if (!showResults) return []
    const scores = {}
    Object.values(answers).forEach(a => {
      if (a.weights) {
        Object.entries(a.weights).forEach(([actionId, weight]) => {
          scores[actionId] = (scores[actionId] || 0) + weight
        })
      }
    })
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => ({ ...actionMap[id], score }))
      .filter(r => r.title)
  }, [showResults, answers])

  const topResults = results.slice(0, 3)
  const alsoConsider = results.slice(3, 6)

  const restart = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-navy mb-2">Your Quick Wins</h1>
          <p className="text-gray-600">Based on your answers, here are the highest-impact actions to start with.</p>
        </div>

        {/* Top 3 */}
        <div className="space-y-3 mb-8">
          {topResults.map((r, i) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4" style={{ borderLeftColor: r.sectionColor }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">{r.sectionTitle}</div>
                  <h3 className="font-semibold text-navy mb-1">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {alsoConsider.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display font-semibold text-navy text-sm mb-3">Also Consider</h3>
            <div className="space-y-2">
              {alsoConsider.map(r => (
                <div key={r.id} className="bg-white rounded-lg p-3 flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.sectionColor }} />
                  <span className="text-gray-400 text-xs">{r.sectionTitle}:</span>
                  <span className="text-gray-700">{r.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate('/playbook')}
            className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-navy-light transition-colors flex items-center gap-2"
          >
            Go to Your Playbook <ArrowRight size={16} />
          </button>
          <button
            onClick={restart}
            className="bg-white text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={14} /> Retake
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-display font-bold text-navy mb-1">Quick Start Assessment</h1>
        <p className="text-gray-500 text-sm">90 seconds to your first step</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 justify-center my-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-orange w-8' : 'bg-gray-200 w-4'
            }`}
          />
        ))}
      </div>

      <div className="text-xs text-gray-400 text-center mb-6">
        Question {step + 1} of {questions.length}
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <h2 className="font-display font-semibold text-navy text-lg mb-6 text-center">
          {currentQ.question}
        </h2>
        <div className="space-y-3">
          {currentQ.options.map(opt => {
            const isSelected = answers[currentQ.id]?.value === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value, opt.weights)}
                className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-orange bg-orange/5'
                    : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium text-gray-700">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer mx-auto block"
        >
          &larr; Previous question
        </button>
      )}
    </div>
  )
}
