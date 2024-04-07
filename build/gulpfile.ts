import { argv } from 'node:process'
import gulp from 'gulp'

import { buildHelpers, buildUI } from './src'

const { series } = gulp

let tasks

const libNameIndex = argv.indexOf('--lib') + 1

switch (argv[libNameIndex]) {
  case 'lc-ui':
    tasks = series(...(await buildUI()))
    break
  case 'lc-helpers':
    tasks = series(await buildHelpers(false))
    break
  case 'lc-helpers-w':
    tasks = series(await buildHelpers(true))
    break
  default:
    tasks = series(await buildHelpers(false), ...(await buildUI()))
}

export default tasks
