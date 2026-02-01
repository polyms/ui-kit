import { MouseLeftClick06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@polyms/core'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const sizes = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

export default function ButtonSizes() {
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
    <div className='card'>
      <table className='table-striped table-borderless table-lg table text-center align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='w-px text-center'>size</th>
            <th className='text-center'>icon</th>
            <th className='text-center'>font-size</th>
            <th className='text-center'>line-height</th>
            <th className='text-center'>height</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td className='text-center'>
                <Button
                  id={`btn-${size}`}
                  key={size}
                  outlined
                  ref={ref => {
                    btnRefs.current[size] = ref
                  }}
                  rounded
                  size={size === 'default' ? undefined : size}
                >
                  <HugeiconsIcon
                    icon={MouseLeftClick06Icon}
                    size={styles[size]?.lineHeight || 16}
                    strokeWidth={2}
                  />

                  {size !== 'default' ? `btn-${size}` : 'default'}
                </Button>
              </td>
              <td className='text-center'>
                <Button
                  icon
                  id={`btn-${size}`}
                  key={size}
                  outlined
                  ref={ref => {
                    btnRefs.current[size] = ref
                  }}
                  rounded
                  size={size === 'default' ? undefined : size}
                >
                  <HugeiconsIcon
                    icon={MouseLeftClick06Icon}
                    size={styles[size]?.lineHeight || 16}
                    strokeWidth={2}
                  />
                </Button>
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
