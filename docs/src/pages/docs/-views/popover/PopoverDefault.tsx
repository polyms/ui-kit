import { Popover } from '@polyms/core'

export default function PopoverDefault() {
  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Popover defaultOpen>
        <Popover.Trigger className='btn btn-primary'>Top</Popover.Trigger>
        <Popover.Content
          description='This popover appears above the trigger element.'
          side='top'
          title='Top Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger className='btn btn-primary'>Right</Popover.Trigger>
        <Popover.Content
          description='This popover appears to the right of the trigger.'
          side='right'
          title='Right Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger className='btn btn-primary'>Left</Popover.Trigger>
        <Popover.Content
          description='This popover appears to the left of the trigger.'
          side='left'
          title='Left Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger className='btn btn-primary'>Bottom</Popover.Trigger>
        <Popover.Content
          description='This popover appears below the trigger element.'
          side='bottom'
          title='Bottom Popover'
        />
      </Popover>
    </div>
  )
}
