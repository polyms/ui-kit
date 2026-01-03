/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { type ComponentType, forwardRef, lazy, Suspense } from 'react'

export function LazyComponentLoader<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  // biome-ignore lint/style/useNamingConvention: off
  options: { LoadingComponent: React.ReactNode } = { LoadingComponent: null }
): T {
  // Use React.lazy for dynamic import
  const LazyComponent = lazy(importFunc)

  // Return a component wrapped in Suspense with a custom loader
  const WrapperComponent = forwardRef((props: any, ref) => (
    <Suspense fallback={options.LoadingComponent}>
      <LazyComponent {...props} ref={ref} />
    </Suspense>
  ))

  return WrapperComponent as unknown as T
}
