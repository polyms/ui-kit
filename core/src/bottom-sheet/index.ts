import { BottomSheetContent } from './BottomSheetContent'
import { BottomSheetRoot } from './BottomSheetRoot'
import { BottomSheetTrigger } from './BottomSheetTrigger'

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Content: BottomSheetContent,
})
