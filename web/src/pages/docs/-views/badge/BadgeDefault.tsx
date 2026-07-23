export default function BadgeDefault() {
  return (
    <div className='m-auto flex flex-col gap-6'>
      <div className='flex flex-wrap justify-center gap-2'>
        <span className='badge badge-primary'>Primary</span>
        <span className='badge badge-success'>Success</span>
        <span className='badge badge-info'>Info</span>
        <span className='badge badge-warning'>Warning</span>
        <span className='badge badge-danger'>Danger</span>
        <span className='badge badge-light'>Light</span>
        <span className='badge badge-dark'>Dark</span>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        <span className='badge badge-light'>Default size</span>
        <span className='badge badge-lg badge-success'>Large</span>
        <span className='badge badge-xl badge-info'>Extra large</span>
      </div>
    </div>
  )
}
