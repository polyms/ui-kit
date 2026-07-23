// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Utility = {
  className: string
  preview: string
  role: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const utilities: Utility[] = [
  { className: 'bg-body', role: 'Page / canvas background', preview: 'bg-body text-fg border border-line' },
  { className: 'text-fg', role: 'Primary text', preview: 'bg-body text-fg border border-line' },
  {
    className: 'text-muted',
    role: 'Secondary text, captions',
    preview: 'bg-body text-muted border border-line',
  },
  { className: 'bg-surface', role: 'Raised panels, cards', preview: 'bg-surface text-fg border border-line' },
  {
    className: 'bg-surface-2',
    role: 'Elevated popups, menus',
    preview: 'bg-surface-2 text-fg border border-line',
  },
  {
    className: 'bg-input',
    role: 'Form control background',
    preview: 'bg-input text-fg border border-line',
  },
  {
    className: 'border-line',
    role: 'Default borders and dividers',
    preview: 'border-2 border-line bg-body text-fg',
  },
]

export default function DarkModeUtilities() {
  return (
    <div className='card'>
      <table className='table-striped table-borderless table-lg table align-middle'>
        <thead className='thead-light'>
          <tr>
            <th>Class</th>
            <th>Role</th>
            <th>Light preview</th>
            <th>Dark preview</th>
          </tr>
        </thead>
        <tbody>
          {utilities.map(util => (
            <tr key={util.className}>
              <td>
                <code className='font-mono text-fg text-xs'>{util.className}</code>
              </td>
              <td className='text-muted text-sm'>{util.role}</td>
              <td>
                <span
                  className={`inline-flex h-7 w-20 items-center justify-center rounded font-bold ${util.preview}`}
                >
                  Aa
                </span>
              </td>
              <td>
                <span className='dark'>
                  <span
                    className={`inline-flex h-7 w-20 items-center justify-center rounded font-bold ${util.preview}`}
                  >
                    Aa
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
