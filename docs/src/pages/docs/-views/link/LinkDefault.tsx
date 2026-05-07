import { Avatar } from '@polyms/core'

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
      <div className='flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='font-semibold text-slate-900'>Inline links</div>
        <p className='mt-1 text-slate-500 text-xs'>
          Anchors styled with <code className='text-slate-700'>.link</code> variants beside body copy.
        </p>
        <div className='mt-6 space-y-4 border-slate-100 border-t pt-5 text-sm'>
          <p className='text-slate-600'>
            Default:{' '}
            <a className='link' href='https://polyms.dev/'>
              View badges
            </a>
          </p>
          <p className='text-slate-600'>
            Primary:{' '}
            <a className='link link-primary' href='https://polyms.dev/'>
              Open card docs
            </a>
          </p>
          <p className='text-slate-600'>
            Danger:{' '}
            <a className='link link-danger' href='https://polyms.dev/'>
              Remove item
            </a>
          </p>
          <p className='text-slate-600'>
            Light:{' '}
            <a className='link link-light' href='https://polyms.dev/'>
              Secondary action
            </a>
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div>
          <div className='font-semibold text-slate-900'>Stretched link</div>
          <p className='mt-1 text-slate-500 text-xs'>
            Cards use <code className='text-slate-700'>.stretched-link</code> so the whole surface is
            clickable.
          </p>
        </div>

        {profiles.map(person => (
          <div
            className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-[box-shadow,border-color] hover:border-slate-300 hover:shadow-md'
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
                <div className='font-medium text-slate-900'>{person.name}</div>
                <p className='text-slate-500 text-xs'>{person.role}</p>
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
