import {
  autoUpdate,
  flip,
  offset,
  type UseFloatingReturn,
  type UseInteractionsReturn,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { useEffect, useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────────────

export type ValidationContextType = UseInteractionsReturn & {
  isOpen: boolean
  refs: UseFloatingReturn['refs']
  floatingStyles: UseFloatingReturn['floatingStyles']
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────

export const useValidation = ({ controlId }: { controlId?: string } = {}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-end',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 5 }),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
    ],
  })

  // Auto-attach to control element via id
  useEffect(() => {
    if (controlId) {
      const element = document.getElementById(controlId)
      if (element) {
        refs.setReference(element)
      }
    }
  }, [controlId, refs.setReference])

  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const hover = useHover(context)
  const click = useClick(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([focus, dismiss, role, click, hover])

  return {
    refs,
    floatingStyles,
    isOpen,
    ...interactions,
  } as ValidationContextType
}
