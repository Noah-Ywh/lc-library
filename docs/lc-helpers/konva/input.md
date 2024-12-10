# Input 输入框

```ts
import { Input } from '@noahyu/lc-helpers/konva'
```

::: warning 环境
不支持 SSR，如果你使用 Nuxt，请使用 `<ClientOnly></ClientOnly>` 包裹组件或使用 `*.client.vue` 文件
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
  focus(text) {
    // 获得焦点时触发
    console.log(text)
  },
  input(text) {
    // 输入内容时触发
    console.log(text)
  },
  blur(text) {
    // 失去焦点时触发
    console.log(text)
  },
})
```

## 缩放

缩放舞台时需主动触发 `changeScale` 事件使输入框同步缩放

```ts
input.fire('changeScale')
```

这可能不是必须的，因为每次进入编辑都会计算输入框的位置以及缩放情况，只有在编辑状态下（焦点仍在输入框）触发缩放时才需要在缩放的同时触发该事件

## 类型声明

```ts
export type InputConfig = Konva.TextConfig & {
  styleType?: 'outlined'
  /** 输入框背景色 */
  backgroundColor?: string
  /** 输入框边框颜色 */
  borderColor?: string
  /** 焦点事件 */
  focus?: (text: string) => void
  /** 输入事件 */
  input?: (text: string) => void
  /** 失焦事件 */
  blur?: (text: string) => void
}

export declare class Input extends Konva.Text {
  constructor(config: InputConfig)
}
```
