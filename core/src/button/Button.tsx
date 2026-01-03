import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

const contentMap = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
}

const variantMap = {
  primary: 'btn-primary',
  success: 'btn-success',
  light: 'btn-light',
  dark: 'btn-dark',
  danger: 'btn-danger',
  link: 'btn-link',
  'link-danger': 'btn-link-danger',
}

export const Button: FC<ButtonProps> = ({
  className,
  size,
  variant,
  outlined,
  rounded,
  icon,
  active,
  content = 'center',
  render,
  ...props
}) => {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] = render ? undefined : 'button'

  const defaultProps = {
    className: clsx(
      className,
      'btn',
      variant ? variantMap[variant] : 'btn-ghost',
      content && contentMap[content],
      {
        outlined,
        'rounded-full': rounded,
        'btn-icon': icon,
        active,
        [`btn-${size}`]: size,
      }
    ),
    'data-slot': 'button',
    type: typeValue,
  }
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(defaultProps, props),
    render,
  })
  // return (
  //   <button
  //     type='button'
  //     {...props}
  //     className={clsx(
  //       props.className,
  //       'btn',
  //       variant ? variantMap[variant] : 'btn-ghost',
  //       content && contentMap[content],
  //       {
  //         outlined,
  //         'rounded-full': rounded,
  //         icon,
  //         active,
  //         [`btn-${size}`]: size,
  //       }
  //     )}
  //     ref={ref}
  //   />
  // )
}

// ======================================================================================
export interface ButtonProps extends useRender.ComponentProps<'button'> {
  size?: ButtonSize
  variant?: ButtonVariant
  outlined?: boolean
  rounded?: boolean
  icon?: boolean
  active?: boolean
  content?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
export type ButtonVariant = 'primary' | 'success' | 'light' | 'dark' | 'danger' | 'link' | 'link-danger'
