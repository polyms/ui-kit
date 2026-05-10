import clsx from 'clsx'
import type { FC, HTMLProps, ReactNode } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type MenuCommandProps = Omit<HTMLProps<HTMLSpanElement>, 'children'> & {
  meta?: boolean
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  /** Key caps after modifiers; use `+` between simultaneous keys (e.g. `"L+I"`). */
  sequence?: string
  children?: ReactNode
}

export const MenuCommand: FC<MenuCommandProps> = ({
  className,
  meta: metaKey,
  ctrl,
  alt,
  shift,
  sequence,
  children,
  ...props
}) => {
  if (children != null) {
    return (
      <span {...props} className={clsx('menu-command', className)}>
        {children}
      </span>
    )
  }

  const segments: ReactNode[] = []

  if (ctrl) {
    segments.push(
      <abbr key='ctrl' title='Control'>
        ⌃
      </abbr>
    )
  }
  if (alt) {
    segments.push(
      <abbr key='alt' title='Option'>
        ⌥
      </abbr>
    )
  }
  if (shift) {
    segments.push(
      <abbr key='shift' title='Shift'>
        ⇧
      </abbr>
    )
  }
  if (metaKey) {
    segments.push(
      <abbr key='meta' title='Command'>
        ⌘
      </abbr>
    )
  }

  const caps =
    sequence
      ?.split('+')
      .map(part => part.trim())
      .filter(Boolean) ?? []

  for (let i = 0; i < caps.length; i++) {
    if (i > 0) {
      segments.push(
        <span aria-hidden className='menu-command-sep' key={`sep-${i}`}>
          +
        </span>
      )
    }
    segments.push(
      <span className='menu-command-key' key={`cap-${i}`}>
        {caps[i]}
      </span>
    )
  }

  if (segments.length === 0) {
    return null
  }

  return (
    <span {...props} className={clsx('menu-command', className)}>
      {segments}
    </span>
  )
}
