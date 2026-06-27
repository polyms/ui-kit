import { NumberField } from '@polyms/core-ui'

export default function NumberFieldDefault() {
  return (
    <div className='m-auto'>
      <NumberField defaultValue={0} label='Amount' rounded size='lg' />
    </div>
  )
}
