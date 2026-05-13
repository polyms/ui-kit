import { useEffect, useRef, useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function Headings() {
  const headingRefs = useRef<Record<string, HTMLHeadingElement>>({})
  const [lineHeights, setLineHeights] = useState<Record<string, string>>({})
  const [fontSizes, setFontSizes] = useState<Record<string, string>>({})

  useEffect(() => {
    setLineHeights(
      Object.fromEntries(
        Object.entries(headingRefs.current).map(([heading, ref]) => [
          heading,
          getComputedStyle(ref).lineHeight,
        ])
      )
    )
    setFontSizes(
      Object.fromEntries(
        Object.entries(headingRefs.current).map(([heading, ref]) => [heading, getComputedStyle(ref).fontSize])
      )
    )
  }, [])

  return (
    <div className='card mt-2'>
      <table className='table-striped table-borderless table text-center align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='w-px'>Class</th>
            <th>Output</th>
            <th>Font Size</th>
            <th>Computed line-height</th>
          </tr>
        </thead>
        <tbody>
          {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(heading => (
            <tr key={heading}>
              <td>
                <code>.{heading}</code>
              </td>
              <td>
                <p
                  className={heading}
                  ref={el => {
                    if (el) headingRefs.current[heading] = el
                  }}
                >
                  {heading}. Page heading
                </p>
              </td>
              <td>{fontSizes[heading]}</td>
              <td>{lineHeights[heading]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
