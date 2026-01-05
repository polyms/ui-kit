import { FieldControl, type FieldControlProps } from './FieldControl'
import { FieldDescription } from './FieldDescription'
import { FieldFeedback } from './FieldFeedback'
import { FieldFloating, type FieldFloatingProps } from './FieldFloating'
import { FieldLabel } from './FieldLabel'
import { FieldRoot, type FieldRootProps } from './FieldRoot'

export const Field = Object.assign(FieldRoot, {
  Control: FieldControl,
  Label: FieldLabel,
  Description: FieldDescription,
  Feedback: FieldFeedback,
  Floating: FieldFloating,
})

export declare namespace Field {
  type Props = FieldRootProps

  namespace Control {
    type Props = FieldControlProps
  }

  namespace Floating {
    type Props = FieldFloatingProps
  }
}
