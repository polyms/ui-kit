type SvgComponent = React.FunctionComponent<
  React.ComponentProps<'svg'> & { title?: string }
>

declare module '*.svg' {
  const ReactComponent: SvgComponent

  export default ReactComponent
}

// declare module '*.mdx' {
//   let MDXComponent: (props: any) => JSX.Element
//   export default MDXComponent
// }
