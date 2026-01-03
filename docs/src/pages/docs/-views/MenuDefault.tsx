import { ArrowDown01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Menu } from '@polyms/core'

export default function MenuDefault() {
  return (
    <div className='mt-4 flex w-full justify-between gap-xl'>
      <Menu defaultOpen>
        <Menu.Trigger className='btn outlined btn-lg mx-auto pe-2xs'>
          Song
          <HugeiconsIcon icon={ArrowDown01Icon} width={18} height={18} strokeWidth={2} />
        </Menu.Trigger>
        <Menu.Content title='Song Options'>
          <Menu.Item>
            Add to Library
            <span className='ms-auto flex items-center gap-3xs ps-sm'>
              <abbr className='no-underline' title='Command'>
                ⌘
              </abbr>
              <span className='font-mono'>L</span>
            </span>
          </Menu.Item>
          <Menu.Item>
            Add to Playlist
            <span className='ms-auto flex items-center gap-3xs ps-sm'>
              <abbr className='no-underline' title='Command'>
                ⌘
              </abbr>
              <span className='font-mono'>L</span>
            </span>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Play Next
            <span className='ms-auto flex items-center gap-3xs ps-sm'>
              <abbr className='no-underline' title='Command'>
                ⌘
              </abbr>
              <span className='font-mono'>N</span>
            </span>
          </Menu.Item>
          <Menu.Item disabled>
            Play Last
            <span className='ms-auto flex items-center gap-3xs ps-sm'>
              <abbr className='no-underline' title='Command'>
                ⌘
              </abbr>
              <span className='font-mono'>L</span>
            </span>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Favorite
            <span className='ms-auto flex items-center gap-3xs ps-sm'>
              <abbr className='no-underline' title='Command'>
                ⌘
              </abbr>
              <span className='font-mono'>F</span>
            </span>
          </Menu.Item>
          <Menu.Item variant='danger'>Share</Menu.Item>
          <Menu.SubmenuRoot>
            <Menu.SubmenuTrigger>
              Export
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} className='ms-auto' />
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
