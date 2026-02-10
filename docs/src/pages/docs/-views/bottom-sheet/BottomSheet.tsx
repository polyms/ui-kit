import { BottomSheet } from '@polyms/core'

export default function BottomSheetStory() {
  return (
    <BottomSheet>
      <BottomSheet.Trigger className='btn btn-primary outlined btn-lg m-auto mx-auto rounded-full'>
        Click to Open
      </BottomSheet.Trigger>
      <BottomSheet.Content title='Bottom Sheet Title'>Content</BottomSheet.Content>
    </BottomSheet>
  )
}
