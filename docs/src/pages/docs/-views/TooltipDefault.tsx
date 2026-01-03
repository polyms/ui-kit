import { Tooltip } from '@polyms/core'

export default function TooltipDefault() {
  return (
    <Tooltip.Provider>
      <Tooltip align='center' side='top' title='Content'>
        <button type='button' className='btn btn-primary mx-auto'>
          Hover to see tooltip
        </button>
      </Tooltip>
      <Tooltip align='center' side='bottom' title='Content'>
        <button type='button' className='btn btn-primary mx-auto'>
          Hover to see tooltip
        </button>
      </Tooltip>
      <Tooltip align='center' side='left' title='Content'>
        <button type='button' className='btn btn-primary mx-auto'>
          Hover to see tooltip
        </button>
      </Tooltip>
      <Tooltip align='center' side='right' title='Content'>
        <button type='button' className='btn btn-primary mx-auto'>
          Hover to see tooltip
        </button>
      </Tooltip>
    </Tooltip.Provider>
  )
}
