import { Alert, Button, Field, Modal, type ModalSize, Switch } from '@polyms/core-ui'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const sizes = ['sm', undefined, 'lg', 'xl'] as ModalSize[]

export default function ModalDefault() {
  const { value: open, toggle, setFalse } = useBoolean(false)
  const [size, setSize] = useState<ModalSize>('full')

  return (
    <div className='m-auto grid grid-cols-2 gap-4'>
      <Modal onOpenChange={toggle} open={open}>
        {sizes.map(size => (
          <Modal.Trigger
            key={size || 'default'}
            onClick={() => setSize(size)}
            render={<Button size='xl' variant='primary' />}
          >
            Open Modal {size}
          </Modal.Trigger>
        ))}
        <Modal.Trigger
          className='col-span-2'
          onClick={() => setSize('full')}
          render={<Button outlined size='xl' variant='primary' />}
        >
          Open Modal Full
        </Modal.Trigger>
        <Modal.Content centered={size !== 'full'} scrollable size={size}>
          <Modal.Header>User Profile Settings</Modal.Header>
          <Modal.Body>
            <div className='space-y-6'>
              {/* Profile Section */}
              <div>
                <h3 className='mb-3 font-semibold text-lg'>Profile Information</h3>
                <div className='space-y-4'>
                  <Field>
                    <Field.Label>What should we call you?</Field.Label>
                    <Field.Control
                      autoFocus
                      defaultValue='Tifa Lockhart'
                      name='fullName'
                      placeholder='Full name'
                      type='text'
                    />
                  </Field>
                  <Field>
                    <Field.Label>Let me know your email?</Field.Label>
                    <Field.Control
                      defaultValue='tifa.lockhart@polyms.dev'
                      name='email'
                      placeholder='name@company.com'
                      type='email'
                    />
                  </Field>
                  <Field>
                    <Field.Label>Want to add a short bio?</Field.Label>
                    <Field.Control
                      defaultValue='Product designer at Polyms. Focused on design systems and accessible forms.'
                      name='bio'
                      placeholder='Short bio'
                      render={<textarea rows={3} />}
                    />
                  </Field>
                </div>
              </div>

              {/* Preferences Section */}
              <div className='border-line border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>Preferences</h3>
                <div className='flex flex-col gap-3'>
                  <Switch label='Receive email notifications' labelPos='start' />
                  <Switch label='Enable dark mode automatically' labelPos='start' />
                  <Switch defaultChecked label='Show online status' labelPos='start' />
                </div>
              </div>

              {/* Nested Modal Demo */}
              <div className='border-line border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>Advanced Settings</h3>
                <p className='mb-4 text-muted text-sm'>
                  Configure advanced options and integrations. Click below to open additional settings in a
                  nested modal.
                </p>
                <Modal>
                  <Modal.Trigger render={<Button outlined rounded variant='primary' />}>
                    Open Advanced Settings
                  </Modal.Trigger>
                  <Modal.Content scrollable size='lg'>
                    <Modal.Header>Advanced Configuration</Modal.Header>
                    <Modal.Body>
                      <div className='space-y-6'>
                        <div>
                          <h4 className='mb-3 font-medium'>API Access</h4>
                          <div className='space-y-3'>
                            <Field>
                              <Field.Label>API Key</Field.Label>
                              <Field.Control
                                autoFocus
                                className='font-mono text-sm'
                                defaultValue='sk_live_51H...'
                                readOnly
                                type='text'
                              />
                            </Field>
                            <Button rounded size='sm'>
                              Regenerate API Key
                            </Button>
                          </div>
                        </div>

                        <div className='border-line border-t pt-6'>
                          <h4 className='mb-3 font-medium'>Webhooks</h4>
                          <div className='space-y-3'>
                            <div className='rounded-lg border border-line p-3'>
                              <div className='mb-2 flex items-center justify-between'>
                                <code className='text-sm'>https://hooks.polyms.dev/v1/orders</code>
                                <span className='badge badge-primary rounded-full'>Active</span>
                              </div>
                              <div className='text-muted text-xs'>Created 3 days ago</div>
                            </div>
                            <Button rounded size='sm' variant='primary'>
                              Add Webhook
                            </Button>
                          </div>
                        </div>

                        <hr className='mt-4 mb-8 border-line' />

                        <Alert badge='⚠️ Danger Zone' className='mb-0 flex flex-col gap-3' variant='danger'>
                          <p className='text-sm'>
                            Delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button rounded size='sm' variant='danger'>
                            Delete Account
                          </Button>
                        </Alert>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Modal.Close render={<Button rounded size='xl' />}>Close</Modal.Close>
                      <Button className='px-lg' rounded size='xl' variant='primary'>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </div>

              {/* Additional Info */}
              <div className='border-line border-t pt-6'>
                <h3 className='mb-3 font-semibold text-lg'>Demo notes</h3>
                <div className='space-y-3 text-muted text-sm'>
                  <p>
                    Scrollable body with nested modal, form fields, and size variants (sm through full).
                    Header and footer stay fixed when content exceeds the viewport.
                  </p>
                  <Alert badge='Tip' className='mt-4'>
                    Use the trigger buttons outside to switch sizes. Full uses the entire viewport; other
                    sizes are centered with a max-width.
                  </Alert>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close render={<Button rounded size='xl' />}>Cancel</Modal.Close>
            <Button className='px-lg' onClick={setFalse} rounded size='xl' variant='primary'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  )
}
