import type { SVGAttributes } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const CloseIcon = ({ size = 18, ...props }: IconProps) => (
  <svg
    color='currentColor'
    fill='none'
    height={size}
    role='img'
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <path
      d='M18 6L6.00081 17.9992M17.9992 18L6 6.00085'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
  </svg>
)

export const SuccessIcon = ({ size = 22, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.5 12.5L10.5 14.5L15.5 9.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
      <path
        d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
        opacity='0.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export const DangerIcon = ({ size = 22, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 7V13' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5'></path>
      <circle cx='12' cy='16' fill='currentColor' r='1'></circle>
      <path
        d='M9.21603 3C10.3958 2.33333 11.1703 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C3.99599 6.21995 4.71938 5.68151 6 4.89984'
        opacity='0.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      ></path>
    </svg>
  )
}

export const WarningIcon = ({ size = 22, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.30928 9C8.59494 5 9.96832 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.45498 18.0635 2.24306 16.2635 4.05373 13'
        opacity='0.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      />
      <path d='M12 8V13' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
      <circle cx='12' cy='16' fill='currentColor' r='1' />
    </svg>
  )
}

export const InfoIcon = ({ size = 22, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 17V11' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
      <circle cx='1' cy='1' fill='currentColor' r='1' transform='matrix(1 0 0 -1 11 9)' />
      <path
        d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
        opacity='0.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      />
    </svg>
  )
}

// biome-ignore-start lint/style/useNamingConvention: class component
export const Icons = {
  Close: CloseIcon,
  Success: SuccessIcon,
  Danger: DangerIcon,
  Warning: WarningIcon,
  Info: InfoIcon,
}
// biome-ignore-end lint/style/useNamingConvention: class component

export default Icons
