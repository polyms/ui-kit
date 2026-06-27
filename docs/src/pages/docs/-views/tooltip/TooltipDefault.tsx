import { Button, Tooltip } from '@polyms/core-ui'

export default function TooltipDefault() {
  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Tooltip.Provider>
        <Tooltip align='center' side='top' title='Save your changes before leaving'>
          <Button outlined variant='primary'>
            Save (Top)
          </Button>
        </Tooltip>
        <Tooltip align='center' side='right' title='Share this document with your team'>
          <Button outlined variant='primary'>
            Share (Right)
          </Button>
        </Tooltip>
        <Tooltip align='center' side='left' title='Download a copy to your device'>
          <Button outlined variant='primary'>
            Download (Left)
          </Button>
        </Tooltip>
        <Tooltip align='center' side='bottom' title='Permanently remove this item'>
          <Button outlined variant='primary'>
            Delete (Bottom)
          </Button>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  )
}
