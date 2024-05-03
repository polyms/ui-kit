import classNames from 'classnames'
import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react'

export const Img: ImgComponent = forwardRef(
  ({ className, fluid, thumbnail, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(className, {
          'img-fluid': fluid,
          'img-thumbnail': thumbnail,
        })}
      />
    )
  }
)

// ======================================================================================

export type ImgProps = JSX.IntrinsicElements['img'] & {
  fluid?: boolean
  thumbnail?: boolean
}

type ImgComponent = ForwardRefExoticComponent<
  Omit<ImgProps, 'ref'> & RefAttributes<HTMLImageElement>
>
