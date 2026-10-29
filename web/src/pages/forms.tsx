import { createFileRoute } from '@tanstack/react-router'

import { playgroundTitle } from '../seo/document'
import { noindexHead } from '../seo/head'

export const Route = createFileRoute('/forms')({
	head: () => noindexHead(playgroundTitle('Forms')),
	staticData: { layout: 'playground' },
})
