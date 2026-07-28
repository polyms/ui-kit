import { Button, Toast } from '@polyms/ui-kit'
import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const positionToastManager = Toast.createToastManager()

const POSITIONS: {
  label: string
  value: ToastPosition
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'dark'
}[] = [
  { label: 'Top Left', value: 'top-left', variant: 'primary' },
  { label: 'Top Center', value: 'top-center', variant: 'primary' },
  { label: 'Top Right', value: 'top-right', variant: 'success' },
  { label: 'Bottom Left', value: 'bottom-left', variant: 'warning' },
  { label: 'Bottom Center', value: 'bottom-center', variant: 'dark' },
  { label: 'Bottom Right', value: 'bottom-right', variant: 'danger' },
]

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const ToastPositionDemo = () => {
  const [position, setPosition] = useState<ToastPosition>('bottom-right')

  return (
    <Toast toastManager={positionToastManager}>
      <ToastPositionButtons onSelect={setPosition} position={position} />
      <Toast.Container id='toast-position-demo' position={position} />
    </Toast>
  )
}

const ToastPositionButtons = ({
  position,
  onSelect,
}: {
  position: ToastPosition
  onSelect: (position: ToastPosition) => void
}) => {
  const toastManager = Toast.useToastManager()

  return (
    <div className='m-auto grid max-w-2xl gap-4'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {POSITIONS.map(item => (
          <Button
            key={item.value}
            onClick={() => {
              onSelect(item.value)
              toastManager.add({
                title: `Toast at ${item.label}`,
                description: `Mounted with position="${item.value}" on Toast.Container.`,
                type: 'info',
              })
            }}
            outlined
            rounded
            size='xl'
            variant={item.variant}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <p className='text-center text-muted text-sm'>
        Current position: <strong>{position}</strong>
      </p>
    </div>
  )
}

export default ToastPositionDemo
