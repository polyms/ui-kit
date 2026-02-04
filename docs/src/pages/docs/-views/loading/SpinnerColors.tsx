import { Spinner } from '@polyms/core'

export default function SpinnerColors() {
  const colors = [
    { name: 'Primary', color: '#3b82f6', subColor: '#93c5fd' },
    { name: 'Success', color: '#22c55e', subColor: '#86efac' },
    { name: 'Danger', color: '#ef4444', subColor: '#fca5a5' },
    { name: 'Warning', color: '#f59e0b', subColor: '#fcd34d' },
    { name: 'Dark', color: '#181b1f', subColor: '#AEB4BD' },
  ]

  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {colors.map(({ name, color, subColor }) => (
        <div className='flex flex-col items-center gap-2' key={name}>
          <Spinner color={color} size={32} subColor={subColor} />
          <span className='text-slate-600 text-xs'>{name}</span>
        </div>
      ))}
    </div>
  )
}
