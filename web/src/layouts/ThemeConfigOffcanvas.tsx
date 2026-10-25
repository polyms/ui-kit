import { Button, Offcanvas, Select } from '@polyms/ui-kit'
import { Moon, Sun } from '@solar-icons/react-perf/BoldDuotone'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../stores/app.store'
import {
  BRAND_ROLES,
  type BrandPalettes,
  type BrandRole,
  buildThemeSnippet,
  COLOR_STEPS,
  type ColorStep,
  hasPrimaryRamp,
  isDefaultBrand,
  PALETTES,
  type Palette,
  type PrimaryRamp,
  useBrandStore,
} from '../stores/brand.store'
import { normalizeHex, readCssColorAsHex } from '../stores/brand-ramp'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ThemeConfigOffcanvasProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const roleLabels: Record<BrandRole, string> = {
  primary: 'Primary',
  success: 'Success',
  info: 'Info',
  danger: 'Danger',
  warning: 'Warning',
}

const paletteItems = PALETTES.map(palette => ({
  label: palette.charAt(0).toUpperCase() + palette.slice(1),
  value: palette,
}))

const swatchClass: Record<BrandRole, Record<ColorStep, string>> = {
  primary: {
    50: 'bg-primary-50',
    100: 'bg-primary-100',
    200: 'bg-primary-200',
    300: 'bg-primary-300',
    400: 'bg-primary-400',
    500: 'bg-primary-500',
    600: 'bg-primary-600',
    700: 'bg-primary-700',
    800: 'bg-primary-800',
    900: 'bg-primary-900',
    950: 'bg-primary-950',
  },
  success: {
    50: 'bg-success-50',
    100: 'bg-success-100',
    200: 'bg-success-200',
    300: 'bg-success-300',
    400: 'bg-success-400',
    500: 'bg-success-500',
    600: 'bg-success-600',
    700: 'bg-success-700',
    800: 'bg-success-800',
    900: 'bg-success-900',
    950: 'bg-success-950',
  },
  info: {
    50: 'bg-info-50',
    100: 'bg-info-100',
    200: 'bg-info-200',
    300: 'bg-info-300',
    400: 'bg-info-400',
    500: 'bg-info-500',
    600: 'bg-info-600',
    700: 'bg-info-700',
    800: 'bg-info-800',
    900: 'bg-info-900',
    950: 'bg-info-950',
  },
  danger: {
    50: 'bg-danger-50',
    100: 'bg-danger-100',
    200: 'bg-danger-200',
    300: 'bg-danger-300',
    400: 'bg-danger-400',
    500: 'bg-danger-500',
    600: 'bg-danger-600',
    700: 'bg-danger-700',
    800: 'bg-danger-800',
    900: 'bg-danger-900',
    950: 'bg-danger-950',
  },
  warning: {
    50: 'bg-warning-50',
    100: 'bg-warning-100',
    200: 'bg-warning-200',
    300: 'bg-warning-300',
    400: 'bg-warning-400',
    500: 'bg-warning-500',
    600: 'bg-warning-600',
    700: 'bg-warning-700',
    800: 'bg-warning-800',
    900: 'bg-warning-900',
    950: 'bg-warning-950',
  },
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function isPalette(value: string | null): value is Palette {
  return value !== null && (PALETTES as readonly string[]).includes(value)
}

function readPaletteHexes(palette: Palette): PrimaryRamp {
  const next: PrimaryRamp = {}
  for (const step of COLOR_STEPS) {
    next[step] = readCssColorAsHex(`var(--color-${palette}-${step})`) ?? '#000000'
  }
  return next
}

function PaletteField({ palettes, role }: { palettes: BrandPalettes; role: BrandRole }) {
  const setPalette = useBrandStore(state => state.setPalette)
  const label = roleLabels[role]

  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <p className='font-medium text-fg text-sm'>{label}</p>
        <div className='flex items-center gap-2'>
          <span className={clsx('badge rounded-full', `badge-${role}`)}>{label}</span>
          <Button size='sm' variant={role}>
            {label}
          </Button>
        </div>
      </div>
      <Select
        items={paletteItems}
        onValueChange={value => {
          if (isPalette(value)) setPalette(role, value)
        }}
        value={palettes[role]}
      >
        <Select.Trigger className='w-full' placeholder={label}>
          {item => item?.label ?? label}
        </Select.Trigger>
        <Select.Content>
          {paletteItems.map(item => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <div className='flex gap-1'>
        {COLOR_STEPS.map(step => (
          <span
            aria-hidden
            className={clsx(
              swatchClass[role][step],
              'size-5 flex-1 rounded-md outline outline-black/10 -outline-offset-1'
            )}
            key={step}
            title={`${role} ${step}`}
          />
        ))}
      </div>
    </section>
  )
}

function PrimaryField({ palettes }: { palettes: BrandPalettes }) {
  const setPalette = useBrandStore(state => state.setPalette)
  const primaryRamp = useBrandStore(state => state.primaryRamp)
  const setPrimaryStep = useBrandStore(state => state.setPrimaryStep)
  const paletteHexes = useMemo(() => readPaletteHexes(palettes.primary), [palettes.primary])
  const applied = useMemo(() => ({ ...paletteHexes, ...primaryRamp }), [paletteHexes, primaryRamp])
  const [draft, setDraft] = useState(applied)

  useEffect(() => {
    setDraft(applied)
  }, [applied])

  const applyStep = (step: ColorStep, value: string) => {
    setDraft(current => ({ ...current, [step]: value }))
    const hex = normalizeHex(value)
    if (!hex) return
    setPrimaryStep(step, hex)
  }

  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <p className='font-medium text-fg text-sm'>Primary</p>
        <div className='flex items-center gap-2'>
          <span className='badge badge-primary rounded-full'>Primary</span>
          <Button size='sm' variant='primary'>
            Primary
          </Button>
        </div>
      </div>
      <Select
        items={paletteItems}
        onValueChange={value => {
          if (!isPalette(value)) return
          setPalette('primary', value)
          setDraft(readPaletteHexes(value))
        }}
        value={hasPrimaryRamp(primaryRamp) ? null : palettes.primary}
      >
        <Select.Trigger className='w-full' placeholder={hasPrimaryRamp(primaryRamp) ? 'Custom' : 'Primary'}>
          {item => item?.label ?? 'Custom'}
        </Select.Trigger>
        <Select.Content>
          {paletteItems.map(item => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <div className='space-y-2'>
        {COLOR_STEPS.map(step => (
          <div className='flex items-center gap-2' key={step}>
            <span className='w-8 shrink-0 font-mono text-muted text-xs'>{step}</span>
            <span
              aria-hidden
              className={clsx(
                swatchClass.primary[step],
                'size-5 shrink-0 rounded-md outline outline-black/10 -outline-offset-1'
              )}
            />
            <input
              aria-label={`Primary ${step}`}
              className='size-9 shrink-0 cursor-pointer rounded-md border border-line bg-input p-1'
              onChange={event => applyStep(step, event.target.value)}
              type='color'
              value={normalizeHex(draft[step] ?? '') ?? applied[step] ?? '#000000'}
            />
            <input
              aria-label={`Primary ${step} hex`}
              className='h-9 w-28 rounded-md border border-line bg-input px-2 font-mono text-fg text-sm'
              onBlur={() => setDraft(current => ({ ...current, [step]: applied[step] ?? '' }))}
              onChange={event => applyStep(step, event.target.value)}
              spellCheck={false}
              value={draft[step] ?? ''}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ThemeConfigOffcanvas({ onOpenChange, open }: ThemeConfigOffcanvasProps) {
  const theme = useAppStore(state => state.theme)
  const setTheme = useAppStore(state => state.setTheme)
  const palettes = useBrandStore(state => state.palettes)
  const primaryRamp = useBrandStore(state => state.primaryRamp)
  const reset = useBrandStore(state => state.reset)
  const isDark = theme === 'dark'
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
    }
  }, [])

  const copyTheme = async () => {
    try {
      await navigator.clipboard.writeText(buildThemeSnippet(palettes, primaryRamp))
      setCopied(true)
      if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Offcanvas onOpenChange={onOpenChange} open={open} swipeDirection='right'>
      <Offcanvas.Content closeButton size='lg'>
        <Offcanvas.Header>
          <Offcanvas.Title>Theme</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Description>
          Semantic colors update across the site. Copy the theme snippet when you want to keep a palette.
        </Offcanvas.Description>
        <Offcanvas.Body className='space-y-6'>
          <section className='flex items-center justify-between gap-3'>
            <p className='font-medium text-fg text-sm'>Appearance</p>
            <div className='flex items-center gap-2'>
              <Button
                active={!isDark}
                aria-pressed={!isDark}
                onClick={() => setTheme('light')}
                size='sm'
                variant='light'
              >
                <Sun className='size-4' />
                Light
              </Button>
              <Button
                active={isDark}
                aria-pressed={isDark}
                onClick={() => setTheme('dark')}
                size='sm'
                variant='light'
              >
                <Moon className='size-4' />
                Dark
              </Button>
            </div>
          </section>

          {BRAND_ROLES.map(role =>
            role === 'primary' ? (
              <PrimaryField key={role} palettes={palettes} />
            ) : (
              <PaletteField key={role} palettes={palettes} role={role} />
            )
          )}

          <div className='flex items-center gap-2'>
            <Button
              disabled={isDefaultBrand(palettes, primaryRamp)}
              onClick={reset}
              outlined
              size='sm'
              variant='light'
            >
              Reset
            </Button>
            <Button onClick={copyTheme} size='sm' variant='primary'>
              {copied ? 'Copied' : 'Copy theme'}
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas.Content>
    </Offcanvas>
  )
}
