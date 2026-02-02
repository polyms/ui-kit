import { Eraser01Icon, SearchList02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Field } from '@polyms/core'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const sizes = ['sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

export default function FieldSizes() {
  const [value, setValue] = useState('')
  const refs = useRef<Record<string, HTMLInputElement | null>>({})
  const [key, setKey] = useState(nanoid())

  const styles = useMemo<Record<string, Partial<CSSStyleDeclaration>>>(
    () =>
      Object.fromEntries(
        sizes.map(size => {
          const el = refs.current[size]
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
    <div className='card'>
      <table className='table-striped table-borderless table-lg table text-center align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='text-center'>size</th>
            <th className='text-center'>font-size</th>
            <th className='text-center'>line-height</th>
            <th className='text-center'>height</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td className='text-center'>
                <Field size={size === 'default' ? undefined : size}>
                  <HugeiconsIcon className='icon-start' icon={SearchList02Icon} strokeWidth={2} />
                  <HugeiconsIcon
                    className='icon-end origin-top rotate-180'
                    icon={Eraser01Icon}
                    onClick={() => setValue('')}
                    strokeWidth={2}
                  />
                  <Field.Control
                    onChange={e => setValue(e.target.value)}
                    placeholder={size !== 'default' ? `.field-${size}` : 'default'}
                    ref={ref => {
                      refs.current[size] = ref
                    }}
                    rounded
                    value={value}
                  />
                </Field>
              </td>
              <td className='text-center'>{styles[size]?.fontSize}</td>
              <td className='text-center'>{styles[size]?.lineHeight}</td>
              <td className='text-center'>{styles[size]?.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
