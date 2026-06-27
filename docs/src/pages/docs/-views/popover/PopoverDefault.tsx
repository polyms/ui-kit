import { Button, Popover } from '@polyms/core-ui'

export default function PopoverDefault() {
  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Popover defaultOpen>
        <Popover.Trigger render={<Button variant='primary' />}>Top</Popover.Trigger>
        <Popover.Content
          description='This popover appears above the trigger element.'
          side='top'
          title='Top Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger render={<Button variant='primary' />}>Right</Popover.Trigger>
        <Popover.Content
          description='This popover appears to the right of the trigger.'
          side='right'
          title='Right Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger render={<Button variant='primary' />}>Left</Popover.Trigger>
        <Popover.Content
          description='This popover appears to the left of the trigger.'
          side='left'
          title='Left Popover'
        />
      </Popover>

      <Popover defaultOpen>
        <Popover.Trigger render={<Button variant='primary' />}>Bottom</Popover.Trigger>
        <Popover.Content
          description='This popover appears below the trigger element.'
          side='bottom'
          title='Bottom Popover'
        />
      </Popover>
    </div>
  )
}
