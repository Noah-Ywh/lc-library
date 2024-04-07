import {
  uiRoot,
  resolve,
  gulp,
  gulpSass,
  autoprefixer,
  cleanCSS,
  rename,
  rimraf,
  rollup,
  nodeResolve,
  commonjs,
  esbuild,
  parseJson,
  glob,
  consola,
  chalk,
  dartSass,
  vuePlugin,
  vueJsx,
  readFileSync,
} from '../utils'

import { dts, excludeModules } from '../plugins'

const { src, dest } = gulp

const { cyan, yellow, green } = chalk

const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', '__tests__', 'gulpfile', 'dist', 'global.d.ts', 'env.d.ts']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

export const buildUI = async () => {
  await rimraf(resolve(uiRoot, 'dist'))

  const pkgPath = resolve(uiRoot, 'package.json')
  const pkg = parseJson(readFileSync(pkgPath, 'utf-8'))

  const buildComponent = async () => {
    const input = excludeFiles(
      await glob('**/*.{ts,tsx,vue}', {
        cwd: uiRoot,
        absolute: true,
        onlyFiles: true,
      }),
    )
    const bundle = await rollup({
      input,
      plugins: [
        excludeModules(['@noahyu/lc-helpers', '@noahyu/lc-ui']),
        vuePlugin({
          isProduction: true,
        }),
        vueJsx({
          transformOn: true,
          optimize: true,
          mergeProps: true,
          enableObjectSlots: true,
        }),
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
        commonjs(),
        esbuild({
          sourceMap: false,
          target: 'ESNext',
          loaders: {
            '.vue': 'ts',
          },
        }),
        dts({
          compilerOptions: {
            emitDeclarationOnly: true,
            preserveSymlinks: true,
            skipLibCheck: true,
            noImplicitAny: false,
            removeComments: false,
          },
          tsConfigFilePath: resolve(uiRoot, './tsconfig.json'),
          injectFiles: [resolve(uiRoot, 'components/env.d.ts')],
          paths: {
            '@lc-ui': '@noahyu/lc-ui/dist',
          },
        }),
      ],
      external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
      treeshake: false,
    })
    await bundle.write({
      format: 'esm',
      dir: resolve(uiRoot, 'dist'),
      preserveModules: true,
      sourcemap: 'hidden',
    })
  }

  const buildStyle = () => {
    const sass = gulpSass(dartSass)
    const noPrefixFile = /(index|base|component)/

    return src(resolve(uiRoot, 'styles/*.scss'))
      .pipe(sass.sync({ includePaths: [resolve(uiRoot, './node_modules')] }))
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        cleanCSS({}, (details) => {
          consola.success(
            `${green('CSS: ')}${cyan(details.name)} => ${yellow(
              details.stats.originalSize / 1000,
            )} KB -> ${green(details.stats.minifiedSize / 1000)} KB`,
          )
        }),
      )
      .pipe(
        rename((path) => {
          if (!noPrefixFile.test(path.basename)) {
            path.basename = `lc-${path.basename}`
          }
        }),
      )
      .pipe(dest(resolve(uiRoot, 'dist/styles')))
  }

  const copyScss = () => {
    return src(resolve(uiRoot, 'styles/**')).pipe(dest(resolve(uiRoot, 'dist/styles/scss')))
  }

  return [buildComponent, buildStyle, copyScss]
}
