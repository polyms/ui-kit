import { NumberField } from '@polyms/core'

export default function NumberFieldDefault() {
  return (
    <div className='m-auto'>
      <NumberField defaultValue={0} label='Amount' rounded size='lg' />
    </div>
  )
}
