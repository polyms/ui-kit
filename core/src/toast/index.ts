import { ToastContainer, ToastProvider } from './ToastContainer'
import { toastManager } from './useToastManager'

export const Toast = Object.assign(ToastProvider, {
  Container: ToastContainer,
  useToastManager: () => toastManager,
})
