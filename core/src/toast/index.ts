import { ToastContainer, ToastProvider, toastManager } from './ToastContainer'

export const Toast = Object.assign(ToastProvider, {
  Container: ToastContainer,
  useToastManager: () => toastManager,
})
