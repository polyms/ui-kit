import { createFileRoute } from '@tanstack/react-router'

import { Header } from './-views/Header'

export const Route = createFileRoute('/page')({
  component: Page,
})

function Page() {
  return (
    <article>
      <Header />

      <section className='container mt-10'>
        <h2>
          <span className='me-4 rounded-full bg-success/10 px-3 py-1 font-semibold text-sm text-success'>
            Tip
          </span>
          Pages in .container
        </h2>
        <p className='mt-4 text-justify'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </p>
        <p className='mt-4 text-justify'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </p>
        <p className='mt-4 text-justify'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </p>
      </section>
    </article>
  )
}
