/**
 * @Describe 是否为中国大陆手机号码
 * @param { String } val 要验证的手机号码
 * @returns { Boolean } 验证结果
 */
export function isMobile(val: string): boolean {
  return /^1[3-9]\d{9}$/.test(val)
}
