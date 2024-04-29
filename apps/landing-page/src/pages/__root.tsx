import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import styled from 'styled-components'

import { NavigationBar } from '../layouts/NavigationBar'

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationBar />
      <Content>
        <Outlet />
      </Content>

      <TanStackRouterDevtools />
    </>
  ),
})

const Content = styled.div`
  margin-left: var(--po-sidebar-width);
`
