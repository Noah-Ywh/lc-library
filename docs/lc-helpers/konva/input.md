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
  height: 24,
  text: '点击进入编辑模式',
  fill: 'red',
  fontSize: 18,
  align: 'center',
  verticalAlign: 'middle',
  fontFamily: 'Calibri',
  color: 'white',
  ellipsis: true,
  wrap: 'none',
})
```

## 响应式内容

提供一个 ref 对象

```ts{1,17}
const inputText = ref('点击进入编辑模式')
const input = new Input(
  {
    x: 0,
    y: 0,
    width: 200,
    height: 24,
    fill: 'red',
    fontSize: 18,
    align: 'center',
    verticalAlign: 'middle',
    fontFamily: 'Calibri',
    color: 'white',
    ellipsis: true,
    wrap: 'none',
  },
  inputText,
)
```

## 类型声明

```ts
type InputConfigGroup = Pick<
  Konva.GroupConfig,
  | 'x'
  | 'y'
  | 'width'
  | 'height'
  | 'visible'
  | 'id'
  | 'name'
  | 'opacity'
  | 'draggable'
  | 'dragDistance'
  | 'dragBoundFunc'
>

type InputConfigRect = Pick<
  Konva.RectConfig,
  | 'cornerRadius'
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'shadowColor'
  | 'shadowBlur'
  | 'shadowOffset'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'shadowOpacity'
  | 'shadowEnabled'
>

type InputConfigText = Pick<
  Konva.TextConfig,
  'fontFamily' | 'fontSize' | 'fontStyle' | 'text' | 'align' | 'verticalAlign' | 'ellipsis' | 'wrap'
> & {
  color?: string
}

export type InputConfig = InputConfigGroup & InputConfigRect & InputConfigText

export declare class Input extends Konva.Group {
  constructor(config: InputConfig, value?: Ref<string>)
}
```
