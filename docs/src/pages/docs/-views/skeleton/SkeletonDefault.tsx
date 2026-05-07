export default function SkeletonDefault() {
  return (
    <div className='m-auto flex w-md flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='skeleton size-12 shrink-0 rounded-full' />
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='skeleton h-4 rounded-md' />
          <div className='skeleton h-3 w-3/4 rounded-md' />
        </div>
      </div>
      <div className='skeleton h-32 rounded-xl' />
    </div>
  )
}
