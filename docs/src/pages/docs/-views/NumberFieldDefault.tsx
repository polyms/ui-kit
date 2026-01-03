import { NumberField } from '@polyms/core'

export default function NumberFieldDefault() {
  return (
    <div>
      <NumberField label='Amount' defaultValue={0} size='lg' className='rounded-full' />
    </div>
  )
}
