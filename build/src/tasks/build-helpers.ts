import {
  helpersRoot,
  resolve,
  rimraf,
  rollup,
  watch,
  nodeResolve,
  commonjs,
  typescript,
  esbuild,
  parseJson,
  readFileSync,
} from '../utils'

import type { InputOptions, OutputOptions } from 'rollup'

const pkgPath = resolve(helpersRoot, 'package.json')
const pkg = parseJson(readFileSync(pkgPath, 'utf-8'))

export const buildHelpers = async (isWatch?: boolean) => {
  await rimraf(resolve(helpersRoot, 'dist'))

  const inputOptions: InputOptions = {
    input: {
      index: `${helpersRoot}/index.ts`,
      'lc-konva': `${helpersRoot}/lc-konva.ts`,
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'ESNext',
      }),
      typescript({ tsconfig: `${helpersRoot}/tsconfig.json` }),
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    watch: {
      exclude: ['./node_modules/**', './dist/**'],
    },
  }

  const outputOptions: OutputOptions = {
    format: 'esm',
    dir: resolve(helpersRoot, 'dist'),
    preserveModules: true,
    sourcemap: false,
  }

  async function build() {
    const bundle = await rollup(inputOptions)
    bundle.write(outputOptions)
    if (bundle) {
      console.log('helpers 打包完成...')
      await bundle.close()
    }
  }

  function watchBuild() {
    let packCount = 1
    const watcher = watch({
      ...inputOptions,
      output: outputOptions,
    })

    watcher.on('event', (event) => {
      if (event.code === 'START') {
        console.log(`helpers 开始打包...+${packCount}`)
      }
      if (event.code === 'BUNDLE_END') {
        packCount++
        console.log('helpers 完成打包...')
        event.result.close()
      }
      if (event.code === 'END') {
        console.log('helpers 打包结束...')
      }
      if (event.code === 'ERROR') {
        console.log('helpers 错误...')
        console.log(event.error)
      }
    })
  }

  return isWatch ? watchBuild : build
}
