import { FieldHelpText } from './FieldHelpText'
import { FieldLabel } from './FieldLabel'
import { FieldRoot } from './FieldRoot'

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  HelpText: FieldHelpText,
})
