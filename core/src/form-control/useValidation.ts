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
import { useState } from 'react'

export const useValidation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-end',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 5 }),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
    ],
  })

  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const hover = useHover(context)
  const click = useClick(context)
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([focus, dismiss, role, click, hover])

  return {
    refs,
    floatingStyles,
    isOpen,
    ...interactions,
  } as ValidationContextType
}

// ======================================================================================

export type ValidationContextType = UseInteractionsReturn & {
  isOpen: boolean
  refs: UseFloatingReturn['refs']
  floatingStyles: UseFloatingReturn['floatingStyles']
}
