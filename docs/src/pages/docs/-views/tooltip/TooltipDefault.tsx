import { Tooltip } from '@polyms/core'

export default function TooltipDefault() {
  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Tooltip.Provider>
        <Tooltip align='center' open side='top' title='Save your changes before leaving'>
          <button className='btn btn-primary outlined' type='button'>
            Save (Top)
          </button>
        </Tooltip>
        <Tooltip align='center' open side='right' title='Share this document with your team'>
          <button className='btn btn-primary outlined' type='button'>
            Share (Right)
          </button>
        </Tooltip>
        <Tooltip align='center' open side='left' title='Download a copy to your device'>
          <button className='btn btn-primary outlined' type='button'>
            Download (Left)
          </button>
        </Tooltip>
        <Tooltip align='center' open side='bottom' title='Permanently remove this item'>
          <button className='btn btn-primary outlined' type='button'>
            Delete (Bottom)
          </button>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  )
}
