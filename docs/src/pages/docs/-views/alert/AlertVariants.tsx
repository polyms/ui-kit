// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants = [
  { name: 'primary', label: 'Primary', description: 'For general informational messages' },
  { name: 'success', label: 'Success', description: 'For successful or positive actions' },
  { name: 'info', label: 'Info', description: 'For neutral informational messages' },
  { name: 'warning', label: 'Warning', description: 'For warning or cautionary messages' },
  { name: 'danger', label: 'Danger', description: 'For errors or critical alerts' },
  { name: 'light', label: 'Light', description: 'For subtle, low-emphasis messages' },
  { name: 'dark', label: 'Dark', description: 'For high-contrast messages' },
] as const

export default function AlertVariants() {
  return (
    <div className='card'>
      <table className='table-striped table-borderless table align-middle'>
        <thead className='thead-light'>
          <tr>
            <th className='w-px'>Variant</th>
            <th>Preview</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {variants.map(variant => (
            <tr key={variant.name}>
              <td className='font-semibold'>{variant.label}</td>
              <td>
                <div className={`alert alert-${variant.name} mb-0`}>
                  This is a {variant.name} alert—check it out!
                </div>
              </td>
              <td className='text-slate-600 text-sm'>{variant.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
