import { Avatar as Base } from '@base-ui/react/avatar'
import { AvatarRoot } from './AvatarRoot'

export const Avatar = Object.assign(AvatarRoot, {
  Image: Base.Image,
  Fallback: Base.Fallback,
})

export type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps } from '@base-ui/react/avatar'
