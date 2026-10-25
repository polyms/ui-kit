import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import * as ReactDom from 'react-dom/client'

import { routeTree } from './routeTree.gen'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)
const router = createRouter({
  routeTree,
  basepath: '/',
  defaultPreload: 'intent',
  defaultErrorComponent: ({ error }) => {
    const message = error instanceof Error ? error.message : 'Something went wrong'
    return <div>{message}</div>
  },
})
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
