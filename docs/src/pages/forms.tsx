import {
  Calendar03Icon,
  Eraser01Icon,
  MailAtSign02Icon,
  SearchList02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Field, NumberField, Select } from '@polyms/core'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { useState } from 'react'

import { Header } from './-views/DemoHeader'

export const Route = createFileRoute('/forms')({
  component: FormsPage,
})

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const planItems = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]

const roleItems = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const statusItems = [
  { label: 'Mọi trạng thái', value: 'any' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Đã lưu trữ', value: 'archived' },
]

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function PreviewSection({
  children,
  className,
  description,
  title,
}: {
  children: React.ReactNode
  className?: string
  description: string
  title: string
}) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100/80',
        'md:p-8',
        className
      )}
    >
      <h2 className='font-semibold text-lg text-slate-900 tracking-tight'>{title}</h2>
      <p className='mt-1 max-w-2xl text-pretty text-slate-600 text-sm leading-relaxed'>{description}</p>
      <div className='mt-6'>{children}</div>
    </section>
  )
}

function LoginFormCase() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      className='mx-auto flex w-full max-w-sm flex-col gap-4'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <Field required>
        <Field.Label>Email</Field.Label>
        <HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
        <Field.Control
          autoComplete='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='you@company.com'
          rounded
          type='email'
          value={email}
        />
      </Field>
      <Field required>
        <Field.Label>Mật khẩu</Field.Label>
        <Field.Control
          autoComplete='current-password'
          onChange={e => setPassword(e.target.value)}
          placeholder='••••••••'
          rounded
          type='password'
          value={password}
        />
        <Field.Description>Tối thiểu 8 ký tự, có chữ hoa và số.</Field.Description>
      </Field>
      <div className='flex flex-col gap-2 pt-1 sm:flex-row sm:items-center'>
        <Button
          className='w-full sm:flex-1'
          disabled={!email || !password}
          rounded
          type='submit'
          variant='primary'
        >
          Đăng nhập
        </Button>
        <Button className='w-full sm:w-auto' outlined rounded type='button' variant='light'>
          Quên mật khẩu?
        </Button>
      </div>
    </form>
  )
}

