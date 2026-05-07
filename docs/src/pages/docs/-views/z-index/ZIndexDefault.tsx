const stack = [
  { name: 'z-dropdown', token: '--zindex-dropdown' as const },
  { name: 'z-fixed', token: '--zindex-fixed' as const },
  { name: 'z-offcanvas', token: '--zindex-offcanvas' as const },
  { name: 'z-modal', token: '--zindex-modal' as const },
  { name: 'z-popover', token: '--zindex-popover' as const },
  { name: 'z-toast', token: '--zindex-toast' as const },
] as const

export default function ZIndexDefault() {
  return (
    <div className='mx-auto max-w-lg px-4'>
      <p className='mb-4 text-slate-600 text-sm'>
        Same stacking context: larger <code className='text-slate-800'>--zindex-*</code> values paint on top.
        Utility classes like <code className='text-slate-800'>.z-modal</code> map to these tokens (
        <code className='text-slate-800'>_z-index.css</code>).
      </p>
      <div className='relative isolate h-52 rounded-xl border border-slate-200 bg-slate-50'>
        {stack.map((layer, i) => (
          <div
            className='card absolute flex bg-white px-4 py-2 font-semibold shadow-sm'
            key={layer.name}
            style={{
              zIndex: `var(${layer.token})`,
              top: 12 + i * 36,
              left: 12 + i * 16,
              width: '300px',
              height: '70px',
              // transform: 'rotate(-90deg)',
            }}
          >
            .{layer.name}
          </div>
        ))}
      </div>
    </div>
  )
}
