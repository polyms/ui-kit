import { Accordion } from '@base-ui/react/accordion'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

interface PropItem {
  name: string
  default: string
  values: string
  defaultHighlight: string
  description: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const props: PropItem[] = [
  {
    name: 'variant',
    default: 'ghost',
    values: 'primary | success | light | dark | danger | warning | ghost',
    defaultHighlight: 'text-primary',
    description: 'Determines the visual style and appearance of the button.',
  },
  {
    name: 'size',
    default: '-',
    values: 'xs | sm | lg | xl | 2xl | 3xl',
    defaultHighlight: 'text-slate-400',
    description: 'Controls the padding and font size of the button.',
  },
  {
    name: 'rounded',
    default: '-',
    values: 'boolean',
    defaultHighlight: 'text-slate-400',
    description: 'Makes the button fully rounded (pill shape) when set to true.',
  },
  {
    name: 'outlined',
    default: '-',
    values: 'boolean',
    defaultHighlight: 'text-slate-400',
    description: 'Renders the button with an outline style instead of solid background.',
  },
  {
    name: 'icon',
    default: '-',
    values: 'boolean',
    defaultHighlight: 'text-slate-400',
    description: 'When provided, styles the button as a square icon button with equal width and height.',
  },
  {
    name: 'active',
    default: '-',
    values: 'boolean',
    defaultHighlight: 'text-slate-400',
    description: 'Applies active state styling to the button, useful for indicating selected state.',
  },
  {
    name: 'disabled',
    default: '-',
    values: 'boolean',
    defaultHighlight: 'text-slate-400',
    description: 'Disables the button, preventing user interaction and applying reduced opacity.',
  },
]

export default function ButtonProps() {
  return (
    <div className='card'>
      <Accordion.Root className='accordion' multiple>
        <Accordion.Item className='accordion-item border-solid bg-slate-100' disabled value='_header'>
          <Accordion.Header className='accordion-header font-semibold'>
            <Accordion.Trigger className='accordion-trigger font-semibold' disabled>
              <span></span>
              <span>Prop</span>
              <span>Default</span>
              <span>Values</span>
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>

        {props.map(prop => (
          <Accordion.Item className='accordion-item' key={prop.name} value={prop.name}>
            <Accordion.Header className='accordion-header'>
              <Accordion.Trigger className='accordion-trigger'>
                <HugeiconsIcon className='accordion-icon' icon={PlusSignIcon} size={16} strokeWidth={2} />
                <span className='font-medium'>{prop.name}</span>
                <span className={`${prop.defaultHighlight} font-mono text-sm`}>{prop.default}</span>
                <span className='font-mono text-slate-600 text-xs'>{prop.values}</span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className='accordion-panel'>
              <p className='p-2 ps-10 text-slate-700 text-sm'>{prop.description}</p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
