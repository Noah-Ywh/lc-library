# DOM 相关

```ts
import { useDomLengthUnit, useDomSizeChange } from '@noahyu/lc-helpers'
```

## 处理 CSS 长度单位

```ts
/**
 * @Describe 如果css值带有长度单位，则直接返回，如果没有则添加单位后返回
 * @param { String } val 值
 * @param { String } unit 单位，如果不提供单位则默认为 'px'
 */

useDomLengthUnit(20) // '20px'
useDomLengthUnit(20, 'rem') // '20rem'
useDomLengthUnit('20em') // '20em'
```

## 监听元素变化

```ts
useDomSizeChange(dom, ({ width, height }) => {
  console.log(width)
  console.log(height)
})
```
