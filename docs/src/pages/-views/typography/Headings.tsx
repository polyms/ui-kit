import { useEffect, useRef, useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function Headings() {
  const headingRefs = useRef<Record<string, HTMLHeadingElement>>({})
  const [headingHeights, setHeadingHeights] = useState<Record<string, number>>({})
  const [fontSizes, setFontSizes] = useState<Record<string, string>>({})

  useEffect(() => {
    setHeadingHeights(
      Object.fromEntries(
        Object.entries(headingRefs.current).map(([heading, ref]) => [
          heading,
          ref.getBoundingClientRect().height,
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
            <th>Line Height</th>
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
              <td>{headingHeights[heading]}px</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
