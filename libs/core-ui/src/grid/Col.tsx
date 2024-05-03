import classNames from 'classnames'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { ForwardedRef, forwardRef } from 'react'

import { GridSize } from './Grid.types'

export const Col: ColComponent = forwardRef(
  (
    {
      className,
      alignSelf,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      order,
      orderSm,
      orderMd,
      orderLg,
      orderXl,
      orderXxl,
      offset,
      offsetSm,
      offsetMd,
      offsetLg,
      offsetXl,
      offsetXxl,
      ...props
    }: ColProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        className={classNames(className, {
          [`align-self-${alignSelf}`]: alignSelf,
          [`col-${xs}`]: xs,
          [`col-sm-${sm}`]: sm,
          [`col-md-${md}`]: md,
          [`col-lg-${lg}`]: lg,
          [`col-xl-${xl}`]: xl,
          [`col-xxl-${xxl}`]: xxl,
          [`order-${xs}`]: order,
          [`order-sm-${sm}`]: orderSm,
          [`order-md-${md}`]: orderMd,
          [`order-lg-${lg}`]: orderLg,
          [`order-xl-${xl}`]: orderXl,
          [`order-xxl-${xxl}`]: orderXxl,
          [`offset-${xs}`]: offset,
          [`offset-sm-${sm}`]: offsetSm,
          [`offset-md-${md}`]: offsetMd,
          [`offset-lg-${lg}`]: offsetLg,
          [`offset-xl-${xl}`]: offsetXl,
          [`offset-xxl-${xxl}`]: offsetXxl,
        })}
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type ColProps = React.JSX.IntrinsicElements['div'] & {
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
  xxl?: GridSize
  order?: ColOrder
  orderSm?: ColOrder
  orderMd?: ColOrder
  orderLg?: ColOrder
  orderXl?: ColOrder
  orderXxl?: ColOrder
  offset?: OffsetOrder
  offsetSm?: OffsetOrder
  offsetMd?: OffsetOrder
  offsetLg?: OffsetOrder
  offsetXl?: OffsetOrder
  offsetXxl?: OffsetOrder
}

export type ColOrder = 'first' | '0' | '1' | '2' | '3' | '4' | '5' | 'last'
export type OffsetOrder =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'

type ColComponent = ForwardRefExoticComponent<
  Omit<ColProps, 'ref'> & RefAttributes<HTMLDivElement>
>
