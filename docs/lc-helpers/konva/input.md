# Input 输入框

```ts
import { Input } from '@noahyu/lc-helpers/konva'
```

::: warning 环境
不支持 SSR，如果你使用 Nuxt，请使用 `<ClientOnly></ClientOnly>` 包括组件或使用 `*.client.vue` 文件
:::

::: tip 注意
`Stage` 容器节点需要设置 CSS 属性： `position`，否则输入框定位将出现异常
:::

## 创建输入框对象

```ts
const input = new Input({
  x: 0,
  y: 0,
  width: 200,
  text: '请输入...',
  fill: 'red',
  fontSize: 14,
  lineHeight: 1.4,
  align: 'left',
  verticalAlign: 'middle',
  fontFamily: 'Calibri',
  ellipsis: true,
  wrap: 'none',
  backgroundColor: 'yellow',
  borderColor: 'black',
  blur(text) {
    // 失焦后获取文本并计算文本宽度
    const { width } = input.measureSize(text)
    // 修改宽度
    input.width(width)
  },
})
```

## 类型声明

```ts
export type InputConfig = Konva.TextConfig & {
  /** 输入框背景色 */
  backgroundColor?: string
  /** 输入框边框颜色 */
  borderColor?: string
  /** 失焦事件 */
  blur?: (text: string) => void
}

export declare class Input extends Konva.Text {
  constructor(config: InputConfig)
}
```
