import { ArrowDown01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Menu } from '@polyms/core'

export default function MenuDefault() {
  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Menu defaultOpen>
        <Menu.Trigger className='btn btn-primary outlined btn-lg mx-auto pe-2xs'>
          Song
          <HugeiconsIcon height={18} icon={ArrowDown01Icon} strokeWidth={2} width={18} />
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
              <HugeiconsIcon className='ms-auto' icon={ArrowRight01Icon} size={18} strokeWidth={2} />
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
