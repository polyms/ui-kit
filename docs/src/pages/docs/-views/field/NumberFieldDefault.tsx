import { NumberField } from '@polyms/core'

export default function NumberFieldDefault() {
  return (
    <div className='m-auto'>
      <NumberField className='rounded-full' defaultValue={0} label='Amount' size='lg' />
    </div>
  )
}
