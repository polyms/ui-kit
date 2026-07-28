import {
  type CSSProperties,
  createElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SVGProps,
} from 'react'

import { useIconStore } from './icon-store'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

/** Serialised SVG child: `[tag, props, children?]` — produced from `svg/` by the icons Vite plugin. */
export type IconNode = [
  tag: string,
  props: Record<string, string | Record<string, string>>,
  children?: IconNode[],
]

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  color?: string
  ref?: Ref<SVGSVGElement>
  secondaryColor?: string
  secondaryOpacity?: number
  size?: number | string
  strokeWidth?: number | string
}

export type IconComponent = (props: IconProps) => ReactElement

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function renderNodes(nodes: IconNode[]): ReactNode[] {
  return nodes.map(([tag, props, children], index) =>
    createElement(
      tag,
      { key: index, ...props } as SVGProps<SVGElement>,
      children ? renderNodes(children) : undefined
    )
  )
}

/**
 * Factory shared by every glyph module. Decorative by default (`aria-hidden` + `focusable="false"`,
 * no `alt`/`title` API) — standalone a11y is the parent control's job (skill `ui-kit`).
 * Size/color/stroke/secondary fall back to the Zustand icon store when omitted; explicit props win.
 *
 * Duotone secondary layers carry `style` bound to `--icon-secondary-color` /
 * `--icon-secondary-opacity`, which this factory sets from the resolved props.
 */
export function createIcon(displayName: string, nodes: IconNode[]): IconComponent {
  const children = renderNodes(nodes)

  function Icon({
    color,
    ref,
    secondaryColor,
    secondaryOpacity,
    size,
    strokeWidth,
    style,
    ...props
  }: IconProps) {
    const defaults = useIconStore(state => state.defaults)
    const resolvedSize = size ?? defaults.size
    const resolvedColor = color ?? defaults.color
    const resolvedStrokeWidth = strokeWidth ?? defaults.strokeWidth
    const resolvedSecondaryColor = secondaryColor ?? defaults.secondaryColor
    const resolvedSecondaryOpacity = secondaryOpacity ?? defaults.secondaryOpacity

    const mergedStyle = {
      ...(resolvedColor.trim().toLowerCase() === 'currentcolor' ? {} : { color: resolvedColor }),
      '--icon-secondary-color': resolvedSecondaryColor,
      '--icon-secondary-opacity': String(resolvedSecondaryOpacity),
      ...style,
    } as CSSProperties

    return (
      <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height={resolvedSize}
        ref={ref}
        strokeWidth={resolvedStrokeWidth}
        style={mergedStyle}
        viewBox='0 0 24 24'
        width={resolvedSize}
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {children}
      </svg>
    )
  }

  Icon.displayName = displayName
  return Icon
}
