declare module 'virtual:mdx-navigation' {
  export interface TocItem {
    depth: number
    title: string
    url: string
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

  export interface PageNavigation {
    file: string
    route: string
    title?: string
    metadata: PageMetadata
    toc: TocItem[]
    section: string
  }

  export const navigation: NavigationSection[]
  export const pages: PageNavigation[]
  export const tocByRoute: Record<string, TocItem[]>
  export const metadataByRoute: Record<string, PageMetadata>
}
