<template>
  <navigation-bar v-if="!hideNav"/>
  <router-view/>
  <bottom-navigation v-if="!hideNav"/>
</template>

<script lang="ts">
import "@material/web/button/filled-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";
import "@material/web/checkbox/checkbox.js";
import "@material/web/divider/divider.js";
import "@material/web/fab/fab.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/progress/linear-progress.js";
import "@material/web/ripple/ripple.js";
import "@material/web/slider/slider.js";
import "@material/web/switch/switch.js";
import "@material/web/tabs/tabs.js";
import "@material/web/textfield/outlined-text-field.js"

import NavigationBar from "@/components/NavigationBar.vue";
import BottomNavigation from "@/components/ButtonNavigation.vue";

import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar,
    BottomNavigation
  },
  setup() {
    const route = useRoute();

    // Computed property to determine if the navigation should be hidden
    const hideNav = computed(() => {
      return route.meta.hideNav || false;
    });

    return {
      hideNav
    };
  }
});
</script>

<style lang="stylus">

html, body, #app
  height 100%
  margin 0

#app
  font-family var(--font-family)
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color var(--md-sys-color-primary)
  background-color var(--md-sys-color-on-primary)

body
  --font-family Avenir, Helvetica, Arial, sans-serif
  --navbar-height: 56px;

  --md-sys-color-primary rgb(49 74 18)
  --md-sys-color-surface-tint rgb(76 102 43)
  --md-sys-color-on-primary rgb(255 255 255)
  --md-sys-color-primary-container rgb(97 125 63)
  --md-sys-color-on-primary-container rgb(255 255 255)
  --md-sys-color-secondary rgb(60 70 47)
  --md-sys-color-on-secondary rgb(255 255 255)
  --md-sys-color-secondary-container rgb(110 120 94)
  --md-sys-color-on-secondary-container rgb(255 255 255)
  --md-sys-color-tertiary rgb(26 74 71)
  --md-sys-color-on-tertiary rgb(255 255 255);
  --md-sys-color-tertiary-container rgb(79 125 121)
  --md-sys-color-on-tertiary-container rgb(255 255 255)
  --md-sys-color-error: rgb(140 0 9)
  --md-sys-color-on-error: rgb(255 255 255)
  --md-sys-color-error-container: rgb(218 52 46)
  --md-sys-color-on-error-container: rgb(255 255 255)
  --md-sys-color-background: rgb(249 250 239)
  --md-sys-color-on-background: rgb(26 28 22)
  --md-sys-color-surface: rgb(249 250 239)
  --md-sys-color-on-surface: rgb(26 28 22)
  --md-sys-color-surface-variant: rgb(225 228 213)
  --md-sys-color-on-surface-variant: rgb(64 68 57)
  --md-sys-color-outline: rgb(93 97 85)
  --md-sys-color-outline-variant: rgb(120 124 112)
  --md-sys-color-shadow: rgb(0 0 0)
  --md-sys-color-scrim: rgb(0 0 0)
  --md-sys-color-inverse-surface: rgb(47 49 42)
  --md-sys-color-inverse-on-surface: rgb(241 242 230)
  --md-sys-color-inverse-primary: rgb(177 209 138)
  --md-sys-color-primary-fixed: rgb(97 125 63)
  --md-sys-color-on-primary-fixed: rgb(255 255 255)
  --md-sys-color-primary-fixed-dim: rgb(73 100 41)
  --md-sys-color-on-primary-fixed-variant: rgb(255 255 255)
  --md-sys-color-secondary-fixed: rgb(110 120 94)
  --md-sys-color-on-secondary-fixed: rgb(255 255 255)
  --md-sys-color-secondary-fixed-dim: rgb(85 95 71)
  --md-sys-color-on-secondary-fixed-variant: rgb(255 255 255)
  --md-sys-color-tertiary-fixed: rgb(79 125 121)
  --md-sys-color-on-tertiary-fixed: rgb(255 255 255)
  --md-sys-color-tertiary-fixed-dim: rgb(54 100 96)
  --md-sys-color-on-tertiary-fixed-variant: rgb(255 255 255)
  --md-sys-color-surface-dim: rgb(218 219 208)
  --md-sys-color-surface-bright: rgb(249 250 239)
  --md-sys-color-surface-container-lowest: rgb(255 255 255)
  --md-sys-color-surface-container-low: rgb(243 244 233)
  --md-sys-color-surface-container: rgb(238 239 227)
  --md-sys-color-surface-container-high: rgb(232 233 222)
  --md-sys-color-surface-container-highest: rgb(226 227 216)

  --md-sys-color-primary-0 #000000
  --md-sys-color-primary-5 #081400
  --md-sys-color-primary-10 #102000
  --md-sys-color-primary-15 #172B00
  --md-sys-color-primary-20 #1F3700
  --md-sys-color-primary-25 #264300
  --md-sys-color-primary-30 #2F4F00
  --md-sys-color-primary-35 #375C00
  --md-sys-color-primary-40 #3F6900
  --md-sys-color-primary-50 #518500
  --md-sys-color-primary-60 #64A104
  --md-sys-color-primary-70 #7DBD2A
  --md-sys-color-primary-80 #97D945
  --md-sys-color-primary-90 #CAEE9C
  --md-sys-color-primary-95 #D8FDA9
  --md-sys-color-primary-98 #F0FFD7
  --md-sys-color-primary-99 #F9FFE9
  --md-sys-color-primary-100 #FFFFFF

  --md-sys-color-secondary-0 #000000
  --md-sys-color-secondary-05 #081400
  --md-sys-color-secondary-10 #121F04
  --md-sys-color-secondary-15 #1C2A0B
  --md-sys-color-secondary-20 #263515
  --md-sys-color-secondary-25 #31401F
  --md-sys-color-secondary-30 #3C4C2A
  --md-sys-color-secondary-35 #485734
  --md-sys-color-secondary-40 #54643F
  --md-sys-color-secondary-50 #6C7D56
  --md-sys-color-secondary-60 #85976E
  --md-sys-color-secondary-70 #A0B187
  --md-sys-color-secondary-80 #BBCDA1
  --md-sys-color-secondary-90 #D7E9BB
  --md-sys-color-secondary-95 #E5F7C9
  --md-sys-color-secondary-98 #F0FFD7
  --md-sys-color-secondary-99 #F9FFE9
  --md-sys-color-secondary-100 #FFFFFF

  --md-sys-color-tertiary-0 #000000
  --md-sys-color-tertiary-5 #001413
  --md-sys-color-tertiary-10 #00201E
  --md-sys-color-tertiary-15 #002B29
  --md-sys-color-tertiary-20 #003735
  --md-sys-color-tertiary-25 #004340
  --md-sys-color-tertiary-30 #00504C
  --md-sys-color-tertiary-35 #005D59
  --md-sys-color-tertiary-40 #046A66
  --md-sys-color-tertiary-50 #30837F
  --md-sys-color-tertiary-60 #4D9D98
  --md-sys-color-tertiary-70 #69B8B3
  --md-sys-color-tertiary-80 #85D4CF
  --md-sys-color-tertiary-90 #A1F1EB
  --md-sys-color-tertiary-95 #B0FFF9
  --md-sys-color-tertiary-98 #E3FFFC
  --md-sys-color-tertiary-99 #F2FFFD
  --md-sys-color-tertiary-100 #FFFFFF

  --md-sys-color-netural-0 #000000
  --md-sys-color-netural-5 #10110D
  --md-sys-color-netural-10 #1B1C18
  --md-sys-color-netural-15 #252622
  --md-sys-color-netural-20 #30312C
  --md-sys-color-netural-25 #3B3C37
  --md-sys-color-netural-30 #464742
  --md-sys-color-netural-35 #52534D
  --md-sys-color-netural-40 #5E5F59
  --md-sys-color-netural-50 #777771
  --md-sys-color-netural-60 #91918B
  --md-sys-color-netural-70 #ABACA5
  --md-sys-color-netural-80 #C7C7C0
  --md-sys-color-netural-90 #E3E3DB
  --md-sys-color-netural-95 #F2F1E9
  --md-sys-color-netural-98 #FAFAF2
  --md-sys-color-netural-99 #FDFCF5
  --md-sys-color-netural-100 #FFFFFF

  --md-sys-color-netural-varient-0 #000000
  --md-sys-color-netural-varient-5 #0E120A
  --md-sys-color-netural-varient-10 #191D14
  --md-sys-color-netural-varient-15 #23271D
  --md-sys-color-netural-varient-20 #2E3228
  --md-sys-color-netural-varient-25 #393D32
  --md-sys-color-netural-varient-30 #44483D
  --md-sys-color-netural-varient-35 #505449
  --md-sys-color-netural-varient-40 #5C6054
  --md-sys-color-netural-varient-50 #75796C
  --md-sys-color-netural-varient-60 #8F9285
  --md-sys-color-netural-varient-70 #A9AD9F
  --md-sys-color-netural-varient-80 #C5C8BA
  --md-sys-color-netural-varient-90 #E1E4D5
  --md-sys-color-netural-varient-95 #EFF2E3
  --md-sys-color-netural-varient-98 #F8FBEB
  --md-sys-color-netural-varient-99 #FBFEEE
  --md-sys-color-netural-varient-100 #FFFFFF

  --md-sys-fontsize-headline-small 20px
  --md-sys-fontsize-label-large 14px
  --md-sys-fontsize-title-medium 14px

  --md-icon-font: "Material Symbols Rounded"
  --md-text-button-label-text-type: 600 1rem/1.25rem var(--font-family)
  --md-ref-typeface-plain: var(--font-family)
  --md-outlined-text-field-container-shape: 12px

body
  scrollbar-color: var(--md-sys-color-primary)

  &::-webkit-scrollbar:vertical,
  .bordered-scrollbar::-webkit-scrollbar
    width: calc(var(--scrollbar-width, 8px) + 8px)

  &::-webkit-scrollbar:horizontal,
  .bordered-scrollbar::-webkit-scrollbar:horizontal
    height: calc(var(--scrollbar-width, 8px) + 8px)

  &::-webkit-scrollbar-thumb,
  .bordered-scrollbar::-webkit-scrollbar-thumb
    border: 4px solid transparent
    background-clip: content-box

::-webkit-scrollbar
  width: var(--scrollbar-width, 8px)
  &:horizontal
    height: var(--scrollbar-width, 8px)

::-webkit-scrollbar-thumb
  border-radius: 9999px;
  background-color: var(--md-sys-color-primary)

@media (max-width: 400px)
  body
    --scrollbar-width: 4px
    &::-webkit-scrollbar:vertical,
    .bordered-scrollbar::-webkit-scrollbar:vertical
      width: calc(var(--scrollbar-width, 6px) + 4px)

    &::-webkit-scrollbar-thumb:vertical,
    .bordered-scrollbar::-webkit-scrollbar-thumb:vertical
      border-width: 2px

</style>
