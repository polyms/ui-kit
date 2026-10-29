import { createFileRoute } from '@tanstack/react-router'

import { playgroundTitle } from '../seo/document'
import { noindexHead } from '../seo/head'

export const Route = createFileRoute('/demo')({
	head: () => noindexHead(playgroundTitle('Demo')),
	staticData: { layout: 'playground' },
})
