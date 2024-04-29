import { createFileRoute } from '@tanstack/react-router'

const Page = () => {
  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>
              Extra small<div className='fw-normal'>&lt;576px</div>
            </th>
            <th>
              Small<div className='fw-normal'>≥576px</div>
            </th>
            <th>
              Medium<div className='fw-normal'>≥768px</div>
            </th>
            <th>
              Large<div className='fw-normal'>≥992px</div>
            </th>
            <th>
              X-Large<div className='fw-normal'>≥1200px</div>
            </th>
            <th>
              XX-Large<div className='fw-normal'>≥1400px</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>.container</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>540px</td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-sm</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>540px</td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-md</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-lg</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>960px</td>
            <td>1140px</td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-xl</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>1140px</td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-xxl</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>1320px</td>
          </tr>
          <tr>
            <td>
              <code>.container-fluid</code>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
            <td>
              <span className='text-body-secondary'>100%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const Route = createFileRoute('/container')({
  component: Page,
})
