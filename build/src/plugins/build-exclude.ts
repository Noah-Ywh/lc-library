import type { Plugin } from 'rollup'

export const excludeModules = (excludes: string[]): Plugin => {
  return {
    name: 'build-exclude-modules',
    resolveId(source) {
      let id = ''
      const matched = excludes.filter((item) => source.startsWith(item))

      if (matched.length > 0) {
        id = source
      } else {
        return undefined
      }

      return {
        id,
        external: 'absolute',
      }
    },
  }
}
