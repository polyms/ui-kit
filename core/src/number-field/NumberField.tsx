import { NumberField as Base } from '@base-ui/react/number-field'
import clsx from 'clsx'
import { useId } from 'react'

import type { FieldRootProps } from '../field/FieldRoot'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type NumberFieldProps = Base.Root.Props & {
  label?: string
  size?: FieldRootProps['size']
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const NumberField = ({ id: propId, className, label, size, ...props }: NumberFieldProps) => {
  const genId = useId()
  const id = propId ?? genId

  return (
    <Base.Root
      {...props}
      className={clsx('number-field field', className, {
        [`field-${size}`]: size,
      })}
      id={id}
    >
      {label && (
        <Base.ScrubArea className='number-field-scrub-area field-label'>
          <label className='number-field-label' htmlFor={id}>
            {label}
          </label>
          <Base.ScrubAreaCursor className='number-field-scrub-area-cursor'>
            <CursorGrowIcon />
          </Base.ScrubAreaCursor>
        </Base.ScrubArea>
      )}

      <Base.Group className='number-field-group'>
        <Base.Input className='number-field-input field-control' />
        <Base.Decrement className='number-field-decrement'>
          <MinusIcon />
        </Base.Decrement>
        <Base.Increment className='number-field-increment'>
          <PlusIcon />
        </Base.Increment>
      </Base.Group>
    </Base.Root>
  )
}

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill='black'
      height='14'
      stroke='white'
      viewBox='0 0 24 14'
      width='26'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
    </svg>
  )
}

const MinusIcon = () => (
  <svg fill='none' height='18' viewBox='0 0 18 18' width='18' xmlns='http://www.w3.org/2000/svg'>
    <path
      clipRule='evenodd'
      d='M15.5 8.99805C15.5 9.55035 15.1642 9.99805 14.75 9.99805H4.25C3.83579 9.99805 3.5 9.55035 3.5 8.99805C3.5 8.44575 3.83579 7.99805 4.25 7.99805H14.75C15.1642 7.99805 15.5 8.44575 15.5 8.99805Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
)

const PlusIcon = () => (
  <svg fill='none' height='18' viewBox='0 0 18 18' width='18' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.49929 15.4673C9.01379 15.4673 8.62039 15.0739 8.62039 14.5884V3.41016C8.62039 2.92465 9.01379 2.53125 9.49929 2.53125C9.9848 2.53125 10.3782 2.92465 10.3782 3.41016V14.5884C10.3782 15.0739 9.9848 15.4673 9.49929 15.4673Z'
      fill='currentColor'
    />
    <path
      d='M15.0884 9.8782H3.91016C3.42465 9.8782 3.03125 9.4848 3.03125 8.99929C3.03125 8.51379 3.42465 8.12039 3.91016 8.12039H15.0884C15.5739 8.12039 15.9673 8.51379 15.9673 8.99929C15.9673 9.4848 15.5739 9.8782 15.0884 9.8782Z'
      fill='currentColor'
    />
  </svg>
)
