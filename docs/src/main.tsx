import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import * as ReactDom from 'react-dom/client'

import { routeTree } from './routeTree.gen'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)
const router = createRouter({
  routeTree,
  basepath: '/',
  defaultErrorComponent: ({ error }: { error: Error }) => {
    // Render an error message
    return <div>{error.message}</div>
  },
})
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
