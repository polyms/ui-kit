import clsx from 'clsx'
import type React from 'react'
import { cloneElement, forwardRef, type MouseEventHandler, type SVGProps, useId } from 'react'

import { ValidationTooltip } from './ValidationTooltip'

export const FieldRoot = forwardRef<HTMLInputElement, FieldRootProps>(
  (
    {
      variant,
      label,
      helpText,
      rounded,
      size,
      children,
      className,
      iconStart: IconStart,
      onClickIconStart,
      iconEnd: IconEnd,
      onClickIconEnd,
      id: propId,
      invalid,
      invalidFeedback: errorText,
      required,
      ...rest
    },
    ref
  ) => {
    const genId = useId()
    const id = propId ?? genId

    return (
      <div
        className={clsx('field', className, {
          'addon-start': !!IconStart,
          'addon-end': !!IconEnd,
          invalid,
          [`field-${size}`]: size,
          [`field-${variant}`]: variant,
          required,
        })}
        contentEditable={false}
      >
        {label && (
          <label htmlFor={id} className='field-label'>
            {label}
          </label>
        )}
        {IconStart &&
          (typeof IconStart === 'function' ? (
            <IconStart width={18} height={18} className='icon-start' onClick={onClickIconStart} />
          ) : (
            cloneElement(IconStart as React.ReactElement<SVGProps<SVGSVGElement>>, {
              width: 18,
              height: 18,
              className: 'icon-start',
              onClick: onClickIconStart,
            })
          ))}
        <ValidationTooltip {...rest} invalidFeedback={invalid ? errorText : null} ref={ref}>
          <input
            type='text'
            id={id}
            className={clsx('field-input', {
              'rounded-full': rounded,
            })}
          />
        </ValidationTooltip>
        {IconEnd &&
          (typeof IconEnd === 'function' ? (
            <IconEnd width={18} height={18} className='icon-end' onClick={onClickIconEnd} />
          ) : (
            cloneElement(IconEnd as React.ReactElement<SVGProps<SVGSVGElement>>, {
              width: 18,
              height: 18,
              className: 'icon-end',
              onClick: onClickIconEnd,
            })
          ))}
        {helpText && <div className='field-help-text'>{helpText}</div>}
        {children}
      </div>
    )
  }
)

// ======================================================================================

export type FieldRootProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  variant?: string
  label?: string
  helpText?: string
  isMobile?: boolean
  rounded?: boolean
  size?: 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
  iconStart?: SVGComponent | React.ReactNode
  onClickIconStart?: MouseEventHandler<SVGSVGElement>
  iconEnd?: SVGComponent | React.ReactNode
  onClickIconEnd?: MouseEventHandler<SVGSVGElement>
  invalid?: boolean
  invalidFeedback?: string
  defaultShowOnError?: boolean
}
