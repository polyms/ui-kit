type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
/// <reference types="@nx/react/typings/image.d.ts" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  const ReactComponent: SVGComponent

  export default ReactComponent
}
