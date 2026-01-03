declare module 'virtual:mdx-navigation' {
  export interface NavigationItem {
    label: string
    path: string
  }

  export interface NavigationSection {
    label: string
    items: NavigationItem[]
  }

  export const navigation: NavigationSection[]
}
