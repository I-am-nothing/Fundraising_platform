<template>
  <div role="img">
    <div :style="{
      width: width !== undefined ? padUnit(width) : '100%',
      height: height !== undefined  ? padUnit(height) : '100%',
      'mask-image': `url(${require('@/assets/' + fileName)})`
    }"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

/**
 * @example
 * // get size from css
 * <color-icon src="@/assets/ok.svg" color="var(--text-color)"/>
 *
 * // use default color: currentcolor {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword MDN}
 * // default size unit: px
 * <color-icon src="ok.svg" width="48" height="1em"/>
 */
export default defineComponent({
  name: "ColorIcon",
  props: {
    src: {
      type: String,
      required: true
    },
    width: [String, Number],
    height: [String, Number],
    color: {
      type: String,
      default: 'currentcolor'
    }
  },
  setup(props) {
    const fileName = props.src.replace(/^((@|src)\/|(\.\.\/)*)assets\//, '')
    return { fileName }
  },
  methods: {
    padUnit(value: string | number): string {
      return typeof value === 'number' || /^(\d|\.)+$/.test(value) ?
        `${value}px` : value
    }
  }
})
</script>

<style scoped lang="stylus">
  div[role=img]
    display inline-block
    > div
      mask-size contain
      mask-position center
      mask-repeat no-repeat
      background-color v-bind(color)
</style>