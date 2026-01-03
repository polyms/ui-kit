import {
  type UseFloatingReturn,
  type UseInteractionsReturn,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'
import React, { useEffect } from 'react'

export function useOffcanvas({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  dismissible,
  ignoreClickOutside,
}: OffcanvasOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
  const [labelId, setLabelId] = React.useState<string | undefined>()
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const nodeId = useFloatingNodeId('offcanvas')

  const data = useFloating({ nodeId, open, onOpenChange: setOpen })

  const context = data.context

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 350,
  })

  const outsidePress = (event: MouseEvent) => {
    const isDismiss = dismissible || window.innerWidth <= 1024
    try {
      let isIgnore = false
      if (ignoreClickOutside) {
        isIgnore = !!ignoreClickOutside?.find((ele: string) => (event.target as HTMLElement).closest(ele))
      }
      return isDismiss && !isIgnore
    } catch (error) {
      console.log('[Error] outsidePress', error)
      return isDismiss
    }
  }

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    referencePress: false,
    outsidePress,
  })
  const role = useRole(context, { role: 'dialog' })

  const interactions = useInteractions([click, dismiss, role])

  const closeOffCanvas = (e: Event) => {
    if (!(e as CustomEvent).detail) setOpen(false)
  }

  useEffect(() => {
    window.addEventListener('offcanvas:close:all', closeOffCanvas)
    return () => {
      window.removeEventListener('offcanvas:close:all', closeOffCanvas)
    }
  }, [])

  return React.useMemo<OffcanvasContextType>(
    () => ({
      nodeId,
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      isMounted,
      status,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId, isMounted, status]
  )
}

// ======================================================================================

export interface OffcanvasOptions {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  dismissible?: boolean
  ignoreClickOutside?: string[]
}

export type OffcanvasContextType = UseFloatingReturn &
  UseInteractionsReturn & {
    isMounted: boolean
    status: 'unmounted' | 'initial' | 'open' | 'close'
    nodeId?: string
    labelId?: string
    descriptionId?: string
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>
    open: boolean
    setOpen: (open: boolean) => void
  }
