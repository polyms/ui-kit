import YAML from 'yaml'

export function stripFrontmatter() {
  return {
    name: 'strip-frontmatter',
    transform(code: string, id: string) {
      if (!id.endsWith('.mdx')) return

      const frontmatterRE = /^---\n([\s\S]*?)\n---\n?/
      const match = code.match(frontmatterRE)
      if (!match) return

      const [, yamlRaw] = match
      const frontmatter = YAML.parse(yamlRaw || '')
      let content = code.slice(match[0].length)
      for (const key in frontmatter) {
        content = content.replace(`{{${key}}}`, frontmatter[key])
      }

      return {
        code: content,
        map: null,
        meta: {
          frontmatter,
        },
      }
    },
  }
}
