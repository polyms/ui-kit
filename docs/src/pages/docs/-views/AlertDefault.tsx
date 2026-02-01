const variants = ['primary', 'danger', 'success', 'info', 'warning', 'light', 'dark']

export default function Alert() {
  return (
    <div className='flex flex-col space-y-2'>
      {variants.map(variant => (
        <div className={`alert alert-${variant}`} key={variant}>
          This is a {variant} alert—check it out!
        </div>
      ))}
    </div>
  )
}
