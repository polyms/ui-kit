import { Popover } from '@polyms/core-ui'
import clsx from 'clsx'
import { type ReactNode, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type DockAction =
  | {
      type: 'button'
      id: string
      icon: ReactNode
      label: string
      onClick: () => void
      active?: boolean
    }
  | {
      type: 'popover'
      id: string
      icon: ReactNode
      label: string
      render: (close: () => void) => ReactNode
    }
  | { type: 'divider'; id: string }

type FloatingDockProps = {
  actions: DockAction[]
  'aria-label'?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function DockPopoverAction({
  icon,
  label,
  render,
}: {
  icon: ReactNode
  label: string
  render: (close: () => void) => ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <Popover.Trigger
        aria-label={label}
        className={clsx('floating-dock-item', open && 'is-active')}
        type='button'
      >
        {icon}
      </Popover.Trigger>
      <Popover.Content align='end' className='floating-dock-popover p-2' side='top'>
        {render(() => setOpen(false))}
      </Popover.Content>
    </Popover>
  )
}

export function FloatingDock({ actions, 'aria-label': ariaLabel = 'Quick navigation' }: FloatingDockProps) {
  return (
    <div aria-label={ariaLabel} className='floating-dock' role='toolbar'>
      {actions.map(action => {
        if (action.type === 'divider') {
          return <span aria-hidden className='floating-dock-divider' key={action.id} />
        }

        if (action.type === 'popover') {
          return (
            <DockPopoverAction
              icon={action.icon}
              key={action.id}
              label={action.label}
              render={action.render}
            />
          )
        }

        return (
          <button
            aria-label={action.label}
            className={clsx('floating-dock-item', action.active && 'is-active')}
            key={action.id}
            onClick={action.onClick}
            type='button'
          >
            {action.icon}
          </button>
        )
      })}
    </div>
  )
}
