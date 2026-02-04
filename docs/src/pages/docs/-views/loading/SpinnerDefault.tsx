import { Spinner } from '@polyms/core'

export default function SpinnerDefault() {
  return (
    <div className='flex items-center justify-center gap-4'>
      <Spinner />
      <Spinner color='#3b82f6' size={16} subColor='#93c5fd' />
      <Spinner color='#22c55e' size={24} subColor='#86efac' />
      <Spinner color='#ef4444' size={32} subColor='#fca5a5' />
    </div>
  )
}
