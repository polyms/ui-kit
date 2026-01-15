import { createContext, type PropsWithChildren, useContext, useId, useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

interface FieldContextValue {
  id?: string
  name?: string
  required?: boolean
  invalid?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldContext = createContext<FieldContextValue | undefined>(undefined)

export const FieldProvider = ({
  id: propId,
  name,
  required,
  invalid,
  children,
}: PropsWithChildren<FieldContextValue>) => {
  const genId = useId()
  const id = propId ?? genId

  const value = useMemo(() => ({ id, name: name ?? id, required, invalid }), [id, name, required, invalid])

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}

export const useFieldContext = () => {
  const context = useContext(FieldContext)
  if (!context) {
    throw new Error('useFieldContext must be used within FieldContext.Provider')
  }
  return context
}
