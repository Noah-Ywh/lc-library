import { definePropType, sizePropType } from '../../../utils'

import type { Ref } from 'vue'
import type { TributeCollection } from 'tributejs'

/** 提及列表 */
export type LMentionsValues = {
  /** 文本内容 */
  label: string
  /** 识别码 */
  value: string
  /** 头像 */
  avatar?: string
  /** 单击链接 */
  link?: string
}
/** 配置列表 */
export type LMentionsOptions = { values: LMentionsValues[] } | Ref<{ values: LMentionsValues[] }>

export const mentionsProps = {
  options: {
    type: definePropType<LMentionsOptions>(Object),
    required: true,
  },
  height: {
    typs: sizePropType(String),
    default: '',
  },
  /** 防抖：等待时间 */
  debounce: {
    typs: Number,
    default: 0,
  },
}

export const mentionsEmits = {
  innerHtml: (innerHtml: string) => innerHtml,
}

export const defaultOptions: TributeCollection<LMentionsValues> = {
  /** 提及列表 */
  values: undefined,
  /** 是否在 iframe 中使用 */
  iframe: null,
  /** 菜单中所选项的 class */
  selectClass: 'is-active',
  /** 菜单容器的 class */
  containerClass: 'lc-mentions__menu',
  /** 菜单每一项的 class */
  itemClass: 'lc-mentions__menu-item',
  /** 触发符号 */
  trigger: '@',
  /** 提及自动完成 */
  autocompleteMode: false,
  /** 内容插入模版 */
  selectTemplate: function (item) {
    if (item.original.link) {
      return (
        '&nbsp' +
        '<span class="lc-mentions__content" contenteditable="false">' +
        `<a href="${item.original.link}" class="lc-a is-label is-link" target="__blank">@` +
        item.original.label +
        '</a>' +
        '<i class="is-value" style="display:none">' +
        '@${' +
        `${item.original.value}` +
        '}' +
        '</i>' +
        '</span>'
      )
    }
    return (
      '&nbsp' +
      '<span class="lc-mentions__content" contenteditable="false">' +
      `<span class="is-label">@${item.original.label}</span>` +
      '<i class="is-value" style="display:none">' +
      '@${' +
      `${item.original.value}` +
      '}' +
      '</i>' +
      '</span>'
    )
  },
  /** 菜单中显示项目的模版 */
  menuItemTemplate: function (item) {
    if (item.original.avatar) {
      return `<img src="${item.original.avatar}" class="lc-mentions__avatar">${item.original.label}`
    }
    return `<span class="lc-mentions__avatar">${item.original.label.charAt(0)}</span>${item.original.label}`
  },
  /** 在对象中搜索的 key */
  lookup: 'value',
  /** 插入到内容的 key */
  fillAttr: 'label',
  /** 指定菜单插入的位置 */
  menuContainer: undefined,
  /** 未找到匹配项时显示一下内容 */
  noMatchTemplate: undefined,
  /** 触发前是否需要空格 */
  requireLeadingSpace: false,
  /** 提及的中间是否允许有空格 */
  allowSpaces: false,
  /** 为替换文本指定自定义后缀 */
  replaceTextSuffix: undefined,
  /** 指定菜单是否应定位。设置为 false 并与 menuContainer 结合使用以创建内联菜单 */
  positionMenu: false,
  /** 包装匹配结果的元素，默认 span */
  searchOpts: undefined,
  /** 匹配结果之前至少所需字符 */
  menuShowMinLength: 0,
}
