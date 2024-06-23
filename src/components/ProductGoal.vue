<template>
  <div class="product-goal">
    <span>輕鬆學 \ 風趣 \ Vue 3 \ Typescript</span>
    <div class="contact">
      <span>提案人</span>
      <router-link to="/company/0001" class="button">Nothing Chang</router-link>
    </div>
    <span class="title">【Vue3 + Typescript 教學募資】， 輕松學習，由 Nothing 所創建的快速上手課程！</span>
    <div class="info-layout">
      <div class="progress-layout">
        <md-circular-progress class="progress" value="0.75"></md-circular-progress>
        <span>87%</span>
      </div>
      <div class="info">
        <span style="font-size: var(--md-sys-fontsize-title-medium)">目標 NT$ 100,000</span>
        <span style="font-size: var(--md-sys-fontsize-headline-medium); font-weight: 550">NT$ 87,000</span>
        <div class="other">
          <md-icon class="icon">person_3</md-icon>
          <span class="count">87 人</span>
          <md-icon class="icon" style="margin-left: 16px">timer</md-icon>
          <span class="count">4 天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";
import {useRoute} from "vue-router";

/**
 * product goal
 * @param goalPercent
 * @param goal
 * @param current
 * @param remain
 * @param founders
 * @example <product-goal goalPercent="87" goal="000,000" current="000,000" remain="0" founders="0"/>
 */
export default defineComponent({
  name: 'ProductGoal',
  components: {},
  props: {
    goalPercent: {
      type: Number,
      default: 87
    },
    goal: {
      type: String,
      default: '000,000'
    },
    current: {
      type: String,
      default: '000,000'
    },
    remain: {
      type: Number,
      default: 0
    },
    founders: {
      type: Number,
      default: 0
    },
  },
  setup() {
    return {}
  }
})

</script>

<style lang="stylus" scoped>
.product-goal
  display flex
  flex-direction column
  width 100%
  .title
    font-size var(--md-sys-fontsize-title-large)
    margin-top 16px
  .contact
    margin-top 4px
    .button
      margin-left 4px
      font-size var(--md-sys-fontsize-title-medium)
      color var(--md-sys-color-primary)
      border none
  span
    color var(--md-sys-color-netural-10)
    font-size var(--md-sys-fontsize-title-medium)

  .info-layout
    margin-block 8px
    display flex
    .info
      display flex
      flex-direction column
      justify-content center
      margin-left 16px
      .other
        display flex
        align-items center
        .icon
          margin-right 4px
          --md-icon-size 16px
        .count
          font-size var(--md-sys-fontsize-title-medium)
    .progress-layout
      margin-top 8px
      position relative
      .progress
        --md-circular-progress-size: 72px;
        --md-circular-progress-active-indicator-width: 6;
        position: relative;
      span
        position absolute
        width 72px
        height 72px
        display flex
        justify-content center
        align-items center
        left 0
        top 0


</style>
