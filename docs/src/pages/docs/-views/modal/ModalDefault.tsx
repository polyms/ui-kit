import { Alert, Button, Modal, type ModalSize, useBoolean } from '@polyms/core'
import { useState } from 'react'

const sizes = ['sm', undefined, 'lg', 'xl'] as ModalSize[]

export default function ModalDefault() {
  const { value: open, toggle, setFalse } = useBoolean(false)
  const [size, setSize] = useState<ModalSize>('full')

  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Modal onOpenChange={toggle} open={open}>
        {sizes.map(size => (
          <Modal.Trigger
            className='btn btn-primary btn-xl'
            key={size || 'default'}
            onClick={() => setSize(size)}
          >
            Open Modal {size}
          </Modal.Trigger>
        ))}
        <Modal.Trigger className='btn btn-primary outlined btn-xl col-span-2' onClick={() => setSize('full')}>
          Open Modal Full
        </Modal.Trigger>
        <Modal.Content centered={size !== 'full'} scrollable={!1} size={size} title='Modal Title'>
          <Modal.Header>User Profile Settings</Modal.Header>
          <Modal.Body>
            <div className='space-y-6'>
              {/* Profile Section */}
              <div>
                <h3 className='mb-3 font-semibold text-lg'>Profile Information</h3>
                <div className='space-y-4'>
                  <div>
                    <label className='mb-1 block font-medium text-sm' htmlFor='fullName'>
                      Full Name
                    </label>
                    <input
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                      defaultValue='John Doe'
                      id='fullName'
                      placeholder='Enter your name'
                      type='text'
                    />
                  </div>
                  <div>
                    <label className='mb-1 block font-medium text-sm' htmlFor='email'>
                      Email Address
                    </label>
                    <input
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                      defaultValue='john@example.com'
                      id='email'
                      placeholder='you@example.com'
                      type='email'
                    />
                  </div>
                  <div>
                    <label className='mb-1 block font-medium text-sm' htmlFor='bio'>
                      Bio
                    </label>
                    <textarea
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                      defaultValue='Software engineer passionate about building great products.'
                      id='bio'
                      placeholder='Tell us about yourself'
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className='border-slate-200 border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>Preferences</h3>
                <div className='space-y-3'>
                  <label className='flex items-center gap-3'>
                    <input className='h-4 w-4 rounded border-slate-300 text-primary-600' type='checkbox' />
                    <span className='text-sm'>Receive email notifications</span>
                  </label>
                  <label className='flex items-center gap-3'>
                    <input className='h-4 w-4 rounded border-slate-300 text-primary-600' type='checkbox' />
                    <span className='text-sm'>Enable dark mode automatically</span>
                  </label>
                  <label className='flex items-center gap-3'>
                    <input
                      className='h-4 w-4 rounded border-slate-300 text-primary-600'
                      defaultChecked
                      type='checkbox'
                    />
                    <span className='text-sm'>Show online status</span>
                  </label>
                </div>
              </div>

              {/* Nested Modal Demo */}
              <div className='border-slate-200 border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>Advanced Settings</h3>
                <p className='mb-4 text-slate-600 text-sm'>
                  Configure advanced options and integrations. Click below to open additional settings in a
                  nested modal.
                </p>
                <Modal>
                  <Modal.Trigger className='btn btn-primary outlined rounded-full'>
                    Open Advanced Settings
                  </Modal.Trigger>
                  <Modal.Content title='Advanced Settings'>
                    <Modal.Header>Advanced Configuration</Modal.Header>
                    <Modal.Body>
                      <div className='space-y-6'>
                        <div>
                          <h4 className='mb-3 font-medium'>API Access</h4>
                          <div className='space-y-3'>
                            <div>
                              <label className='mb-1 block font-medium text-sm' htmlFor='apiKey'>
                                API Key
                              </label>
                              <input
                                className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm'
                                defaultValue='sk_live_51H...'
                                id='apiKey'
                                readOnly
                                type='text'
                              />
                            </div>
                            <Button rounded size='sm'>
                              Regenerate API Key
                            </Button>
                          </div>
                        </div>

                        <div className='border-slate-200 border-t pt-6'>
                          <h4 className='mb-3 font-medium'>Webhooks</h4>
                          <div className='space-y-3'>
                            <div className='rounded-lg border border-slate-200 p-3'>
                              <div className='mb-2 flex items-center justify-between'>
                                <code className='text-sm'>https://api.example.com/webhook</code>
                                <span className='badge badge-primary rounded-full'>Active</span>
                              </div>
                              <div className='text-slate-600 text-xs'>Created 2 days ago</div>
                            </div>
                            <Button rounded size='sm' variant='primary'>
                              Add Webhook
                            </Button>
                          </div>
                        </div>

                        <div className='border-slate-200 border-t pt-6'>
                          <Alert badge='⚠️ Danger Zone' className='space-y-3' variant='danger'>
                            <p className='text-sm'>
                              Delete your account and all associated data. This action cannot be undone.
                            </p>
                            <Button rounded size='sm' variant='danger'>
                              Delete Account
                            </Button>
                          </Alert>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button content='center' rounded size='xl'>
                        Close
                      </Button>
                      <Button className='px-lg' content='center' rounded size='xl' variant='primary'>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </div>

              {/* Additional Info */}
              <div className='border-slate-200 border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>About This Modal</h3>
                <div className='space-y-3 text-slate-600 text-sm'>
                  <p>
                    This modal demonstrates scrollable content with multiple sections, form inputs, and nested
                    modals. The modal supports different sizes (sm, md, lg, xl, full) and can be centered or
                    full-screen.
                  </p>
                  <p>
                    Scroll behavior is automatically handled based on content height. When content exceeds the
                    viewport, the modal body becomes scrollable while keeping the header and footer fixed.
                  </p>
                  <Alert badge='💡 Tip' className='mt-4'>
                    Try different modal sizes using the buttons outside to see how the layout adapts. The
                    "Full" size uses the entire viewport while other sizes are centered with a max-width.
                  </Alert>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button content='center' onClick={setFalse} rounded size='xl'>
              Cancel
            </Button>
            <Button className='px-lg' content='center' onClick={setFalse} rounded size='xl' variant='primary'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  )
}
