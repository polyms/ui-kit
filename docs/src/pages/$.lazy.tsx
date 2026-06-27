import { createLazyFileRoute } from '@tanstack/react-router'

import { MdxPage } from './-MdxPage'

export const Route = createLazyFileRoute('/$')({
  component: MdxPage,
})
