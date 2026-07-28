import { AltArrowDown, ArrowRight } from '@polyms/icons/bold-duotone'
import { Button, Menu } from '@polyms/ui-kit'

export default function MenuDefault() {
  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Menu defaultOpen>
        <Menu.Trigger render={<Button className='mx-auto pe-2xs' outlined size='lg' variant='primary' />}>
          Song
          <AltArrowDown size={18} />
        </Menu.Trigger>
        <Menu.Content title='Song Options'>
          <Menu.Item>
            Add to Library
            <Menu.Command meta sequence='L' />
          </Menu.Item>
          <Menu.Item>
            Add to Playlist
            <Menu.Command meta sequence='L+I' />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Play Next
            <Menu.Command meta sequence='N' />
          </Menu.Item>
          <Menu.Item disabled>
            Play Last
            <Menu.Command meta sequence='L' />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Favorite
            <Menu.Command meta sequence='F' />
          </Menu.Item>
          <Menu.Item variant='danger'>Share</Menu.Item>
          <Menu.SubmenuRoot>
            <Menu.SubmenuTrigger>
              Export
              <ArrowRight className='ms-auto' size={18} />
            </Menu.SubmenuTrigger>
            <Menu.Content sideOffset={0}>
              <Menu.Item>PDF</Menu.Item>
              <Menu.Item>PNG</Menu.Item>
              <Menu.Item>SVG</Menu.Item>
            </Menu.Content>
          </Menu.SubmenuRoot>
        </Menu.Content>
      </Menu>
    </div>
  )
}
