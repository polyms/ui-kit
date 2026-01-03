import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='@page'>
      <div className='page-container'>Hello "/"!</div>
    </div>
  )
}
