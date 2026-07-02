import { Select } from '@polyms/core-ui'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const sizes = ['sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

const items = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
]

export default function SelectSizes() {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
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
                <Select defaultValue='option1' items={items}>
                  <Select.Trigger
                    className='rounded-full'
                    placeholder={size !== 'default' ? `.select-${size}` : 'default'}
                    ref={ref => {
                      refs.current[size] = ref
                    }}
                    size={size === 'default' ? undefined : size}
                  />
                  <Select.Content>
                    {items.map(item => (
                      <Select.Item key={item.value} value={item.value}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
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
