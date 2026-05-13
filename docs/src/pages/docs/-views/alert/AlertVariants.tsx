// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants = [
  {
    name: 'primary',
    label: 'Primary',
    description:
      'Use the primary variant for everyday notices that deserve attention without implying success, failure, or risk—product updates, onboarding tips, or gentle prompts to explore a new feature.',
  },
  {
    name: 'success',
    label: 'Success',
    description:
      'Reserve success for outcomes that clearly completed as intended—saved drafts, confirmed payments, invitations sent, or exports finished. It reassures the user that the last action worked and they can move on.',
  },
  {
    name: 'info',
    label: 'Info',
    description:
      'Choose info when the message is factual context, not a win or a problem—scheduled maintenance windows, how a feature works, or links to documentation. It reads as “here is something you should know” without urgency.',
  },
  {
    name: 'warning',
    label: 'Warning',
    description:
      'Use warning when something might go wrong or needs a decision soon—approaching limits, deprecated APIs, unsaved changes on navigation, or steps that could have side effects. Ask the user to review or act before it escalates.',
  },
  {
    name: 'danger',
    label: 'Danger',
    description:
      'Apply danger when the situation is blocking, failed, or risky—validation errors, payment failures, permission denied, or destructive actions. Pair clear copy with a recovery path so users know what to fix or try next.',
  },
  {
    name: 'light',
    label: 'Light',
    description:
      'Light works on tinted or busy surfaces where a full-strength alert would feel heavy—inline hints in cards, secondary panels, or dense dashboards. Keep copy short; it is best for low-priority reminders that should not dominate the layout.',
  },
  {
    name: 'dark',
    label: 'Dark',
    description:
      'Dark gives maximum contrast on light pages or over imagery—hero banners, marketing strips, or modals where legibility must hold up at a glance. Use it sparingly so it still reads as an alert, not part of the chrome.',
  },
] as const

export default function AlertVariants() {
  return (
    <div className='card'>
      <table className='table-striped table-borderless table align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='w-px'>Variant</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {variants.map(variant => (
            <tr key={variant.name}>
              <td className='font-semibold'>{variant.label}</td>
              <td>
                <div className={`alert alert-${variant.name} mb-0`}>{variant.description}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
