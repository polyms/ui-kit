import {
  Calendar03Icon,
  Eraser01Icon,
  MailAtSign02Icon,
  SearchList02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Checkbox, Field, NumberField, Radio, RadioGroup, Select } from '@polyms/core'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { Header } from './-views/DemoHeader'

export const Route = createFileRoute('/forms')({
  component: FormsPage,
  staticData: { layout: 'playground' },
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
        'md:p-8 dark:border-line dark:bg-surface/80 dark:ring-line/40',
        className
      )}
    >
      <h2 className='font-semibold text-fg text-lg tracking-tight'>{title}</h2>
      <p className='mt-1 max-w-2xl text-pretty text-muted text-sm leading-relaxed'>{description}</p>
      <div className='mt-6'>{children}</div>
    </section>
  )
}

function LoginFormCase() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

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
      <div className='flex items-center justify-between gap-3'>
        <Checkbox checked={remember} onCheckedChange={setRemember}>
          Ghi nhớ đăng nhập
        </Checkbox>
        <a className='link link-primary text-xs' href='#forgot'>
          Quên mật khẩu?
        </a>
      </div>
      <Button className='w-full' disabled={!email || !password} rounded type='submit' variant='primary'>
        Đăng nhập
      </Button>
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
      <div className='flex flex-wrap items-center justify-end gap-2 border-slate-200/80 border-t pt-4 dark:border-line'>
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
          <tr className='text-muted'>
            <th className='w-24 pb-3 font-medium'>Size</th>
            <th className='pb-3 font-medium'>Field + Button (pill)</th>
            <th className='pb-3 font-medium'>Field + Button (góc chuẩn)</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 dark:divide-line'>
          {sizeRows.map(({ label, fieldSize, buttonSize }) => (
            <tr key={label}>
              <td className='py-4 font-mono text-muted text-xs'>{label}</td>
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

const notificationItems = [
  { id: 'product', label: 'Cập nhật sản phẩm', desc: 'Tính năng mới, ra mắt và bản vá.' },
  { id: 'security', label: 'Cảnh báo bảo mật', desc: 'Đăng nhập lạ, đổi mật khẩu.' },
  { id: 'billing', label: 'Hoá đơn & thanh toán', desc: 'Sao kê hàng tháng, thẻ hết hạn.' },
] as const

function NotificationPreferencesCase() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    product: true,
    security: true,
    billing: false,
  })

  const allChecked = useMemo(() => notificationItems.every(i => checked[i.id]), [checked])
  const noneChecked = useMemo(() => notificationItems.every(i => !checked[i.id]), [checked])
  return (
    <div className='mx-auto flex w-full max-w-lg flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-5'>
      <Checkbox
        checked={allChecked}
        className='border-slate-100 border-b pb-3'
        indeterminate={!allChecked && !noneChecked}
        onCheckedChange={next => setChecked(Object.fromEntries(notificationItems.map(i => [i.id, next])))}
        size='lg'
      >
        <span className='font-semibold'>Tất cả thông báo</span>
      </Checkbox>
      <div className='flex flex-col gap-2 ps-7'>
        {notificationItems.map(i => (
          <Checkbox
            checked={!!checked[i.id]}
            key={i.id}
            onCheckedChange={next => setChecked(prev => ({ ...prev, [i.id]: next }))}
          >
            <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
              <span>{i.label}</span>
              <span className='font-normal text-muted text-xs'>{i.desc}</span>
            </span>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}

const planCardOptions = [
  { id: 'free', name: 'Free', price: '$0', desc: '1 dự án · cá nhân.' },
  { id: 'pro', name: 'Pro', price: '$19', desc: 'Team nhỏ · không giới hạn dự án.' },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'SSO · audit log · SLA.' },
]

function PlanRadioCardsCase() {
  const [selected, setSelected] = useState('pro')

  return (
    <Field>
      <Field.Label>Chọn gói thanh toán</Field.Label>
      <RadioGroup className='mt-1 grid gap-3 sm:grid-cols-3' onValueChange={setSelected} value={selected}>
        {planCardOptions.map(plan => (
          <Radio
            className={clsx(
              'radio cursor-pointer rounded-xl border bg-white p-4 transition',
              'hover:border-primary-600/60',
              'data-checked:border-primary-600 data-checked:bg-primary-50/40',
              'data-checked:ring-3 data-checked:ring-primary-600/15',
              selected === plan.id ? 'border-primary-600' : 'border-slate-200'
            )}
            key={plan.id}
            value={plan.id}
          >
            <span className='flex min-w-0 flex-1 flex-col gap-1'>
              <span className='flex items-baseline justify-between gap-2'>
                <span className='font-semibold'>{plan.name}</span>
                <span className='font-semibold tabular-nums'>{plan.price}</span>
              </span>
              <span className='font-normal text-muted text-xs leading-snug'>{plan.desc}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
      <Field.Description>Có thể nâng cấp hoặc đổi gói bất kỳ lúc nào.</Field.Description>
    </Field>
  )
}

const checkVariants: { variant: '' | 'success' | 'info' | 'warning' | 'danger'; label: string }[] = [
  { variant: '', label: 'primary' },
  { variant: 'success', label: 'success' },
  { variant: 'info', label: 'info' },
  { variant: 'warning', label: 'warning' },
  { variant: 'danger', label: 'danger' },
]

const checkSizes: { size: 'sm' | '' | 'lg' | 'xl'; label: string }[] = [
  { size: 'sm', label: 'sm' },
  { size: '', label: 'default' },
  { size: 'lg', label: 'lg' },
  { size: 'xl', label: 'xl' },
]

function CheckRadioGalleryCase() {
  const [variantChoice, setVariantChoice] = useState('primary')

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>Sizes</span>
        <div className='flex flex-wrap items-end gap-x-6 gap-y-3'>
          {checkSizes.map(({ size, label }) => (
            <Checkbox defaultChecked key={`cb-${label}`} size={size || undefined}>
              {label}
            </Checkbox>
          ))}
          <span aria-hidden className='h-6 w-px self-center bg-slate-200' />
          {checkSizes.map(({ size, label }) => (
            <RadioGroup defaultValue='default' key={`rd-group-${label}`} name={`gallery-size-${label}`}>
              <Radio size={size || undefined} value={label}>
                {label}
              </Radio>
            </RadioGroup>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>Variants</span>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
          {checkVariants.map(({ variant, label }) => (
            <Checkbox defaultChecked key={`vcb-${label}`} variant={variant || undefined}>
              {label}
            </Checkbox>
          ))}
        </div>
        <RadioGroup
          className='check-group check-group-inline'
          name='gallery-variant'
          onValueChange={setVariantChoice}
          orientation='horizontal'
          value={variantChoice}
        >
          {checkVariants.map(({ variant, label }) => (
            <Radio key={`vrd-${label}`} value={label} variant={variant || undefined}>
              {label}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>States</span>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
          <Checkbox>Bỏ chọn</Checkbox>
          <Checkbox defaultChecked>Đã chọn</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox defaultChecked disabled>
            Disabled · checked
          </Checkbox>
          <Field className='inline-flex w-auto' invalid>
            <Checkbox>Field invalid</Checkbox>
          </Field>
        </div>
      </div>
    </div>
  )
}

function ModalFooterCase() {
  const [date, setDate] = useState('')

  return (
    <div className='mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-100 dark:border-line dark:bg-surface dark:ring-line/40'>
      <h3 className='font-semibold text-base text-fg'>Lên lịch xuất bản</h3>
      <p className='mt-1 text-muted text-sm'>Footer modal: field và nút cùng hàng, căn đáy.</p>
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
    <div className='playground-page flex min-h-0 min-w-0 flex-1 flex-col'>
      <Header />

      <div className='docs-demo-shell relative isolate flex-1 overflow-x-clip bg-body text-fg'>
        <div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div
            className='mask-[linear-gradient(to_bottom,black_55%,transparent)] absolute inset-x-0 top-0 h-144 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]'
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                '<svg width="42" height="44" viewBox="0 0 42 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#94a3b8" fill-opacity="0.06"><path d="M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z"/></g></g></svg>'
              )}")`,
            }}
          />
          <div className='absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute top-64 right-0 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-700/30' />
        </div>

        <main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
          <section className='mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20'>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 font-medium text-slate-600 text-xs shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm dark:border-line dark:bg-surface/80 dark:text-muted dark:ring-line/40'>
              <span className='flex size-1.5 rounded-full bg-primary-500' />
              Forms playground
            </div>
            <h1 className='mt-6 max-w-3xl font-semibold text-3xl text-fg tracking-tight md:text-4xl lg:text-5xl'>
              Field × Button trên cùng một trang
            </h1>
            <p className='mt-4 max-w-3xl text-pretty text-base text-muted leading-relaxed md:text-lg'>
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
              className='bg-slate-100/50 dark:bg-surface/50'
              description='Khối giả lập modal: field full width, action bar bên phải.'
              title='7. Footer dialog'
            >
              <ModalFooterCase />
            </PreviewSection>

            <PreviewSection
              description='Checkbox group có parent indeterminate: hữu ích cho cấu hình quyền & notification preferences.'
              title='8. Tuỳ chọn thông báo (checkbox + indeterminate)'
            >
              <NotificationPreferencesCase />
            </PreviewSection>

            <PreviewSection
              description='Radio cards giữ class .radio cho input, layout custom — selected có viền primary + ring nhẹ.'
              title='9. Chọn gói (radio cards)'
            >
              <PlanRadioCardsCase />
            </PreviewSection>

            <PreviewSection
              description='Sizes (sm / default / lg / xl) · variants (primary / success / info / warning / danger) · disabled · invalid.'
              title='10. Gallery checkbox & radio'
            >
              <CheckRadioGalleryCase />
            </PreviewSection>
          </section>
        </main>
      </div>
    </div>
  )
}
