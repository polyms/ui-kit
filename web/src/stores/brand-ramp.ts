import type { ColorStep } from './theme.store'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Oklch = {
  c: number
  h: number
  l: number
}

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const COLOR_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const satisfies readonly ColorStep[]

const LIGHT_STOPS = [0.18, 0.34, 0.48, 0.62, 0.76, 0.88, 0.96]
const DARK_STOPS = [0.35, 0.62, 0.85]

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

export function normalizeHex(value: string): string | null {
  const raw = value.trim().replace(/^#/, '')
  if (!/^[\da-f]{3}$|^[\da-f]{6}$/i.test(raw)) return null
  const hex = raw.length === 3 ? [...raw].map(channel => channel + channel).join('') : raw
  return `#${hex.toLowerCase()}`
}

export function hexToOklchCss(hex: string): string | null {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  return formatOklch(hexToOklch(normalized))
}

export function cssColorToHex(color: string): string | null {
  return computedColorToHex(color)
}

export function buildBrandRamp(hex: string, anchorStep: ColorStep): Record<ColorStep, string> | null {
  const normalized = normalizeHex(hex)
  if (!normalized) return null

  const anchor = hexToOklch(normalized)
  const anchorIndex = COLOR_STEPS.indexOf(anchorStep)
  const lightCount = anchorIndex
  const darkCount = COLOR_STEPS.length - anchorIndex - 1
  const ramp = {} as Record<ColorStep, string>

  for (const [index, step] of COLOR_STEPS.entries()) {
    if (index === anchorIndex) {
      ramp[step] = formatOklch(anchor)
      continue
    }

    if (index < anchorIndex) {
      const lightT = curveT(LIGHT_STOPS, anchorIndex - index, lightCount)
      const ceiling = Math.max(anchor.l, 0.98)
      ramp[step] = formatOklch({
        l: mix(anchor.l, ceiling, lightT),
        c: anchor.c * (1 - lightT * 0.85),
        h: anchor.h,
      })
      continue
    }

    const darkT = curveT(DARK_STOPS, index - anchorIndex, darkCount)
    const floor = Math.min(anchor.l, 0.24)
    ramp[step] = formatOklch({
      l: mix(anchor.l, floor, darkT),
      c: anchor.c * (1 - darkT * 0.45),
      h: anchor.h,
    })
  }

  return ramp
}

export function readCssColorAsHex(color: string): string | null {
  if (typeof document === 'undefined') return null

  const probe = document.createElement('span')
  probe.style.color = color
  probe.style.display = 'none'
  document.body.append(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()

  return computedColorToHex(computed)
}

function computedColorToHex(computed: string) {
  const rgb = computed.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/)
  if (rgb) {
    return channelsToHex(Number(rgb[1]), Number(rgb[2]), Number(rgb[3]))
  }

  const oklch = computed.match(/oklch\(\s*(-?[\d.]+%?)\s+(-?[\d.]+)\s+(-?[\d.]+)/)
  if (!oklch) return null

  const lightnessRaw = oklch[1]
  const chromaRaw = oklch[2]
  const hueRaw = oklch[3]
  if (lightnessRaw == null || chromaRaw == null || hueRaw == null) return null

  const lightness = lightnessRaw.endsWith('%')
    ? Number(lightnessRaw.slice(0, -1)) / 100
    : Number(lightnessRaw)
  const [red, green, blue] = oklchToSrgb(lightness, Number(chromaRaw), Number(hueRaw))
  return channelsToHex(red, green, blue)
}

function channelsToHex(red: number, green: number, blue: number) {
  const channels = [red, green, blue].map(channel =>
    Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0')
  )
  return `#${channels.join('')}`
}

function oklchToSrgb(l: number, c: number, h: number): [number, number, number] {
  const hue = (h * Math.PI) / 180
  const a = c * Math.cos(hue)
  const b = c * Math.sin(hue)
  const lCube = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mCube = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const sCube = (l - 0.0894841775 * a - 1.291485548 * b) ** 3

  return [
    linearToSrgb(4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube),
    linearToSrgb(-1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube),
    linearToSrgb(-0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube),
  ]
}

function linearToSrgb(value: number) {
  const channel = Math.min(1, Math.max(0, value))
  const encoded = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055
  return Math.round(Math.min(1, Math.max(0, encoded)) * 255)
}

function hexToOklch(hex: string): Oklch {
  const value = Number.parseInt(hex.slice(1), 16)
  const red = srgbToLinear((value >> 16) & 255)
  const green = srgbToLinear((value >> 8) & 255)
  const blue = srgbToLinear(value & 255)

  const l = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue)
  const m = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue)
  const s = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue)

  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const chroma = Math.hypot(a, b)
  let hue = (Math.atan2(b, a) * 180) / Math.PI
  if (hue < 0) hue += 360

  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    c: chroma,
    h: chroma < 0.0005 ? 0 : hue,
  }
}

function srgbToLinear(channel: number) {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function curveT(stops: readonly number[], distance: number, count: number) {
  const last = stops.at(-1) ?? 0
  if (count === stops.length) return stops[distance - 1] ?? last
  if (count <= 1) return last

  const pos = ((distance - 1) / (count - 1)) * (stops.length - 1)
  const index = Math.min(Math.floor(pos), stops.length - 1)
  const next = Math.min(index + 1, stops.length - 1)
  const start = stops[index] ?? last
  const end = stops[next] ?? start
  return start + (end - start) * (pos - index)
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function formatOklch({ c, h, l }: Oklch) {
  const chroma = Math.max(0, c)
  const hue = chroma < 0.0005 ? 0 : ((h % 360) + 360) % 360
  const lightness = trim(Math.min(1, Math.max(0, l)) * 100)
  const chromaText = trim(chroma < 0.0005 ? 0 : chroma, 4)
  return `oklch(${lightness}% ${chromaText} ${trim(hue)})`
}

function trim(value: number, digits = 2) {
  return Number(value.toFixed(digits)).toString()
}
