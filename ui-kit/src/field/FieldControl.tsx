import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { type ChangeEvent, forwardRef, useCallback, useEffect, useRef } from 'react'
import { useFieldContext } from './FieldContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldControlProps extends useRender.ComponentProps<'input'> {
  rounded?: boolean
  debounce?: number
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldControl = forwardRef<HTMLInputElement, FieldControlProps>(
  ({ className, render, rounded, debounce, onChange, ...props }, ref) => {
    const { id, name } = useFieldContext()
    const timeoutRef = useRef<NodeJS.Timeout>(undefined)

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (debounce) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => onChange?.(e), debounce)
        } else {
          onChange?.(e)
        }
      },
      [onChange, debounce]
    )

    const defaultProps = {
      id,
      name,
      className: clsx('field-control', { 'rounded-full': rounded }, className),
      onChange: debounce ? handleChange : onChange,
    }

    return useRender({
      defaultTagName: 'input',
      ref,
      props: { ...defaultProps, ...props },
      render,
    })
  }
)
