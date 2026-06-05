export default function CardDefault() {
  return (
    <div className='m-auto max-w-md'>
      <div className='card'>
        <div className='card-body'>
          <div className='font-semibold text-fg'>Billing overview</div>
          <p className='mt-1 text-muted text-sm'>
            Your next invoice is scheduled for May 12. You can update payment methods anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
