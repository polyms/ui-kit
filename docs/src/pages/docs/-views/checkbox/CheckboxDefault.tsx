import { Checkbox } from '@polyms/core'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function CheckboxDefault() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className='m-auto flex max-w-sm flex-col gap-3 rounded-2xl border border-line bg-body p-5 shadow-sm'>
      <Checkbox checked={accepted} onCheckedChange={setAccepted}>
        Tôi đồng ý với điều khoản dịch vụ
      </Checkbox>
      <Checkbox defaultChecked variant='success'>
        Gửi thông báo bảo mật quan trọng
      </Checkbox>
      <Checkbox disabled>Không khả dụng</Checkbox>
    </div>
  )
}