function FilterBarCase() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<string | null>('all')
  const [status, setStatus] = useState<string | null>('any')

  return (
    <div className='flex flex-col gap-3 lg:flex-row lg:items-end'>
      <Field className='min-w-0 flex-1'>
        <Field.Label>Tìm kiếm</Field.Label>
        <HugeiconsIcon className='icon-start' icon={SearchList02Icon} strokeWidth={2} />
        {query ? (
          <HugeiconsIcon
            className='icon-end origin-top rotate-180'
            icon={Eraser01Icon}
            onClick={() => setQuery('')}
            strokeWidth={2}
          />
        ) : null}
        <Field.Control
          onChange={e => setQuery(e.target.value)}
          placeholder='Tên, email hoặc ID…'
          rounded
          value={query}
        />
      </Field>
      <Field className='w-full lg:w-44'>
        <Field.Label>Vai trò</Field.Label>
        <Select items={roleItems} onValueChange={setRole} value={role}>
          <Select.Trigger className='w-full rounded-full' placeholder='Vai trò'>
            {item => item?.label ?? 'Vai trò'}
          </Select.Trigger>
          <Select.Content>
            {roleItems.map(item => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </Field>
      <Field className='w-full lg:w-48'>
        <Field.Label>Trạng thái</Field.Label>
        <Select items={statusItems} onValueChange={setStatus} value={status}>
          <Select.Trigger className='w-full rounded-full' placeholder='Trạng thái'>
            {item => item?.label ?? 'Trạng thái'}
          </Select.Trigger>
          <Select.Content>
            {statusItems.map(item => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </Field>
      <div className='flex shrink-0 gap-2 lg:pb-0.5'>
        <Button
          onClick={() => {
            setQuery('')
            setRole('all')
            setStatus('any')
          }}
          outlined
          rounded
          type='button'
          variant='light'
        >
          Xóa lọc
        </Button>
        <Button rounded type='button' variant='primary'>
          Áp dụng
        </Button>
      </div>
    </div>
  )
}

function CreateWorkspaceCase() {
  const [name, setName] = useState('Polyms Studio')
  const [slug, setSlug] = useState('polyms-studio')
  const [plan, setPlan] = useState<string | null>('pro')
  const [seats, setSeats] = useState(5)

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className='grid gap-4 sm:grid-cols-2'>
        <Field required>
          <Field.Label>Tên workspace</Field.Label>
          <Field.Control
            onChange={e => setName(e.target.value)}
            placeholder='Acme Corp'
            rounded
            value={name}
          />
        </Field>
        <Field>
          <Field.Label>Slug URL</Field.Label>
          <Field.Control
            onChange={e => setSlug(e.target.value)}
            placeholder='acme-corp'
            rounded
            value={slug}
          />
          <Field.Description>Dùng trong link mời thành viên.</Field.Description>
        </Field>
        <Field>
          <Field.Label>Gói</Field.Label>
          <Select items={planItems} onValueChange={setPlan} value={plan}>
            <Select.Trigger className='w-full rounded-full' placeholder='Chọn gói'>
              {item => item?.label ?? 'Chọn gói'}
            </Select.Trigger>
            <Select.Content>
              {planItems.map(item => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <NumberField
          label='Số ghế'
          max={99}
          min={1}
          onValueChange={v => setSeats(v ?? 1)}
          rounded
          value={seats}
        />
      </div>
      <div className='flex flex-wrap items-center justify-end gap-2 border-slate-200/80 border-t pt-4'>
        <Button rounded type='button'>
          Hủy
        </Button>
        <Button rounded type='submit' variant='primary'>
          Tạo workspace
        </Button>
      </div>
    </form>
  )
}

function ProfileSettingsCase() {
  const [displayName, setDisplayName] = useState('Tifa Lockhart')

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
      <Field className='min-w-0 flex-1' size='lg'>
        <Field.Label>Tên hiển thị</Field.Label>
        <HugeiconsIcon className='icon-start' icon={UserIcon} strokeWidth={2} />
        <Field.Control
          onChange={e => setDisplayName(e.target.value)}
          placeholder='Tên của bạn'
          rounded
          value={displayName}
        />
      </Field>
      <Button rounded size='lg' type='button' variant='primary'>
        Lưu thay đổi
      </Button>
    </div>
  )
}

function InlineFieldButtonCase() {
  const [invite, setInvite] = useState('')

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-stretch'>
      <Field className='min-w-0 flex-1'>
        <Field.Label>Mời qua email</Field.Label>
        <HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
        <Field.Control
          onChange={e => setInvite(e.target.value)}
          placeholder='colleague@company.com'
          rounded
          type='email'
          value={invite}
        />
      </Field>
      <Button className='sm:self-end' disabled={!invite} rounded type='button' variant='primary'>
        Gửi lời mời
      </Button>
    </div>
  )
}

type SizeRowButtonSize = 'sm' | 'lg' | 'xl'

const sizeRows: { label: string; fieldSize?: Field.Props['size']; buttonSize?: SizeRowButtonSize }[] = [
  { label: 'default' },
  { label: 'sm', fieldSize: 'sm', buttonSize: 'sm' },
  { label: 'lg', fieldSize: 'lg', buttonSize: 'lg' },
  { label: 'xl', fieldSize: 'xl', buttonSize: 'xl' },
]

function SizeAlignmentCase() {
  return (
    <div className='overflow-x-auto'>
      <table className='table-borderless table w-full min-w-xl text-left align-middle text-sm'>
        <thead>
          <tr className='text-slate-500'>
            <th className='w-24 pb-3 font-medium'>Size</th>
            <th className='pb-3 font-medium'>Field + Button (pill)</th>
            <th className='pb-3 font-medium'>Field + Button (góc chuẩn)</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {sizeRows.map(({ label, fieldSize, buttonSize }) => (
            <tr key={label}>
              <td className='py-4 font-mono text-slate-600 text-xs'>{label}</td>
              <td className='py-4 pe-4'>
                <div className='flex max-w-md flex-wrap items-center gap-2'>
                  <Field className='min-w-0 flex-1' size={fieldSize}>
                    <Field.Control placeholder={`field-${label}`} rounded />
                  </Field>
                  <Button rounded size={buttonSize} variant='primary'>
                    Action
                  </Button>
                </div>
              </td>
              <td className='py-4'>
                <div className='flex max-w-md flex-wrap items-center gap-2'>
                  <Field className='min-w-0 flex-1' size={fieldSize}>
                    <Field.Control placeholder={`field-${label}`} />
                  </Field>
                  <Button size={buttonSize} variant='primary'>
                    Action
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ModalFooterCase() {
  const [date, setDate] = useState('')

  return (
    <div className='mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-100'>
      <h3 className='font-semibold text-base text-slate-900'>Lên lịch xuất bản</h3>
      <p className='mt-1 text-slate-600 text-sm'>Footer modal: field và nút cùng hàng, căn đáy.</p>
      <Field className='mt-5'>
        <Field.Label>Ngày giờ</Field.Label>
        <HugeiconsIcon className='icon-start' icon={Calendar03Icon} strokeWidth={2} />
        <Field.Control
          onChange={e => setDate(e.target.value)}
          placeholder='Chọn ngày…'
          rounded
          type='datetime-local'
          value={date}
        />
      </Field>
      <div className='mt-6 flex flex-wrap justify-end gap-2'>
        <Button rounded type='button'>
          Hủy
        </Button>
        <Button disabled={!date} rounded type='button' variant='primary'>
          Xác nhận
        </Button>
      </div>
    </div>
  )
}

function FormsPage() {
  return (
    <>
      <Header />

      <div className='docs-demo-shell isolate overflow-x-clip bg-slate-50 text-slate-900'>
        <div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute top-64 right-0 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl' />
        </div>

        <main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
          <section className='mx-auto w-full max-w-5xl px-5 pt-10 pb-8 md:px-8 md:pt-12'>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 font-medium text-slate-600 text-xs shadow-sm ring-1 ring-slate-100/80'>
              <span className='flex size-1.5 rounded-full bg-primary-500' />
              Forms playground
            </div>
            <h1 className='mt-5 font-semibold text-3xl text-slate-900 tracking-tight md:text-4xl'>
              Field × Button trên cùng một trang
            </h1>
            <p className='mt-3 max-w-3xl text-pretty text-base text-slate-600 leading-relaxed'>
              Preview các layout form thường gặp trong app thật — đăng nhập, lọc danh sách, tạo bản ghi, cài
              đặt và bảng so size — để so chiều cao, bo góc (<code className='text-xs'>--control-radius</code>
              ) và căn hàng giữa input và nút.
            </p>
          </section>

          <section className='mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 pb-16 md:px-8 md:pb-20'>
            <PreviewSection
              description='Input có icon, nút primary + ghost cùng chiều cao khi dùng rounded-full.'
              title='1. Đăng nhập'
            >
              <LoginFormCase />
            </PreviewSection>

            <PreviewSection
              description='Search + 2 select + nhóm nút trên một hàng (responsive stack trên mobile).'
              title='2. Thanh lọc danh sách'
            >
              <FilterBarCase />
            </PreviewSection>

            <PreviewSection
              description='Grid 2 cột: text, select, NumberField cùng size default — footer Cancel / Submit.'
              title='3. Tạo workspace'
            >
              <CreateWorkspaceCase />
            </PreviewSection>

            <PreviewSection
              description='Field size lg và Button size lg trên một hàng — pattern trang Settings.'
              title='4. Cài đặt hồ sơ (size lg)'
            >
              <ProfileSettingsCase />
            </PreviewSection>

            <PreviewSection
              description='Email + nút gửi: kiểm tra căn đáy khi label chỉ có ở field bên trái.'
              title='5. Mời thành viên (inline)'
            >
              <InlineFieldButtonCase />
            </PreviewSection>

            <PreviewSection
              description='So sánh pill vs góc mặc định theo từng size — dùng khi review radius sau refactor CSS.'
              title='6. Ma trận size (alignment)'
            >
              <SizeAlignmentCase />
            </PreviewSection>

            <PreviewSection
              className='bg-slate-100/50'
              description='Khối giả lập modal: field full width, action bar bên phải.'
              title='7. Footer dialog'
            >
              <ModalFooterCase />
            </PreviewSection>
          </section>
        </main>
      </div>
    </>
  )
}
