import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'

import consola from 'consola'
import chalk from 'chalk'
import { format } from 'prettier'

import type { BuiltInParserName } from 'prettier'

const projectRoot = cwd()

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })

const create = async () => {
  if (!existsSync(`${projectRoot}/pages/index.vue`)) {
    const sfc = await formatCode(
      `
      <script setup lang="ts">
      import { } from '@noahyu/lc-ui/index'
      </script>

      <template>
        <div class="lc-ui__preview">
        </div>
      </template>

      <style lang="scss" scoped>
      .lc-ui__preview {
        min-width: 100vw;
        min-height: 100vh;
      }
      </style>`,
      'vue',
    )
    writeFile('pages/index.vue', sfc, 'utf-8')
    consola.success(chalk.green('index: pages/index.vue'))
  }
}

create()
