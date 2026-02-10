import { Sent02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Switch } from '@polyms/core'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants = ['ghost', 'primary', 'success', 'info', 'warning', 'danger', 'dark', 'light'] as const

export default function ButtonVariants() {
  const [rounded, setRounded] = useState(true)
  const [active, setActive] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <div className='card'>
      <table className='table-striped table-borderless table text-center align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='w-px'>Variant</th>
            <th className='text-center'>Default</th>
            <th className='text-center'>Outlined</th>
            <th className='text-center'>Icon</th>
          </tr>
        </thead>
        <tbody>
          {variants.map(variant => (
            <tr key={variant}>
              <td className='font-semibold'>{variant}</td>
              <td className='text-center'>
                <Button
                  active={active}
                  disabled={disabled}
                  rounded={rounded}
                  variant={variant === 'ghost' ? undefined : variant}
                >
                  {variant === 'ghost' ? 'default' : `btn-${variant}`}
                </Button>
              </td>
              <td className='text-center'>
                <Button
                  active={active}
                  disabled={disabled}
                  outlined
                  rounded={rounded}
                  variant={variant === 'ghost' ? undefined : variant}
                >
                  {variant === 'ghost' ? 'default' : `btn-${variant}`}
                </Button>
              </td>
              <td className='text-center'>
                <Button
                  active={active}
                  disabled={disabled}
                  icon
                  outlined
                  rounded={rounded}
                  variant={variant === 'ghost' ? undefined : variant}
                >
                  <HugeiconsIcon icon={Sent02Icon} size={18} strokeWidth={1.5} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div className='flex justify-end gap-4 px-4'>
                <Switch checked={rounded} label='Rounded' onChange={() => setRounded(!rounded)} />
                <Switch checked={active} label='Active' onChange={() => setActive(!active)} />
                <Switch checked={disabled} label='Disabled' onChange={() => setDisabled(!disabled)} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
