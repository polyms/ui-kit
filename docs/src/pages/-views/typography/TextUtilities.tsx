import type React from 'react'

const TextUtilities: React.FC = () => {
  return (
    <section>
      <h2 className='h2'>Text Utilities</h2>
      <p className='mb-xs'>
        For headings, body text, lists, and more, use our text utilities and classes for styling and spacing.
        Includes support for styling links with hover states, too.
      </p>
      <table className='table align-middle'>
        <thead>
          <tr>
            <th>Class</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>.text-xs</td>
            <td className='text-xs'>Extra small text</td>
          </tr>
          <tr>
            <td>.text-sm</td>
            <td className='text-sm'>Small text</td>
          </tr>
          <tr>
            <td>.text-base</td>
            <td className='text-base'>Base text</td>
          </tr>
          <tr>
            <td>.text-lg</td>
            <td className='text-lg'>Large text</td>
          </tr>
          <tr>
            <td>.text-xl</td>
            <td className='text-xl'>Extra large text</td>
          </tr>
          <tr>
            <td>.font-light</td>
            <td className='font-light'>Light text</td>
          </tr>
          <tr>
            <td>.font-normal</td>
            <td className='font-normal'>Normal text</td>
          </tr>
          <tr>
            <td>.font-medium</td>
            <td className='font-medium'>Medium text</td>
          </tr>
          <tr>
            <td>.font-semibold</td>
            <td className='font-semibold'>Semibold text</td>
          </tr>
          <tr>
            <td>.font-bold</td>
            <td className='font-bold'>Bold text</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default TextUtilities
