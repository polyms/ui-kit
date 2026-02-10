import { Spinner } from '@polyms/core'

export default function SpinnerSizes() {
  const sizes = [12, 16, 20, 24, 32, 40, 48]

  return (
    <div className='m-auto flex items-center justify-center gap-4'>
      {sizes.map(size => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  )
}
