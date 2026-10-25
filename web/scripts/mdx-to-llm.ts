import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import matter from 'gray-matter'

// ── Paths ──────────────────────────────────────────────────────────────────────────────────────────────────

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(webRoot, '..')
const pagesDir = path.join(webRoot, 'src/pages')
const publicDir = path.join(webRoot, 'public')
const stylesDir = path.join(repoRoot, 'ui-kit/src/styles')
const tokensModule = path.join(webRoot, 'src/pages/-views/design-tokens.ts')
const llmsPath = path.join(publicDir, 'llms.txt')
const origin = 'https://ui.polyms.dev'
const docsStart = '<!-- llm-docs:start -->'
const docsEnd = '<!-- llm-docs:end -->'

const fenceToken = '\u0000FENCE'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type JsxElement = {
  children?: string
  end: number
  name: string
  openTag: string
  selfClosing: boolean
  start: number
}

type PlainRow = Record<string, string | number | boolean | null>

type CatalogToken = {
  component: string
  name: string
  uses: { selector: string; value: string }[]
}

type VariantRow = { dark: string | null; light: string | null; name: string }

type ComponentTokenLayout = {
  defaults: CatalogToken[]
  variants: { label: string; rows: VariantRow[] }[]
}

type TypeToken = {
  className: string
  fontSize: string
  lineHeight: string
  weight: string | null
}

type DesignTokenCatalog = {
  component: CatalogToken[]
  primitive: CatalogToken[]
  semantic: CatalogToken[]
  typeScale: TypeToken[]
}

type TokenModule = {
  collectDesignTokens: (files: Record<string, string>) => DesignTokenCatalog
  groupComponentTokens: (tokens: CatalogToken[]) => ComponentTokenLayout
}

type CatalogApi = {
  catalog: DesignTokenCatalog
  groupComponentTokens: TokenModule['groupComponentTokens']
}

type LlmPage = { route: string; summary: string; title: string }
const visualComponents = new Set([
  'Sizes',
  'Variants',
  'Story',
  'Headings',
  'Tokens',
  'Utilities',
  'ButtonTooltip',
  'Colors',
  'States',
  'Floating',
  'Invalid',
  'PositionStory',
  'Programmatic',
])

// ── JSX scan ───────────────────────────────────────────────────────────────────────────────────────────────

function readJsxElement(source: string, start: number): JsxElement | null {
  if (source[start] !== '<' || source[start + 1] === '/' || source[start + 1] === '!') return null
  const nameMatch = /^<?([A-Za-z][\w.]*)/.exec(source.slice(start + 1))
  const name = nameMatch?.[1]
  if (!name) return null
  let i = start + 1 + name.length
  let brace = 0
  let quote = null
  while (i < source.length) {
    const c = source[i] ?? ''
    if (quote) {
      if (c === '\\') {
        i += 2
        continue
      }
      if (c === quote) quote = null
      i += 1
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      quote = c
      i += 1
      continue
    }
    if (c === '{') {
      brace += 1
      i += 1
      continue
    }
    if (c === '}') {
      brace -= 1
      i += 1
      continue
    }
    if (brace === 0 && c === '/') {
      let k = i + 1
      while (k < source.length && /\s/.test(source[k] ?? '')) k += 1
      if (source[k] === '>') {
        return {
          children: '',
          end: k + 1,
          name,
          openTag: source.slice(start, k + 1),
          selfClosing: true,
          start,
        }
      }
    }
    if (brace === 0 && c === '>') {
      const openEnd = i + 1
      const close = findCloseTag(source, name, openEnd)
      if (!close) return null
      return {
        children: source.slice(openEnd, close.contentEnd),
        end: close.end,
        name,
        openTag: source.slice(start, openEnd),
        selfClosing: false,
        start,
      }
    }
    i += 1
  }
  return null
}

function findCloseTag(source: string, name: string, from: number) {
  let depth = 1
  let j = from
  while (j < source.length && depth > 0) {
    const next = source.indexOf('<', j)
    if (next === -1) return null
    if (source.startsWith(`</${name}`, next) && /[\s>]/.test(source[next + name.length + 2] ?? '>')) {
      depth -= 1
      const end = source.indexOf('>', next)
      if (end === -1) return null
      if (depth === 0) return { contentEnd: next, end: end + 1 }
      j = end + 1
      continue
    }
    if (source.startsWith(`<${name}`, next) && /[\s/>]/.test(source[next + name.length + 1] ?? ' ')) {
      depth += 1
    }
    j = next + 1
  }
  return null
}

