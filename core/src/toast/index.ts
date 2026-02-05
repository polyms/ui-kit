import { Toast as Base } from '@base-ui/react/toast'
import { ToastContainer, ToastProvider } from './ToastContainer'

export const Toast = Object.assign(ToastProvider, {
  Container: ToastContainer,
  useToastManager: Base.useToastManager,
})
