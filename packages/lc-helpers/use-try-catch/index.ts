/** @deprecated 已弃用，请使用 useTryCatch() 替代.
 * @
 * -------------------------- */
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<[T, E]> {
  try {
    const ret = await promise
    return [ret, null as E]
  } catch (e) {
    return [null as T, e as E]
  }
}

export async function useTryCatch<T, E = Error>(promise: Promise<T>): Promise<[T, E]> {
  try {
    const ret = await promise
    return [ret, null as E]
  } catch (e) {
    return [null as T, e as E]
  }
}
