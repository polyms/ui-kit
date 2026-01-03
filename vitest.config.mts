import { defineConfig } from 'vitest/config'

// const dirname =
//   typeof __dirname !== 'undefined'
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [],
      },
    ],
  },
})
