const variants = ['primary', 'secondary', 'danger', 'success', 'info', 'warning', 'light', 'dark']

export default function Alert() {
  return (
    <div className='flex flex-col space-y-2'>
      {variants.map(variant => (
        <div key={variant} className={`alert alert-${variant}`}>
          This is a {variant} alert—check it out!
        </div>
      ))}
    </div>
  )
}
