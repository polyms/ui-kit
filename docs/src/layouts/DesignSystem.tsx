export function DesignSystem() {
  return (
    <>
      <h2 className='h2'>Colors:</h2>
      <p className='mb-4'>
        You can use <code>bg-primary</code> for the default primary color (equivalent to{' '}
        <code>bg-primary-500</code>), or specify a shade with <code>bg-primary-100</code>,{' '}
        <code>bg-primary-200</code>, etc. This pattern works for all color variants like{' '}
        <code>bg-secondary</code>, <code>bg-danger</code>, and <code>bg-neutral</code>:
      </p>
      <table className='table align-middle'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='w-px text-center'>50</th>
            <th className='w-px text-center'>100</th>
            <th className='w-px text-center'>200</th>
            <th className='w-px text-center'>300</th>
            <th className='w-px text-center'>400</th>
            <th className='w-px text-center'>500</th>
            <th className='w-px text-center'>600</th>
            <th className='w-px text-center'>700</th>
            <th className='w-px text-center'>800</th>
            <th className='w-px text-center'>900</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>primary</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-primary-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
          <tr>
            <td>secondary</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-secondary-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
          <tr>
            <td>info</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-info-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
          <tr>
            <td>success</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-success-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
          <tr>
            <td>danger</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-danger-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-100 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-200 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-300 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-400 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-500 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-600 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-700 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-800 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-neutral-900 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
        </tbody>
      </table>

      <p className='pt-4'>Here's a full list of utilities that use your color palette.</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Utility</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>bg-*-{'{50,100...900}'}</code>
            </td>
            <td>Sets the background color of an element</td>
          </tr>
          <tr>
            <td>
              <code>text-*-{'{50,100...900}'}</code>
            </td>
            <td>Sets the text color of an element</td>
          </tr>
          <tr>
            <td>
              <code>border-*-{'{50,100...900}'}</code>
            </td>
            <td>Sets the border color of an element</td>
          </tr>
        </tbody>
      </table>

      <h2 className='mt-4 mb-xs font-semibold text-2xl'>Interactive Colors:</h2>
      <table className='table align-middle'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='w-px text-center'>10</th>
            <th className='w-px text-center'>20</th>
            <th className='w-px text-center'>30</th>
            <th className='w-px text-center'>40</th>
            <th className='w-px text-center'>50</th>
            <th className='w-px text-center'>60</th>
            <th className='w-px text-center'>70</th>
            <th className='w-px text-center'>80</th>
            <th className='w-px text-center'>90</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bg-interaction/--</td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/10 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/20 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/30 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/40 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/50 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/60 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/70 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/80 outline outline-black/10 -outline-offset-1' />
            </td>
            <td>
              <div className='h-12 w-12 rounded-lg bg-interaction/90 outline outline-black/10 -outline-offset-1' />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
