import { Avatar } from '@polyms/core-ui'

const inlineLinks = [
  { label: 'Default', className: 'link', text: 'View badges' },
  { label: 'Primary', className: 'link link-primary', text: 'Open card docs' },
  { label: 'Success', className: 'link link-success', text: 'View status' },
  { label: 'Info', className: 'link link-info', text: 'Learn more' },
  { label: 'Warning', className: 'link link-warning', text: 'Review changes' },
  { label: 'Danger', className: 'link link-danger', text: 'Remove item' },
  { label: 'Light', className: 'link link-light', text: 'Secondary action' },
  { label: 'Dark', className: 'link link-dark', text: 'Breadcrumb trail' },
] as const

const profiles = [
  {
    action: 'View profile',
    href: 'https://polyms.dev/',
    name: 'Aliah Lane',
    role: 'Design lead · Core UI',
    src: 'https://untitledui.com/images/avatars/aliah-lane',
  },
  {
    action: 'Open conversation',
    href: 'https://polyms.dev/',
    name: 'Rhea Levine',
    role: 'Engineering · Billing',
    src: 'https://untitledui.com/images/avatars/rhea-levine',
  },
] as const

export default function LinkDefault() {
  return (
    <div className='m-auto grid max-w-3xl gap-8 px-4 md:grid-cols-2 md:gap-10'>
      <div className='flex flex-col rounded-2xl border border-line bg-body p-6 shadow-sm'>
        <div className='font-semibold text-fg'>Inline links</div>
        <p className='mt-1 text-muted text-xs'>
          Anchors styled with <code className='text-fg'>.link</code> variants beside body copy.
        </p>
        <div className='mt-6 space-y-4 border-line border-t pt-5 text-sm'>
          {inlineLinks.map(item => (
            <p className='text-muted' key={item.label}>
              {item.label}:{' '}
              <a className={item.className} href='https://polyms.dev/'>
                {item.text}
              </a>
            </p>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div>
          <div className='font-semibold text-fg'>Stretched link</div>
          <p className='mt-1 text-muted text-xs'>
            Cards use <code className='text-fg'>.stretched-link</code> so the whole surface is clickable.
          </p>
        </div>

        {profiles.map(person => (
          <div
            className='relative overflow-hidden rounded-2xl border border-line bg-body p-4 shadow-sm transition-[box-shadow,border-color] hover:shadow-md'
            key={person.name}
          >
            <div className='flex gap-4'>
              <Avatar className='size-12 shrink-0'>
                <Avatar.Image alt={person.name} className='avatar-image' src={person.src} />
                <Avatar.Fallback className='avatar-fallback' delay={300}>
                  {person.name
                    .split(' ')
                    .map(part => part[0])
                    .join('')}
                </Avatar.Fallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='font-medium text-fg'>{person.name}</div>
                <p className='text-muted text-xs'>{person.role}</p>
              </div>
            </div>
            <a className='link link-primary stretched-link mt-3 inline-block text-sm' href={person.href}>
              {person.action}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
