import { resolve } from 'node:path'
import { cwd } from 'node:process'

export const projectRoot = resolve(cwd(), '../../')
export const pkgRoot = resolve(projectRoot, 'packages')
export const uiRoot = resolve(pkgRoot, 'lc-ui')
export const helpersRoot = resolve(pkgRoot, 'lc-helpers')
