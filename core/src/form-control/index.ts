import { FormControlRoot } from './FormControlRoot'
import { FormHelpText } from './FormHelpText'
import { FormLabel } from './FormLabel'

export const FormControl = Object.assign(FormControlRoot, {
  Label: FormLabel,
  HelpText: FormHelpText,
})
