import { NumberField } from '@polyms/ui-kit'

export default function NumberFieldDefault() {
  return (
    <div className='m-auto'>
      <NumberField defaultValue={0} label='Amount' rounded size='lg' />
    </div>
  )
}
