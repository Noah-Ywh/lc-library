/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropType } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const colorPropType = (
  val: any,
): PropType<
  | `#${string}`
  | `rgb(${string},${string},${string})`
  | `rgba(${string},${string},${string},${string})`
  | `--lc-${string}`
> => val

export const sizePropType = (val: any): PropType<`${number}px` | `${number}%`> => val
