import { createContext, type PropsWithChildren, useContext, useMemo } from 'react'
import type { RadioSize, RadioVariant } from './Radio'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  size?: RadioSize
  variant?: RadioVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

export function RadioProvider({ children, size, variant }: PropsWithChildren<RadioGroupContextValue>) {
  const value = useMemo(() => ({ size, variant }), [size, variant])

  return <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>
}

export function useRadioGroupContext() {
  return useContext(RadioGroupContext)
}
