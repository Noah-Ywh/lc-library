import { writeFile } from 'node:fs/promises'

import { ensureDir } from 'fs-extra'
import consola from 'consola'
import chalk from 'chalk'
import { format } from 'prettier'

import type { BuiltInParserName } from 'prettier'

const name = process.argv.at(-1)

const CamelCaseName = (name || '')
  .split('-')
  .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
  .join('')

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })

/** 单组件入口文件 */
const create = async () => {
  const index = await formatCode(
    `
    import type { App, Plugin } from 'vue'
    import ${CamelCaseName} from './src/${name}.vue'

    import './style/css'

    export const ${CamelCaseName}Plugin: Plugin = {
      install(app: App) {
        app.component('L${CamelCaseName}', ${CamelCaseName})
      },
    }

    export const L${CamelCaseName} = ${CamelCaseName}`,
    'typescript',
  )
  writeFile(`packages/lc-ui/components/${name}/index.ts`, index, 'utf-8')
  consola.success(chalk.green(`index: packages/lc-ui/components/${name}/index.ts`))
}

/** 单元测试文件 */
const createTEST = async () => {
  const test = await formatCode(
    `
      import { describe, expect, it } from 'vitest'
      import { mount } from '@vue/test-utils'

      import ${CamelCaseName} from '../../src/${name}.vue'

      describe('${CamelCaseName}', () => {})`,
    'typescript',
  )
  writeFile(`packages/lc-ui/components/${name}/__tests__/unit/${name}.spec.tsx`, test, 'utf-8')
  consola.success(
    chalk.green(`test: packages/lc-ui/components/${name}/__tests__/unit/${name}.spec.tsx`),
  )
}

/** 单文件组件 */
const createSRC = async () => {
  const sfc = await formatCode(
    `
    <script setup lang="ts">
      import { ${CamelCaseName}Props } from './${name}'
      import { useNamespace } from '@noahyu/lc-helpers'

      const props = defineProps(${CamelCaseName}Props)

      const { bem, is } = useNamespace('${name}')
    </script>

    <template>
      <div></div>
    </template>`,
    'vue',
  )

  const ts = await formatCode(
    `
    export const ${CamelCaseName}Props = {}
    export const ${CamelCaseName}Emits = {}`,
    'typescript',
  )

  writeFile(`packages/lc-ui/components/${name}/src/${name}.vue`, sfc, 'utf-8')
  writeFile(`packages/lc-ui/components/${name}/src/${name}.ts`, ts, 'utf-8')
  consola.success(chalk.green(`src: packages/lc-ui/components/${name}/src/${name}.vue`))
  consola.success(chalk.green(`src: packages/lc-ui/components/${name}/src/${name}.ts`))
}

/** 样式文件 */
const createSTYLE = async () => {
  const css = await formatCode(
    `
    import '@noahyu/lc-ui/dist/styles/lc-root.css'
    import '@noahyu/lc-ui/dist/styles/lc-normalize.css'
    import '@noahyu/lc-ui/dist/styles/lc-${name}.css'`,
    'typescript',
  )

  const index = await formatCode(
    `
    import '@noahyu/lc-ui/dist/styles/scss/root.scss'
    import '@noahyu/lc-ui/dist/styles/scss/normalize.scss'
    import '@noahyu/lc-ui/dist/styles/scss/${name}.scss'`,
    'typescript',
  )

  const scss = await formatCode(
    `
    @use './mixins' as *;

    $block: '${name}';

    @include b(){}`,
    'scss',
  )

  writeFile(`packages/lc-ui/components/${name}/style/css.ts`, css, 'utf-8')
  writeFile(`packages/lc-ui/components/${name}/style/index.ts`, index, 'utf-8')
  writeFile(`packages/lc-ui/styles/${name}.scss`, scss, 'utf-8')
  consola.success(chalk.green(`style: packages/lc-ui/components/${name}/style/css.ts`))
  consola.success(chalk.green(`style: packages/lc-ui/components/${name}/style/index.ts`))
  consola.success(chalk.green(`style: packages/lc-ui/styles/${name}.scss`))
}

const createDIR = async () => {
  await ensureDir(`packages/lc-ui/components/${name}/__tests__/unit`)
  await ensureDir(`packages/lc-ui/components/${name}/src`)
  await ensureDir(`packages/lc-ui/components/${name}/style`)
  create()
  createTEST()
  createSRC()
  createSTYLE()
}

createDIR()
