import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import { useEffect } from 'react'
import styled from 'styled-components'

import { NavigationBar } from '../layouts/NavigationBar'

// Then register the languages you need
hljs.registerLanguage('xml', xml)

const Root = () => {
  useEffect(() => {
    if (window.location.hash.length > 0)
      document.querySelector<HTMLElement>(`[href='${window.location.hash}']`)?.click()
  }, [])

  return (
    <>
      <NavigationBar />
      <Content>
        <Outlet />
      </Content>

      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: Root,
})

const Content = styled.div`
  margin-left: var(--po-sidebar-width);
`
