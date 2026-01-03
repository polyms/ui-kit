import { useEffect, useRef, useState } from 'react'

const Headings: React.FC = () => {
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
    <section>
      <h2 className='h2'>Headings</h2>
      <p className='mb-2xs'>
        All headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, are available.
      </p>

      <table className='table align-middle'>
        <thead>
          <tr>
            <th className='w-px'>Class</th>
            <th>Example</th>
            <th>Font Size</th>
            <th>Line Height</th>
          </tr>
        </thead>
        <tbody>
          {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(heading => (
            <tr key={heading}>
              <td>.{heading}</td>
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
    </section>
  )
}

export default Headings
