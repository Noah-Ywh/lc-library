<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

import Tribute from 'tributejs'

import { mentionsProps, mentionsEmits, defaultOptions } from './mentions'
import { useNamespace } from '@noahyu/lc-helpers'

import type { Ref } from 'vue'
import type { LMentionsValues } from './mentions'

export interface TributeElement extends HTMLElement {
  tributeInstance?: Tribute<object>
}

const props = defineProps(mentionsProps)
const emits = defineEmits(mentionsEmits)

const { bem } = useNamespace('mentions')

const root = ref<HTMLElement>()
const containerEl = ref<HTMLElement>()
const tributeEl = ref<TributeElement>()
const tribute = ref<Tribute<LMentionsValues>>()

/** 加载 Tribute
 * @
 * -------------------------- */
function attachTribute(tributeDom: Ref<TributeElement | undefined>, values: LMentionsValues[]) {
  defaultOptions.menuContainer = root.value

  const tributeOptions = {
    ...defaultOptions,
    values,
    lookup: props.lookup,
    fillAttr: props.fillAttr,
    noMatchTemplate: () => '',
  }

  if (!tributeDom.value) {
    throw new Error('[lc-ui] 加载 DOM 时发生错误')
  }

  tribute.value = new Tribute(tributeOptions)
  tribute.value.attach(tributeDom.value)
  tributeDom.value.tributeInstance = tribute.value
}

/** 移除 Tribute
 * @
 * -------------------------- */
function detachTribute(tributeDom: Ref<TributeElement | undefined>) {
  if (!tributeDom.value?.tributeInstance) {
    return
  }

  tributeDom.value.tributeInstance.detach(tributeDom.value)
  tributeDom.value.tributeInstance = undefined
  delete tributeDom.value.dataset.tribute
}

/** 获得焦点
 * @
 * -------------------------- */
function focusMentions() {
  if (!containerEl.value) {
    throw new Error('[lc-ui] 加载 DOM 时发生错误')
  }

  const range = document.createRange()
  range.selectNodeContents(containerEl.value)
  range.collapse(false)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

/** 展开选项菜单
 * @
 * -------------------------- */
function showMentions() {
  if (!containerEl.value) {
    throw new Error('[lc-ui] 加载 DOM 时发生错误')
  }
  tribute.value?.showMenuForCollection(containerEl.value)
}

/** 获取内容
 * @
 * -------------------------- */
function getInnerHTML(): string {
  return containerEl.value?.innerHTML || ''
}

/** 设置内容
 * @
 * -------------------------- */
function setInnerHTML(innerHTML: string) {
  if (!containerEl.value) {
    return
  }

  const html = innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

  containerEl.value.insertAdjacentHTML('beforeend', html)
  focusMentions()
}

/** 清除内容
 * @
 * -------------------------- */
function clearInnerHTML() {
  if (!containerEl.value) {
    return
  }
  containerEl.value.innerHTML = ''
}

const timeout = ref<NodeJS.Timeout | null>(null)

/** 输入事件
 * @
 * -------------------------- */
function onInput() {
  function sendInnerHTML() {
    emits('innerHtml', containerEl.value?.innerHTML || '')
  }

  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  if (props.debounce) {
    timeout.value = setTimeout(sendInnerHTML, props.debounce)
  } else {
    sendInnerHTML()
  }
}

/** 粘贴事件
 * @
 * -------------------------- */
function onPaste(event: ClipboardEvent) {
  if (!props.pasteImg) {
    const clipboardData = event.clipboardData
    const types = clipboardData?.types || []

    // 检查是否包含图片内容
    for (let i = 0; i < types.length; i++) {
      if (types[i].startsWith('image/') || types[i] === 'Files') {
        // 阻止粘贴图片内容
        event.preventDefault()
        return
      }
    }

    // 如果只包含文本内容，允许粘贴
    const text = clipboardData?.getData('text/plain')
    if (text) {
      // 将文本插入到目标元素中
      insertTextAtCursor(text)
      event.preventDefault()
    }
  }
}

/** 在光标位置插入文本
 * @param {string} text 要插入的文本
 * @
 * -------------------------- */
function insertTextAtCursor(text: string) {
  const selection = window.getSelection()
  if (selection?.rangeCount) {
    const range = selection.getRangeAt(0)
    range.deleteContents()

    const textNode = document.createTextNode(text)
    range.insertNode(textNode)

    // 移动光标到插入文本的末尾
    range.setStartAfter(textNode)
    range.setEndAfter(textNode)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

onMounted(() => {
  tributeEl.value = containerEl.value

  if (props.values) {
    attachTribute(tributeEl, props.values)
  }
})

onBeforeUnmount(() => {
  detachTribute(tributeEl)
})

/** 监听 options 更新，更新后重新加载 */
watch(
  () => props.values,
  async (newValues) => {
    if (tributeEl.value?.tributeInstance && newValues) {
      await nextTick()
      detachTribute(tributeEl)
      await nextTick()
      attachTribute(tributeEl, newValues)
    }
  },
  { deep: true },
)

defineExpose({
  focusMentions,
  showMentions,
  getInnerHTML,
  setInnerHTML,
  clearInnerHTML,
})
</script>

<template>
  <div ref="root" :class="bem()">
    <p
      ref="containerEl"
      :class="['lc-p', bem('container')]"
      :style="{ height }"
      @input="onInput"
      @paste="onPaste"
    ></p>
  </div>
</template>
