import { SearchList02Icon, Sent02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Offcanvas } from '@polyms/core'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Direction = 'left' | 'right' | 'up' | 'down'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function OffcanvasDefault() {
  const directions: Direction[] = ['left', 'right', 'up', 'down']
  const teamMembers = ['Linh Nguyen', 'Duy Tran', 'Nora Le', 'An Pham', 'Minh Hoang']
  const quickActions = ['Create task', 'Share update', 'Export report', 'Pin dashboard', 'Invite member']

  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      {directions.map(direction => (
        <Offcanvas key={direction} swipeDirection={direction}>
          <Offcanvas.Trigger className='btn btn-primary'>Open {direction}</Offcanvas.Trigger>
          <Offcanvas.Content closeButton>
            <Offcanvas.Header>
              <Offcanvas.Title>
                <span className='flex items-center gap-2'>
                  <HugeiconsIcon icon={SearchList02Icon} size={18} strokeWidth={2} />
                  Project Overview
                  <span className='badge badge-info rounded-full'>Live</span>
                </span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Description>
              Last synced 2 minutes ago. This panel appears from the {direction} edge and can be dismissed
              toward {direction}.
            </Offcanvas.Description>
            <Offcanvas.Body>
              <div className='space-y-4'>
                <section className='rounded-lg border border-line p-4'>
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold text-fg text-sm'>Sprint Health</p>
                    <span className='badge badge-warning rounded-full'>2 At Risk</span>
                  </div>
                  <p className='mt-1 text-muted text-sm'>
                    18/24 tickets completed, 2 items are at risk due to API dependencies.
                  </p>
                </section>

                <section className='rounded-lg border border-line p-4'>
                  <p className='font-semibold text-fg text-sm'>Owners</p>
                  <ul className='mt-2 space-y-2 text-fg text-sm'>
                    {teamMembers.map(member => (
                      <li className='flex items-center justify-between' key={member}>
                        <span>{member}</span>
                        <span className='badge badge-primary rounded-full'>Active</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className='rounded-lg border border-line p-4'>
                  <div className='flex items-center gap-2'>
                    <HugeiconsIcon icon={Sent02Icon} size={16} strokeWidth={2} />
                    <p className='font-semibold text-fg text-sm'>Quick Actions</p>
                  </div>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {quickActions.map(action => (
                      <button className='btn btn-primary btn-sm rounded-full' key={action} type='button'>
                        {action}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </Offcanvas.Body>
          </Offcanvas.Content>
        </Offcanvas>
      ))}
    </div>
  )
}
