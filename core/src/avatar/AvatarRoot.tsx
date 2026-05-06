import { Avatar as Base } from '@base-ui/react/avatar'
import clsx from 'clsx'

export const AvatarRoot = (props: Base.Root.Props) => (
  <Base.Root {...props} className={clsx('avatar', props.className)} />
)
