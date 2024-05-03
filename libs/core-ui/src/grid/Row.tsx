import classNames from 'classnames'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { ForwardedRef, forwardRef } from 'react'

export const Row: RowComponent = forwardRef(
  (
    {
      className,
      alignItems,
      justifyContent,
      cols,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      colsXxl,
      g,
      gSm,
      gMd,
      gLg,
      gXl,
      gXxl,
      gx,
      gxSm,
      gxMd,
      gxLg,
      gxXl,
      gxXxl,
      gy,
      gySm,
      gyMd,
      gyLg,
      gyXl,
      gyXxl,
      ...props
    }: RowProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        className={classNames(className, {
          [`align-items-${alignItems}`]: alignItems,
          [`justify-content-${justifyContent}`]: justifyContent,
          [`row-cols-${cols}`]: cols,
          [`row-cols-sm-${colsSm}`]: colsSm,
          [`row-cols-md-${colsMd}`]: colsMd,
          [`row-cols-lg-${colsLg}`]: colsLg,
          [`row-cols-xl-${colsXl}`]: colsXl,
          [`row-cols-xxl-${colsXxl}`]: colsXxl,
          [`row-cols-${cols}`]: cols,
          [`g-${g}`]: g,
          [`g-sm-${gSm}`]: gSm,
          [`g-md-${gMd}`]: gMd,
          [`g-lg-${gLg}`]: gLg,
          [`g-xl-${gXl}`]: gXl,
          [`g-xxl-${gXxl}`]: gXxl,
          [`gx-${gx}`]: gx,
          [`gx-sm-${gxSm}`]: gxSm,
          [`gx-md-${gxMd}`]: gxMd,
          [`gx-lg-${gxLg}`]: gxLg,
          [`gx-xl-${gxXl}`]: gxXl,
          [`gx-xxl-${gxXxl}`]: gxXxl,
          [`gy-${gy}`]: gy,
          [`gy-sm-${gySm}`]: gySm,
          [`gy-md-${gyMd}`]: gyMd,
          [`gy-lg-${gyLg}`]: gyLg,
          [`gy-xl-${gyXl}`]: gyXl,
          [`gy-xxl-${gyXxl}`]: gyXxl,
        })}
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type RowProps = React.JSX.IntrinsicElements['div'] & {
  cols?: RowCols
  colsSm?: RowCols
  colsMd?: RowCols
  colsLg?: RowCols
  colsXl?: RowCols
  colsXxl?: RowCols
  g?: RowGap
  gSm?: RowGap
  gMd?: RowGap
  gLg?: RowGap
  gXl?: RowGap
  gXxl?: RowGap
  gx?: RowGap
  gxSm?: RowGap
  gxMd?: RowGap
  gxLg?: RowGap
  gxXl?: RowGap
  gxXxl?: RowGap
  gy?: RowGap
  gySm?: RowGap
  gyMd?: RowGap
  gyLg?: RowGap
  gyXl?: RowGap
  gyXxl?: RowGap
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
}

export type RowGap =
  | 'auto'
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
  | '12'
export type RowCols = 'auto' | '1' | '2' | '3' | '4' | '5' | '6'
export type Gutter = '0' | '1' | '2' | '3' | '4' | '5'

type RowComponent = ForwardRefExoticComponent<
  Omit<RowProps, 'ref'> & RefAttributes<HTMLDivElement>
>
