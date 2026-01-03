import { Cart } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, type ButtonVariant, Spinner } from '@polyms/core'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const sizes = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

export default function ButtonDefault() {
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [key, setKey] = useState(nanoid())

  const styles = useMemo<Record<string, Partial<CSSStyleDeclaration>>>(
    () =>
      Object.fromEntries(
        sizes.map(size => {
          const el = btnRefs.current[size]
          if (!el) return [size, {}]

          const { fontSize, lineHeight, height } = window.getComputedStyle(el)
          return [size, { fontSize, lineHeight, height }]
        })
      ),
    [key]
  )

  const refresh = useCallback(() => setKey(nanoid()), [])

  useEffect(() => {
    setTimeout(() => {
      refresh()
    }, 100)
  }, [])

  return (
    <div className='flex w-full justify-between gap-xl'>
      <div className='flex flex-col gap-xs'>
        <h1 className='border-b text-2xl'>Variants</h1>
        <div className='grid grid-cols-2 gap-4'>
          {[undefined, 'primary', 'success', 'light', 'dark', 'danger'].map(variant => (
            <Button key={variant ?? 'ghost'} size='xl' rounded variant={variant as ButtonVariant}>
              <HugeiconsIcon icon={Cart} size={18} strokeWidth={2} />
              <span>{variant ?? 'ghost'}</span>
            </Button>
          ))}
          {[undefined, 'primary', 'success', 'light', 'dark', 'danger'].map(variant => (
            <Button key={variant ?? 'ghost'} size='xl' rounded outlined variant={variant as ButtonVariant}>
              <HugeiconsIcon icon={Cart} size={18} strokeWidth={2} />
              <span>{variant ?? 'ghost'}</span>
            </Button>
          ))}

          <Button variant='primary' size='xl' rounded>
            <Spinner size={22} color='var(--color-primary-700)' subColor='var(--color-primary-100)' />
          </Button>
          <Button variant='dark' size='xl' rounded>
            <Spinner size={22} color='#fff' subColor='var(--color-slate-500)' />
          </Button>
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='border-b text-2xl'>Sizes</h1>
        <table className='table-striped table-borderless table text-center align-middle'>
          <thead>
            <tr>
              <th>button</th>
              <th>size</th>
              <th>font-size</th>
              <th>line-height</th>
              <th>height</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map(size => (
              <tr key={size}>
                <td className='text-center'>
                  <Button
                    key={size}
                    id={`btn-${size}`}
                    size={size === 'default' ? undefined : size}
                    outlined
                    rounded
                    ref={ref => {
                      btnRefs.current[size] = ref
                    }}
                  >
                    <HugeiconsIcon icon={Cart} size={styles[size]?.lineHeight || 16} strokeWidth={2} />

                    {size !== 'default' ? `btn-${size}` : 'default'}
                  </Button>
                </td>
                <td>{size === 'default' ? '-' : size}</td>
                <td>{styles[size]?.fontSize}</td>
                <td>{styles[size]?.lineHeight}</td>
                <td>{styles[size]?.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
