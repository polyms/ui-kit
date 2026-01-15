import clsx from 'clsx'
import React, {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useCallback,
  useId,
  useRef,
} from 'react'
import { FieldDescription } from './FieldDescription'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type FieldFloatingProps = {
  label?: ReactNode
  debounce?: number
  placeholder?: ReactNode
  className?: string
  children?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldFloating: React.FC<FieldFloatingProps> = ({
  onChange,
  debounce = 500,
  className,
  label,
  children,
  placeholder,
  ...props
}) => {
  const autoId = useId()
  const id = props.id ?? autoId
  const timeout = useRef<NodeJS.Timeout>(undefined)

  React.useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (debounce) {
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => onChange?.(e), debounce)
      } else {
        onChange?.(e)
      }
    },
    [onChange, debounce]
  )

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <div className='field-floating'>
        <input {...props} id={id} onChange={handleChange} placeholder=' ' />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
      <FieldDescription>{placeholder}</FieldDescription>
      {children}
    </div>
  )
}
