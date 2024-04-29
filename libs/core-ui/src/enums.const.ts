export enum Variants {
  Primary = 'primary',
  secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

export type Variant = `${Variants}`

export enum Breakpoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

export type Breakpoint = `${Breakpoints}`
