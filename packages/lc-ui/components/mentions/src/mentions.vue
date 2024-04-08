<script setup lang="ts">
import { ref, unref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

import Tribute from 'tributejs'

import { mentionsProps, mentionsEmits, defaultOptions } from './mentions'
import { useNamespace } from '@noahyu/lc-helpers'

import type { Ref } from 'vue'
import type { LMentionsOptions, LMentionsValues } from './mentions'

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
function attachTribute(tributeDom: Ref<TributeElement | undefined>, options: LMentionsOptions) {
  if (!tributeDom.value) {
    throw new Error('[lc-ui] 没有正确加载 DOM，这是我们的错误，请向我们反馈')
  }

  defaultOptions.menuContainer = root.value

  const tributeOptions = { ...defaultOptions, ...unref(options) }

  tribute.value = new Tribute(tributeOptions)
  tribute.value.attach(tributeDom.value)
  tributeDom.value.tributeInstance = tribute.value
}

/** 移除 Tribute
 * @
 * -------------------------- */
function detachTribute(tributeDom: Ref<TributeElement | undefined>) {
  if (!tributeDom.value?.tributeInstance) return

  tributeDom.value.tributeInstance.detach(tributeDom.value)
  tributeDom.value.tributeInstance = undefined
  delete tributeDom.value.dataset.tribute
}

/** 获得焦点
 * @
 * -------------------------- */
function focusMentions() {
  if (!containerEl.value) {
    throw new Error('[lc-ui] 没有正确加载 DOM，这是我们的错误，请向我们反馈')
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
    throw new Error('[lc-ui] 没有正确加载 DOM，这是我们的错误，请向我们反馈')
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
  if (!containerEl.value) return

  const html = innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

  containerEl.value.insertAdjacentHTML('beforeend', html)
  focusMentions()
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

onMounted(() => {
  tributeEl.value = containerEl.value

  if (props.options) {
    attachTribute(tributeEl, props.options)
  }
})

onBeforeUnmount(() => {
  detachTribute(tributeEl)
})

/** 监听 options 更新，更新后重新加载 */
watch(
  () => props.options,
  async (newOptions) => {
    if (tributeEl.value?.tributeInstance && newOptions) {
      await nextTick()
      detachTribute(tributeEl)
      await nextTick()
      attachTribute(tributeEl, { ...newOptions })
    }
  },
  { deep: true },
)

defineExpose({
  focusMentions,
  showMentions,
  getInnerHTML,
  setInnerHTML,
})
</script>

<template>
  <div ref="root" :class="bem()">
    <p ref="containerEl" :class="bem('container')" :style="{ height }" @input="onInput"></p>
  </div>
</template>
