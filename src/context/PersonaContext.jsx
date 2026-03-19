import { createContext, useContext, useState, useCallback } from 'react'
import { PERSONAS } from '../data/personas'

const PersonaContext = createContext(null)

export function PersonaProvider({ children }) {
  const [personaId, setPersonaId] = useState(
    () => localStorage.getItem('jtm-persona') || null
  )

  const setPersona = useCallback((id) => {
    setPersonaId(id)
    if (id) {
      localStorage.setItem('jtm-persona', id)
    } else {
      localStorage.removeItem('jtm-persona')
    }
  }, [])

  const persona = PERSONAS.find(p => p.id === personaId) || null

  return (
    <PersonaContext.Provider value={{ persona, personaId, setPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  const ctx = useContext(PersonaContext)
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider')
  return ctx
}
