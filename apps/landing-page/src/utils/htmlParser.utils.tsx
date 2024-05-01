import {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from 'html-react-parser'
import { ElementType } from 'react'

export const makeOptions = (
  mapping: Record<string, ElementType>
): HTMLReactParserOptions => ({
  replace(domNode) {
    if (domNode.type === 'tag') {
      const props = attributesToProps(domNode.attribs)
      Object.keys(props).forEach((key) => {
        if (props[key] === '') props[key] = true
      })

      const Tag = mapping[domNode.name as keyof typeof mapping]
      if (Tag)
        return <Tag {...props}>{domToReact(domNode.children as DOMNode[], this)}</Tag>
    }
    return domNode
  },
})
