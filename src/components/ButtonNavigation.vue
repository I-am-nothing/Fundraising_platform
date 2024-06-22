<template>
  <div class="button-nav">
    <div class="line" style="margin-top: 0"/>
    <div class="nav-layout">
      <div class="block"/>
      <div class="align">
        <md-icon class="icon">pets</md-icon>
        <span class="home-title">Nothing 募資</span>
      </div>
      <div class="nav" v-for="nav in navConfigRef" :key="nav.title">
        <span class="title" style="font-weight: 550">{{nav.title}}</span>
        <router-link :to="route.route" class="route" v-for="route in nav.routes" :key="route.title">
          <span class="title">{{route.title}}</span>
        </router-link>
      </div>
      <div class="link">
        <md-icon-button :aria-label="link.name" v-for="link in linksRef" :key="link.name" @click="navClick(link.url)">
          <color-icon :src="link.svg"/>
        </md-icon-button>
      </div>
      <div class="block"/>
    </div>
    <div class="line"/>
    <span class="company">@ Nothing Tech Company</span>
    <div class="line" style="margin-bottom: 0"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";

export default defineComponent({
  name: 'BottomNavigation',
  components: {ColorIcon},
  setup() {
    const navConfigRef = ref([{
        title: "幫助",
        routes: [{
          title: "常見問題",
          route: "/faq"
        }, {
          title: "使用條款",
          route: "/terms"
        }, {
          title: "隱私權政策",
          route: "/privacy"
        }]
      }, {
        title: "關於",
        routes: [{
          title: "關於我們",
          route: "/about"
        }, {
          title: "商標資源",
          route: "/brand"
        }, {
          title: "其他",
          route: "/other"
      }]
    }])

    const linksRef = ref([{
      svg: "icons/X.svg",
      name: "X",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }, {
      svg: "icons/fb.svg",
      name: "Facebook",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }, {
      svg: "icons/line.svg",
      name: "Line",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }, {
      svg: "icons/ig.svg",
      name: "Instagram",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }, {
      svg: "icons/youtube.svg",
      name: "Youtube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }])

    function navClick(url: string) {
      window.open(url, '_blank')
    }

    return {navConfigRef, linksRef, navClick}
  }
})

</script>

<style lang="stylus" scoped>
.button-nav
  display flex
  flex-direction column
  background-color var(--md-sys-color-on-primary)
  .line
    width 100%
    height 1px
    background-color var(--md-sys-color-netural-70)
    margin-block 16px
  .company
    font-size var(--md-sys-fontsize-title-medium)
    color var(--md-sys-color-netural-10)
    text-align center

  .nav-layout
    display flex
    justify-content space-around
    .block
      width 10%
    .nav
      display flex
      flex-direction column
      align-items start
      .title
        font-size var(--md-sys-fontsize-title-medium)
        color var(--md-sys-color-netural-10)
        margin-block 4px
      .route
        display flex
        text-decoration-color underline
        color var(--md-sys-color-primary)
        &:hover
          .title
            font-weight 550
    .align
      margin-top 8px
      height fit-content
      display flex
      align-items center
      .icon
        margin-right 16px
      .home-title
        font-size var(--md-sys-fontsize-headline-small)

@media (max-width: 950px)
  .button-nav
    .nav-layout
      .block
        width 0

@media (max-width: 728px)
  .button-nav
    .nav-layout
      margin-inline 32px
      flex-direction column
      .link
        margin-top 8px
      .nav
        margin-top 16px
      .block
        width 0
</style>
