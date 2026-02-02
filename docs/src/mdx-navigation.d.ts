declare module 'virtual:mdx-navigation' {
  export interface TocItem {
    depth: number
    title: string
    url: string
  }

  export interface NavigationItem {
    label: string
    path: string
  }

  export interface NavigationSection {
    label: string
    items: NavigationItem[]
  }

  export interface PageMetadata {
    type?: string
    title?: string
    apis?: PropItem[]
    [key: string]: unknown
  }

  export interface PropItem {
    name: string
    default: string
    values: string
    description: string
  }

  export const navigation: NavigationSection[]
  export const tocByRoute: Record<string, TocItem[]>
  export const metadataByRoute: Record<string, PageMetadata>
}
