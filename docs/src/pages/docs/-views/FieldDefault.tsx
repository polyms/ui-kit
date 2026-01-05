import { CancelCircleHalfDotIcon, SearchList02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Field } from '@polyms/core'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const sizes = ['sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const

export default function FieldDefault() {
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
    refresh()
  }, [])

  return (
    <div className='flex w-full flex-col'>
      <h1 className='border-b text-2xl'>Sizes</h1>
      <table className='table-striped table-borderless table text-center align-middle'>
        <thead>
          <tr>
            <th>size</th>
            <th>font-size</th>
            <th>line-height</th>
            <th>height</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td>
                <Field
                  key={size}
                  id={`field-demo-${size}`}
                  size={size === 'default' ? undefined : size}
                  rounded
                  required
                  // invalid
                >
                  <Field.Label>{`Form Control: ${size}`}</Field.Label>
                  <HugeiconsIcon icon={SearchList02Icon} strokeWidth={2} className='icon-start' />
                  <HugeiconsIcon icon={CancelCircleHalfDotIcon} strokeWidth={2} className='icon-end' />
                  <Field.Control
                    rounded
                    placeholder={size !== 'default' ? `.field-${size}` : 'default'}
                    ref={ref => {
                      refs.current[size] = ref
                    }}
                  />
                  <Field.Description>{`Description for ${size}`}</Field.Description>
                  <Field.Feedback>Error message for {size}</Field.Feedback>
                </Field>
              </td>
              <td>{styles[size]?.fontSize}</td>
              <td>{styles[size]?.lineHeight}</td>
              <td>{styles[size]?.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
