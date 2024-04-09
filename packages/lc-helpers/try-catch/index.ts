export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<[T, E]> {
  try {
    const ret = await promise
    return [ret, null as E]
  } catch (e) {
    return [null as T, e as E]
  }
}
