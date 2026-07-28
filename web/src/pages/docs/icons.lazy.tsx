import type { IconComponent, IconProps } from '@polyms/icons/bold-duotone'
import * as BoldDuotone from '@polyms/icons/bold-duotone'
import { Field, Select, Toast } from '@polyms/ui-kit'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'

export const Route = createLazyFileRoute('/docs/icons')({
  component: IconsPage,
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type IconStyleId = 'bold-duotone'

type IconEntry = {
  icon: IconComponent
  name: string
}

type IconStyle = {
  id: IconStyleId
  label: string
  packageEntry: string
  entries: IconEntry[]
}

type GalleryControls = {
  color: string
  secondaryColor: string
  secondaryOpacity: number
  size: number
  strokeWidth: number
}

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const STORE_EXPORTS = new Set(['setIconDefaults', 'resetIconDefaults', 'useIconStore'])

function catalogToEntries(catalog: Record<string, unknown>): IconEntry[] {
  return Object.entries(catalog)
    .filter((entry): entry is [string, IconComponent] => {
      const [name, value] = entry
      return !STORE_EXPORTS.has(name) && typeof value === 'function'
    })
    .map(([name, icon]) => ({ name, icon }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** Registry of icon styles — add new packages here as they ship. */
const ICON_STYLES: IconStyle[] = [
  {
    id: 'bold-duotone',
    label: 'Bold Duotone',
    packageEntry: '@polyms/icons/bold-duotone',
    entries: catalogToEntries(BoldDuotone as Record<string, unknown>),
  },
]

const STYLE_ITEMS = ICON_STYLES.map(style => ({ label: style.label, value: style.id }))

const DEFAULT_CONTROLS: GalleryControls = {
  color: 'currentColor',
  secondaryColor: 'currentColor',
  secondaryOpacity: 0.3,
  size: 64,
  strokeWidth: 1.5,
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function IconsPage() {
  const [styleId, setStyleId] = useState<IconStyleId>('bold-duotone')
  const [query, setQuery] = useState('')
  const [controls, setControls] = useState(DEFAULT_CONTROLS)
  const toastManager = Toast.useToastManager()

  const style = ICON_STYLES.find(item => item.id === styleId) ?? ICON_STYLES[0]!

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return style.entries
    return style.entries.filter(entry => entry.name.toLowerCase().includes(q))
  }, [query, style])

  const copyImport = (name: string) => {
    const snippet = `import { ${name} } from '${style.packageEntry}'`
    void navigator.clipboard.writeText(name).then(() => {
      toastManager.add({
        title: 'Import copied',
        description: snippet,
        type: 'success',
        timeout: 2000,
      })
    })
  }

  return (
    <div className='docs-page flex min-w-0 flex-row px-4 pt-6 pb-8 sm:px-6 sm:pt-8 lg:px-8 lg:pt-0'>
      <div className='docs min-w-0 flex-1'>
        <h1 className='h1'>Icons</h1>
        <p className='text-muted'>
          Search and preview glyphs. Click a tile to copy the import. For install and API details, see{' '}
          <Link className='link' to='/installation'>
            Installation
          </Link>
          .
        </p>

        <div className='sticky top-0 z-10 -mx-4 mt-6 space-y-4 border-line border-b bg-body/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-xl lg:border lg:px-4'>
          <div className='flex flex-wrap items-end gap-3'>
            <Field className='w-48 shrink-0'>
              <Field.Label>Style</Field.Label>
              <Select
                items={STYLE_ITEMS}
                onValueChange={value => {
                  if (typeof value === 'string') setStyleId(value as IconStyleId)
                }}
                value={styleId}
              >
                <Select.Trigger className='w-full rounded-full' placeholder='Select style…' />
                <Select.Content>
                  {STYLE_ITEMS.map(item => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </Field>

            <Field className='min-w-56 flex-1'>
              <Field.Label>Filter by name</Field.Label>
              <Field.Control
                onChange={event => setQuery(event.target.value)}
                placeholder='AddCircle, Home, …'
                rounded
                value={query}
              />
            </Field>
            <p className='pb-2 text-muted text-sm tabular-nums'>
              {filtered.length} of {style.entries.length}
            </p>
          </div>

          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            <ColorField
              label='Color'
              onChange={color => setControls(prev => ({ ...prev, color }))}
              value={controls.color}
            />
            <ColorField
              label='Secondary color'
              onChange={secondaryColor => setControls(prev => ({ ...prev, secondaryColor }))}
              value={controls.secondaryColor}
            />
            <RangeField
              label='Secondary opacity'
              max={1}
              min={0}
              onChange={secondaryOpacity => setControls(prev => ({ ...prev, secondaryOpacity }))}
              step={0.05}
              value={controls.secondaryOpacity}
            />
            <RangeField
              label='Stroke width'
              max={3}
              min={0.5}
              onChange={strokeWidth => setControls(prev => ({ ...prev, strokeWidth }))}
              step={0.25}
              value={controls.strokeWidth}
            />
            <RangeField
              label='Size'
              max={96}
              min={16}
              onChange={size => setControls(prev => ({ ...prev, size }))}
              step={1}
              value={controls.size}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className='mt-8 text-muted text-sm'>No icons match “{query.trim()}”.</p>
        ) : (
          <ul className='mt-6 grid list-none grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-2 p-0'>
            {filtered.map(entry => (
              <IconTile
                controls={controls}
                entry={entry}
                key={`${style.id}:${entry.name}`}
                onCopy={() => copyImport(entry.name)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ColorField({
  label,
  onChange,
  value,
}: {
  label: string
  onChange: (value: string) => void
  value: string
}) {
  const hex = toHexColor(value)

  return (
    <Field>
      <Field.Label>{label}</Field.Label>
      <BoldDuotone.PaletteRound
        aria-hidden
        className='icon-start pointer-events-none'
        style={{ color: hex }}
      />
      <input
        aria-label={`${label} picker`}
        className='icon-start cursor-pointer'
        onChange={event => onChange(event.target.value)}
        style={{ width: '1.25rem', height: '1.25rem', opacity: 0, zIndex: 2 }}
        type='color'
        value={hex}
      />
      <Field.Control onChange={event => onChange(event.target.value)} rounded value={value} />
    </Field>
  )
}

function RangeField({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  step: number
  value: number
}) {
  const display = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')

  return (
    <Field>
      <Field.Label>
        {label} <span className='font-normal text-muted tabular-nums'>({display})</span>
      </Field.Label>
      <input
        aria-label={label}
        className='h-10 w-full accent-primary'
        max={max}
        min={min}
        onChange={event => onChange(Number(event.target.value))}
        step={step}
        type='range'
        value={value}
      />
    </Field>
  )
}

function IconTile({
  controls,
  entry,
  onCopy,
}: {
  controls: GalleryControls
  entry: IconEntry
  onCopy: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([item]) => {
        if (item?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const iconProps: IconProps = {
    color: controls.color,
    secondaryColor: controls.secondaryColor,
    secondaryOpacity: controls.secondaryOpacity,
    size: controls.size,
    strokeWidth: controls.strokeWidth,
  }
  const Icon = entry.icon

  return (
    <li className='list-none' ref={ref}>
      <button
        className={clsx(
          'item-light flex h-full w-full flex-col items-center gap-2 rounded-xl px-2 py-3 text-center',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
        )}
        onClick={onCopy}
        type='button'
      >
        <span
          className='flex items-center justify-center text-fg'
          style={{ height: controls.size, minHeight: controls.size }}
        >
          {visible ? (
            <Icon {...iconProps} />
          ) : (
            <span
              aria-hidden
              className='rounded bg-slate-200/80'
              style={{ height: controls.size, width: controls.size }}
            />
          )}
        </span>
        <span className='w-full truncate font-medium text-[11px] text-muted leading-tight'>{entry.name}</span>
      </button>
    </li>
  )
}

function toHexColor(value: string) {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [, r, g, b] = value
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return '#0f172a'
}
