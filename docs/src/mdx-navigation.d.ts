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
    [key: string]: unknown
  }

  export const navigation: NavigationSection[]
  export const tocByRoute: Record<string, TocItem[]>
  export const metadataByRoute: Record<string, PageMetadata>
}
