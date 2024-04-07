import { defineComponent, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { useNamespace } from '../use-namespace'

import type { VueWrapper } from '@vue/test-utils'

const TestComp = defineComponent({
  setup() {
    const { bem, is } = useNamespace('example')

    const classExample = {
      focus: true,
      primary: true,
    }

    return () => (
      <div
        id="testId"
        class={[
          bem(), // 'lc-example'
          bem('alert'), // 'lc-example__alert'
          bem('alert', 'primary'), // 'lc-example__alert--primary'

          is({ hover: true }), // ['is--hover']
          is(classExample), // ['is--focus', 'is--primary']
          is('warning'), // ['is--warning']
          is('active', 'click'), // ['is--active', 'is--click']
          is({ wheel: true }, 'mouseenter'), // ['is--wheel', 'is--mouseenter']
        ]}
      >
        text
      </div>
    )
  },
})

describe('use-namespace', () => {
  const Comp = defineComponent({
    setup(_props, { slots }) {
      return () => slots.default?.()
    },
  })

  let wrapper: VueWrapper<InstanceType<typeof Comp>>
  beforeEach(() => {
    wrapper = mount(Comp, {
      slots: { default: () => <TestComp /> },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('bem test', async () => {
    await nextTick()
    expect(wrapper.find('#testId').classes()).toEqual([
      'lc-example', // bem()
      'lc-example__alert', // bem('alert')
      'lc-example__alert--primary', // bem('alert', 'primary')

      'is--hover', // is({ hover: true })
      'is--focus', // is(classExample)
      'is--primary',
      'is--warning', // is('warning')
      'is--active', // is('active', 'click')
      'is--click',
      'is--wheel', // is({ wheel: true }, 'mouseenter')
      'is--mouseenter',
    ])
  })
})