function replaceElements(
  source: string,
  names: readonly string[],
  replacer: (element: JsxElement) => string
) {
  const wanted = new Set(names)
  let cursor = 0
  let out = ''
  while (cursor < source.length) {
    const next = source.indexOf('<', cursor)
    if (next === -1) {
      out += source.slice(cursor)
      break
    }
    const element = readJsxElement(source, next)
    if (!element || !wanted.has(element.name)) {
      out += source.slice(cursor, next + 1)
      cursor = next + 1
      continue
    }
    out += source.slice(cursor, element.start)
    out += replacer(element)
    cursor = element.end
  }
  return out
}

function readExpression(source: string, start: number) {
  let i = start
  while (i < source.length && /\s/.test(source[i] ?? '')) i += 1
  const begin = i
  let brace = 0
  let bracket = 0
  let paren = 0
  let quote = null
  let started = false
  for (; i < source.length; i += 1) {
    const c = source[i] ?? ''
    if (quote) {
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === quote) quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      quote = c
      started = true
      continue
    }
    if (c === '{') {
      brace += 1
      started = true
      continue
    }
    if (c === '}') {
      brace -= 1
      continue
    }
    if (c === '[') {
      bracket += 1
      started = true
      continue
    }
    if (c === ']') {
      bracket -= 1
      continue
    }
    if (c === '(') {
      paren += 1
      started = true
      continue
    }
    if (c === ')') {
      paren -= 1
      continue
    }
    if (started && brace === 0 && bracket === 0 && paren === 0 && (c === '\n' || c === ';')) break
  }
  return { end: i, expr: source.slice(begin, i).trim() }
}

function evalLiteral(expr: string): unknown {
  return Function(`"use strict"; return (${expr});`)()
}

function isPlainRow(value: unknown): value is PlainRow {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value).every(
    item => item == null || ['string', 'number', 'boolean'].includes(typeof item)
  )
}

function markdownTable(rows: PlainRow[]) {
  const keys: string[] = []
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!keys.includes(key)) keys.push(key)
    }
  }
  const header = keys.map(labelize)
  const body = rows.map(row => keys.map(key => cell(row[key])))
  return [toRow(header), `| ${header.map(() => '---').join(' | ')} |`, ...body.map(toRow)].join('\n')
}

function labelize(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^\w/, char => char.toUpperCase())
}

function cell(value: unknown) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim()
}

function toRow(columns: readonly string[]) {
  return `| ${columns.join(' | ')} |`
}

function htmlTableToMarkdown(tableHtml: string) {
  const rows: string[][] = []
  for (const row of tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells: string[] = []
    const rowHtml = row[1]
    if (!rowHtml) continue
    for (const cellHtml of rowHtml.matchAll(/<t[hd]\b([^>]*)>([\s\S]*?)<\/t[hd]>/gi)) {
      cells.push(cellText(cellHtml[2] ?? '', cellHtml[1] ?? ''))
    }
    if (cells.some(Boolean)) rows.push(cells)
  }
  if (rows.length === 0) return ''
  const width = Math.max(...rows.map(row => row.length))
  const normalized = rows.map(row => {
    const copy = row.slice()
    while (copy.length < width) copy.push('')
    return copy
  })
  const [header, ...body] = normalized
  if (!header) return ''
  return [toRow(header), `| ${header.map(() => '---').join(' | ')} |`, ...body.map(toRow)].join('\n')
}

