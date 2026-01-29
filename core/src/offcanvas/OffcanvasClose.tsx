import { Dialog } from '@base-ui/react/dialog'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasCloseProps = Dialog.Close.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasClose = forwardRef<HTMLButtonElement, OffcanvasCloseProps>((props, ref) => (
  <Dialog.Close className='offcanvas-close' ref={ref} {...props}>
    <CloseIcon height={24} width={24} />
  </Dialog.Close>
))

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    data-src='https://cdn.hugeicons.com/icons/cancel-circle-half-dot-stroke-rounded.svg?v=1.0.1'
    fill='none'
    role='img'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <path
      d='M12 2.00012C17.5228 2.00012 22 6.47727 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.523 2 12.0001M8.909 2.48699C7.9 2.8146 6.96135 3.29828 6.12153 3.90953M3.90943 6.12162C3.29806 6.9616 2.81432 7.90044 2.4867 8.90964'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
    <path
      d='M14.9994 15.0001L9 9.00012M9.00064 15.0001L15 9.00012'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
  </svg>
)

OffcanvasClose.displayName = 'OffcanvasClose'
