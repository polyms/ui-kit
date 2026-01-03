import { minify } from 'terser'
import type { Plugin } from 'vite'

export default function viteMF(ops: { globals?: Record<string, string> } = {}): Plugin {
  return {
    name: 'vite-module-federation',
    apply: 'build',
    transform(code, id) {
      const globalsMap = {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
        // 'react/jsx-dev-runtime': 'jsxDevRuntime',
        'react-i18next': 'RI18next',
        ...ops.globals,
      }
      let transformedCode = code
        .replace('var React = _interopRequireWildcard(require("react"));', '')
        .replace(/['"]lodash['"]/g, `'lodash-es'`)
        .replace(/['"]lodash\//g, `'lodash-es/`)

      // Check if the file is a module that might contain the import statement
      if (Object.keys(globalsMap).some(key => new RegExp(`['"]${key}['"]`).test(code))) {
        Object.entries(globalsMap).forEach(([key, value]) => {
          transformedCode = transformedCode
            .replace(new RegExp(`import\\s+${value}\\s*from\\s*['"]${key}['"];`, 'g'), '')
            .replace(new RegExp(`const\\s+${value}\\s*=\\s*require\\(['"]${key}['"]\\);`, 'g'), '')
            .replace(new RegExp(`import\\s+([\\w$]+)\\s*from\\s*['"]${key}['"];`, 'g'), (_, name) =>
              name === value ? '' : `const ${name} = ${value};`
            )
            .replace(
              new RegExp(`import\\s+\\*\\s+as\\s+([\\w$]+)\\s*from\\s*['"]${key}['"];`, 'g'),
              (_, name) => (name === value ? '' : `const ${name} = ${value};`)
            )
            .replace(
              new RegExp(`import\\s+\\{([^}]+)\\}\\s*from\\s*['"]${key}['"];`, 'g'),
              (_, imports: string) => {
                const importsList = imports
                  .split(',')
                  .map((importItem: string) => importItem.trim())
                  .join(', ')
                  .replace(/ as /g, ':')
                return `const { ${importsList} } = ${value};`
              }
            )
            .replace(
              new RegExp(`import\\s+([\\w$]+),\\s*\\{([^}]+)\\}\\s*from\\s*['"]${key}['"];`, 'g'),
              (_, name: string, imports: string) => {
                const importsList = imports
                  .split(',')
                  .map((importItem: string) => importItem.trim())
                  .join(', ')
                  .replace(/ as /g, ':')
                if (name === value) return `const { ${importsList} } = ${value};`
                return `const ${name} = ${value};const { ${importsList} } = ${value};`
              }
            )
            .replace(new RegExp(`require\\(['"]${key}['"]\\)`, 'g'), `${value}`)
        })
      }
      // Object.keys(globalsMap).forEach((key) => {
      //   const matchs = new RegExp(`['"]${key}['"]`).exec(transformedCode)
      //   matchs?.forEach((m) => {
      //     console.log('\n>>>', m, '>>>', id)
      //   })
      // })

      if (transformedCode.includes('NODE_ENV')) {
        transformedCode = transformedCode
          .replace(/process\.env\.NODE_ENV/g, `'${process.env.NODE_ENV || 'production'}'`)
          .replace(/process\.env\[['"]NODE_ENV['"]\]/g, `'${process.env.NODE_ENV || 'production'}'`)

        if (transformedCode.includes('NODE_ENV')) console.log('\n>>>', id)
      }

      if (transformedCode !== code)
        return {
          code: transformedCode,
          map: null, // You can provide a source map if needed
        }

      return null // Return null to indicate no transformation was done
    },
    async generateBundle(_, bundle) {
      // Duyệt qua tất cả các file trong bundle
      for (const fileName in bundle) {
        const file = bundle[fileName]
        if (file.type === 'chunk' && file.code) {
          // Minify code bằng Terser
          const minified = await minify(file.code, {
            module: true, // Giữ ESM
            compress: {
              drop_console: false, // Giữ console.log
              pure_funcs: ['console.info'], // Loại bỏ console.info
            },
            mangle: true, // Rút gọn tên biến
            format: {
              comments: false, // Loại bỏ comment
            },
          })
          if (minified.code) {
            file.code = minified.code // Ghi đè code minified
          }
        }
      }
    },
  }
}
