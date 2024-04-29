type SvgComponent = React.FunctionComponent<
  React.ComponentProps<'svg'> & { title?: string }
>

declare module '*.svg' {
  const ReactComponent: SvgComponent

  export default ReactComponent
}
