import type React from 'react'

const ColoredLinks: React.FC = () => {
  return (
    <section>
      <h2 className='h2'>Colored links</h2>
      <p className='mb-2xs'>
        You can use the .link-* classes to colorize links. Unlike the .text-* classes, these classes have a
        :hover and :focus state. Some of the link styles use a relatively light foreground color, and should
        only be used on a dark background in order to have sufficient contrast.
      </p>

      <table className='table'>
        <thead>
          <tr>
            <th>Class</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>.link</td>
            <td>
              <a className='link' href='#link'>
                <span>link</span>
              </a>
            </td>
          </tr>
          <tr>
            <td>.link-primary</td>
            <td>
              <a className='link link-primary' href='#link-primary'>
                <span>link primary</span>
              </a>
            </td>
          </tr>
          <tr>
            <td>.link-danger</td>
            <td>
              <a className='link link-danger' href='#link-danger'>
                <span>link danger</span>
              </a>
            </td>
          </tr>
          <tr>
            <td>.link-light</td>
            <td>
              <a className='link link-light' href='#link-light'>
                <span>link light</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default ColoredLinks
