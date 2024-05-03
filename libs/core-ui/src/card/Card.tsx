import classNames from 'classnames'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

export const Card: CardComponent = forwardRef(
  (
    {
      className,
      imgTop,
      imgTopAlt,
      imgBottom,
      imgBottomAlt,
      imgOverlay,
      imgOverlayAlt,
      children,
      ...props
    }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div {...props} className={classNames(className, 'card')} ref={ref}>
        {imgTop && <img src={imgTop} alt={imgTopAlt} />}
        {imgOverlay && <img src={imgOverlay} className='card-img' alt={imgOverlayAlt} />}
        <div className={classNames(imgOverlay ? 'card-img-overlay' : 'card-body')}>
          {children}
        </div>
        {imgBottom && <img src={imgBottom} alt={imgBottomAlt} />}
      </div>
    )
  }
)

// ======================================================================================

export type CardProps = JSX.IntrinsicElements['div'] & {
  imgTop?: string
  imgTopAlt?: string
  imgBottom?: string
  imgBottomAlt?: string
  imgOverlay?: string
  imgOverlayAlt?: string
}

type CardComponent = ForwardRefExoticComponent<
  Omit<CardProps, 'ref'> & RefAttributes<HTMLDivElement>
>
