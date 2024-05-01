import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/core-ui',

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/core-ui',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
        // Layouts
        container: 'src/container/index.ts',
        // Components
        button: 'src/button/index.ts',
        'list-group': 'src/list-group/index.ts',
      },
      name: 'core-ui',
      // fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