function cellText(html: string, attrs = '') {
  const classNames = [...`${attrs} ${html}`.matchAll(/className=(['"])([\s\S]*?)\1/g)].flatMap(match =>
    (match[2] ?? '').split(/\s+/)
  )
  const swatch = classNames.filter(
    name =>
      /^(bg|text|border)-/.test(name) &&
      !name.startsWith('text-muted') &&
      !name.startsWith('text-nowrap') &&
      !name.startsWith('text-sm') &&
      !name.startsWith('text-fg')
  )
  const text = html
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/\{['"]([\s\S]*?)['"]\}/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text && swatch.length > 0) return cell(swatch.join(' '))
  return cell(text)
}

function maskFences(source: string) {
  const fences: string[] = []
  const masked = source.replace(/```[\s\S]*?```/g, block => {
    const token = `${fenceToken}${fences.length}${fenceToken}`
    fences.push(block)
    return token
  })
  return { fences, masked }
}

function unmaskFences(source: string, fences: readonly string[]) {
  return source.replace(
    new RegExp(`${fenceToken}(\\d+)${fenceToken}`, 'g'),
    (_, index) => fences[Number(index)] ?? ''
  )
}

function stripImports(source: string) {
  return source
    .replace(/^import[\s\S]*?\bfrom\s+['"][^'"]+['"]\s*;?\s*\n?/gm, '')
    .replace(/^import\s+['"][^'"]+['"]\s*;?\s*\n?/gm, '')
}

function collectRawImports(source: string, filePath: string) {
  const map = new Map<string, string>()
  for (const match of source.matchAll(/^import\s+(\w+)\s+from\s+['"]([^'"]+\?raw)['"]/gm)) {
    const binding = match[1]
    const specifier = match[2]?.replace(/\?raw$/, '')
    if (!binding || !specifier) continue
    map.set(binding, path.resolve(path.dirname(filePath), specifier))
  }
  return map
}

function attrIdentifier(openTag: string, attr: string) {
  const match = openTag.match(new RegExp(`\\b${attr}=\\{([A-Za-z_$][\\w$]*)\\}`))
  return match?.[1] ?? null
}

function attrString(openTag: string, attr: string) {
  const match = openTag.match(new RegExp(`\\b${attr}=(['"])(.*?)\\1`))
  return match?.[2] ?? null
}

function fence(lang: string, code: string) {
  const body = code.replace(/\s+$/, '')
  return `\n\n\`\`\`${lang}\n${body}\n\`\`\`\n\n`
}

function apiReference(apis: unknown) {
  if (!Array.isArray(apis) || apis.length === 0) return ''
  const chunks: string[] = []
  let rows: PlainRow[] = []
  const flush = () => {
    if (rows.length === 0) return
    chunks.push(markdownTable(rows))
    rows = []
  }
  for (const prop of apis) {
    if (prop && typeof prop === 'object' && prop.separator) {
      flush()
      chunks.push(`### ${prop.separator}`)
      continue
    }
    if (!prop?.name) continue
    rows.push({
      Default:
        prop.default == null || prop.default === '-' ? '—' : `\`${String(prop.default).replace(/`/g, '')}\``,
      Description: prop.description ?? '',
      Prop: `\`${prop.name}\``,
      Values: prop.values == null ? '—' : String(prop.values),
    })
  }
  flush()
  return `\n\n${chunks.join('\n\n')}\n\n`
}

function collectStringExports(source: string, strings: Map<string, string>) {
  let cursor = 0
  while (cursor < source.length) {
    const match = /export const (\w+)\s*=/.exec(source.slice(cursor))
    if (!match) break
    const eq = cursor + match.index + match[0].length - 1
    const { end, expr } = readExpression(source, eq + 1)
    try {
      const value = evalLiteral(expr)
      const exportName = match[1]
      if (typeof value === 'string' && exportName) strings.set(exportName, value)
    } catch {
      // Array and object exports are converted later. A broken literal fails the clean check.
    }
    cursor = Math.max(end, cursor + match.index + match[0].length)
  }
}

function deleteNamedExports(source: string, names: Iterable<string>) {
  let next = source
  for (const name of names) {
    const match = new RegExp(`(?:^|\\n)export const ${name}\\s*=`).exec(next)
    if (!match) continue
    const start = match.index + (next[match.index] === '\n' ? 1 : 0)
    const eq = next.indexOf('=', start)
    const { end } = readExpression(next, eq + 1)
    next = `${next.slice(0, start)}${next.slice(end)}`
  }
  return next
}

function replaceArrayExports(source: string) {
  let next = source
  while (true) {
    const match = /^export const (\w+)\s*=/.exec(next) ?? /\nexport const (\w+)\s*=/.exec(next)
    if (!match) break
    const name = match[1]
    if (!name) break
    const start = match.index + (match[0].startsWith('\n') ? 1 : 0)
    const eq = next.indexOf('=', start)
    const { end, expr } = readExpression(next, eq + 1)
    let value: unknown
    try {
      value = evalLiteral(expr)
    } catch {
      break
    }
    if (!Array.isArray(value) || value.length === 0 || !value.every(isPlainRow)) break
    const table = markdownTable(value)
    const withoutExport = `${next.slice(0, start)}${next.slice(end)}`
    const jsxAt = findReferencingElement(withoutExport, name, Math.max(0, start - 1))
    next = jsxAt
      ? `${withoutExport.slice(0, jsxAt.start)}${table}\n${withoutExport.slice(jsxAt.end)}`
      : `${withoutExport.slice(0, start)}${table}\n${withoutExport.slice(start)}`
  }
  return next
}

function findReferencingElement(source: string, name: string, from: number): JsxElement | null {
  let cursor = from
  while (cursor < source.length) {
    const next = source.indexOf('<', cursor)
    if (next === -1) return null
    const element = readJsxElement(source, next)
    if (!element) {
      cursor = next + 1
      continue
    }
    if (element.openTag.includes(`{${name}`) || element.children?.includes(`{${name}`)) return element
    cursor = next + 1
  }
  return null
}

function rewriteLinks(source: string) {
  return source.replace(/\]\((\/[^)\s]*)\)/g, (_, href) => {
    const hashAt = href.indexOf('#')
    const hash = hashAt === -1 ? '' : href.slice(hashAt)
    let pathname = hashAt === -1 ? href : href.slice(0, hashAt)
    if (!pathname.endsWith('.md') && !/\.[a-z0-9]+$/i.test(pathname)) pathname += '.md'
    return `](${origin}${pathname}${hash})`
  })
}

function unwrapHtml(source: string) {
  let next = source
  for (let pass = 0; pass < 12; pass += 1) {
    const before = next
    next = next.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    next = next.replace(/<br\s*\/?>/gi, '\n')
    next = next.replace(/<hr\s*\/?>/gi, '\n\n---\n\n')
    next = next.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => `\`${inner.trim()}\``)
    next = next.replace(/<a\b([^>]*?)>([\s\S]*?)<\/a>/gi, (_, attrs, inner) => {
      const href = attrs.match(/href=(['"])(.*?)\1/)
      const text = inner.replace(/<[^>]+>/g, '').trim()
      return href ? `[${text}](${href[2]})` : text
    })
    next = next.replace(/<\/?(?:p|span|div|thead|tbody|em|strong)\b[^>]*>/gi, '')
    next = replaceElements(
      next,
      ['Alert'],
      element => `\n\n> ${(element.children ?? '').replace(/\s+/g, ' ').trim()}\n\n`
    )
    next = replaceElements(next, [...visualComponents], () => '')
    if (next === before) break
  }
  return next
}

function convertTables(source: string) {
  return replaceElements(
    source,
    ['table'],
    element => `\n\n${htmlTableToMarkdown(`${element.openTag + element.children}</table>`)}\n\n`
  )
}

function assertClean(source: string, filePath: string) {
  const { masked } = maskFences(source)
  const visible = masked
    .replace(/`[^`\n]*`/g, '')
    .split('\n')
    .filter(line => !line.trimStart().startsWith('|'))
    .join('\n')
  const problems: string[] = []
  if (/export const /.test(visible)) problems.push('export const remains')
  if (/<[A-Z][\w.]*/.test(visible)) problems.push('JSX component remains')
  if (/<(?:table|div|span|thead|tbody|tr|td|th)\b/i.test(visible)) problems.push('HTML table markup remains')
  if (problems.length === 0) return
  const sample = visible
    .split('\n')
    .filter(line => /export const |<[A-Z]|<(?:table|div|span|tr|td)\b/i.test(line))
    .slice(0, 8)
    .join('\n')
  throw new Error(`${path.relative(repoRoot, filePath)}: ${problems.join(', ')}\n${sample}`)
}

function firstParagraph(markdown: string) {
  const lines = markdown.split('\n')
  const chunk: string[] = []
  let seenHeading = false
  for (const line of lines) {
    if (/^#\s/.test(line)) {
      seenHeading = true
      continue
    }
    if (!seenHeading) continue
    if (/^#{2,}\s/.test(line)) break
    if (!line.trim()) {
      if (chunk.length > 0) break
      continue
    }
    if (line.startsWith('|') || line.startsWith('```') || line.startsWith('>')) continue
    chunk.push(line.trim())
  }
  return chunk
    .join(' ')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function oneSentence(text: string) {
  const match = /^[\s\S]{0,280}?[.!?](?=\s|$)/.exec(text)
  return (match ? match[0] : text.slice(0, 280)).trim()
}

function routeFor(relativeMdx: string) {
  return `/${relativeMdx.replace(/\.mdx$/, '').replace(/\\/g, '/')}`
}

function publicFileFor(route: string) {
  return path.join(publicDir, `${route.slice(1)}.md`)
}

// ── Tokens ─────────────────────────────────────────────────────────────────────────────────────────────────

async function loadTokenCatalog() {
  const require = createRequire(path.join(repoRoot, 'package.json'))
  const ts = require('typescript')
  const source = fs.readFileSync(tokensModule, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  })
  const outfile = path.join(scriptDir, '.design-tokens.bundle.mjs')
  fs.writeFileSync(outfile, compiled.outputText)
  try {
    const mod = (await import(pathToFileURL(outfile).href)) as TokenModule
    const files = Object.fromEntries(
      fs
        .readdirSync(stylesDir)
        .filter(name => name.endsWith('.css'))
        .map(name => [name, fs.readFileSync(path.join(stylesDir, name), 'utf8')])
    )
    return { catalog: mod.collectDesignTokens(files), groupComponentTokens: mod.groupComponentTokens }
  } finally {
    fs.rmSync(outfile, { force: true })
  }
}

function tokenValue(token: CatalogToken, mode: 'dark' | 'light'): string {
  const use = token.uses.find(item =>
    mode === 'dark' ? item.selector.includes('.dark') : !item.selector.includes('.dark')
  )
  return use?.value ?? (mode === 'dark' ? tokenValue(token, 'light') : '')
}

function catalogTable(tokens: CatalogToken[]) {
  const rows = [...tokens]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(token => ({
      Dark: tokenValue(token, 'dark'),
      Light: tokenValue(token, 'light'),
      Token: `\`${token.name}\``,
    }))
  return rows.length ? markdownTable(rows) : ''
}

function componentTokenMarkdown(
  tokens: CatalogToken[],
  groupComponentTokens: TokenModule['groupComponentTokens']
) {
  const groups = new Map<string, CatalogToken[]>()
  for (const token of tokens) {
    const list = groups.get(token.component) ?? []
    list.push(token)
    groups.set(token.component, list)
  }
  const chunks = []
  for (const name of [...groups.keys()].sort((a, b) => a.localeCompare(b))) {
    const layout = groupComponentTokens(groups.get(name) ?? [])
    chunks.push(`### ${name || 'Component'}`)
    if (layout.defaults.length > 0) chunks.push(catalogTable(layout.defaults))
    for (const variant of layout.variants) {
      chunks.push(`#### ${variant.label}`)
      chunks.push(
        markdownTable(
          variant.rows.map(row => ({
            Dark: row.dark ?? '',
            Light: row.light ?? '',
            Token: `\`${row.name}\``,
          }))
        )
      )
    }
  }
  return chunks.filter(Boolean).join('\n\n')
}

function designTokensMarkdown(
  level: string,
  catalog: DesignTokenCatalog,
  groupComponentTokens: TokenModule['groupComponentTokens']
) {
  if (level === 'component') return componentTokenMarkdown(catalog.component, groupComponentTokens)
  if (level === 'primitive') {
    const typeRows = catalog.typeScale.map(step => ({
      Class: `\`${step.className}\``,
      'Font size': step.fontSize,
      'Line height': step.lineHeight,
      Weight: step.weight ?? '',
    }))
    return [
      catalogTable(catalog.primitive),
      typeRows.length ? `### Type scale\n\n${markdownTable(typeRows)}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')
  }
  return catalogTable(catalog.semantic)
}

// ── Convert ────────────────────────────────────────────────────────────────────────────────────────────────

function convertMdx(filePath: string, catalogApi: CatalogApi) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  const rawImports = collectRawImports(content, filePath)
  const strings = new Map<string, string>()
  const { fences, masked } = maskFences(content)
  let body = stripImports(masked)
  collectStringExports(body, strings)
  body = replaceElements(body, ['CodePreview'], element => {
    const ident = attrIdentifier(element.openTag, 'code')
    const rawPath = ident ? rawImports.get(ident) : undefined
    if (rawPath) return fence('tsx', fs.readFileSync(rawPath, 'utf8'))
    const snippet = ident ? strings.get(ident) : undefined
    if (snippet) return fence('tsx', snippet)
    return ''
  })
  body = deleteNamedExports(body, strings.keys())
  body = replaceArrayExports(body)
  body = replaceElements(body, ['APIReference'], () => apiReference(data.apis))
  body = replaceElements(body, ['DesignTokens'], element => {
    const level = attrString(element.openTag, 'level') ?? 'primitive'
    return `\n\n${designTokensMarkdown(level, catalogApi.catalog, catalogApi.groupComponentTokens)}\n\n`
  })
  body = convertTables(body)
  body = unwrapHtml(body)
  body = unmaskFences(body, fences)
  body = rewriteLinks(body)
  body = body
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  const title =
    typeof data.title === 'string' && data.title.trim() ? data.title.trim() : path.basename(filePath, '.mdx')
  const markdown = `# ${title}\n\n${body}\n`
  assertClean(markdown, filePath)
  return { markdown, summary: firstParagraph(markdown), title }
}

function walkMdx(dir: string) {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('-')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkMdx(full))
    else if (entry.name.endsWith('.mdx')) files.push(full)
  }
  return files
}

function indexMarkdown(pages: LlmPage[]) {
  const changelog: string[] = []
  const guides: string[] = []
  const components: string[] = []
  for (const page of pages) {
    const url = `${origin}${page.route}.md`
    const sentence = oneSentence(page.summary)
    if (page.route === '/releases') {
      changelog.push(`- [${page.title}](${url}): Changelog and breaking changes by version. ${sentence}`)
      continue
    }
    const line = `- [${page.title}](${url}): ${sentence}`
    if (page.route.startsWith('/docs/')) components.push(line)
    else guides.push(line)
  }
  const sortLines = (lines: string[]) => lines.sort((a, b) => a.localeCompare(b))
  return [
    '## Changelog',
    '',
    ...changelog,
    '',
    '## Guides',
    '',
    ...sortLines(guides),
    '',
    '## Components',
    '',
    ...sortLines(components),
    '',
  ].join('\n')
}

function writeLlmsIndex(index: string) {
  const current = fs.readFileSync(llmsPath, 'utf8')
  if (!current.includes(docsStart) || !current.includes(docsEnd)) {
    throw new Error('llms.txt is missing llm-docs markers')
  }
  const next = current.replace(
    new RegExp(`${docsStart}[\\s\\S]*?${docsEnd}`),
    `${docsStart}\n${index.trim()}\n${docsEnd}`
  )
  fs.writeFileSync(llmsPath, next.endsWith('\n') ? next : `${next}\n`)
}

function cleanStale(written: readonly string[]) {
  const keep = new Set([...written, llmsPath])
  const visit = (dir: string) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        visit(full)
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full)
        continue
      }
      if (entry.name.endsWith('.md') && !keep.has(full)) fs.rmSync(full)
    }
  }
  visit(publicDir)
}

export async function generateLlmDocs() {
  const catalogApi = await loadTokenCatalog()
  const pages: LlmPage[] = []
  const written: string[] = []
  for (const filePath of walkMdx(pagesDir)) {
    const relative = path.relative(pagesDir, filePath)
    const route = routeFor(relative)
    const converted = convertMdx(filePath, catalogApi)
    const outfile = publicFileFor(route)
    fs.mkdirSync(path.dirname(outfile), { recursive: true })
    fs.writeFileSync(outfile, converted.markdown)
    written.push(outfile)
    pages.push({ route, summary: converted.summary, title: converted.title })
  }
  cleanStale(written)
  writeLlmsIndex(indexMarkdown(pages))
  return pages.length
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  generateLlmDocs()
    .then(count => {
      console.log(`llm docs: ${count} markdown files`)
    })
    .catch(error => {
      console.error(error instanceof Error ? error.message : error)
      process.exit(1)
    })
}
