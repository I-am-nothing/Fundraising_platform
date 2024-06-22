<template>
  <header class="nav-bar">
    <div class="home-link">
      <router-link to="/" tabindex="-1">
        <md-text-button class="button">
          <div class="align">
            <md-icon>pets</md-icon>
            <span class="home-title">Nothing 募資</span>
          </div>
        </md-text-button>
      </router-link>
      <div class="line"/>
      <router-link to="/explore" style="margin-left: 24px" class="route">
        <md-text-button class="button">
          <div class="align">
            <md-icon class="icon">radio_button_checked</md-icon>
            <span class="sub-nav">探索</span>
          </div>
        </md-text-button>
      </router-link>
      <router-link to="/summit-idea" class="route">
        <md-text-button class="button">
          <div class="align">
            <md-icon class="icon">add</md-icon>
            <span class="sub-nav">提案</span>
          </div>
        </md-text-button>
      </router-link>
    </div>
    <div class="user-link">
      <router-link to="/explore" class="explore-search">
        <md-icon-button>
          <md-icon>search</md-icon>
        </md-icon-button>
      </router-link>
      <router-link to="/login">
        <md-text-button class="button">
          <div class="align">
            <md-icon class="icon">navigate_next</md-icon>
            <span class="sub-nav">登入</span>
          </div>
        </md-text-button>
      </router-link>
      <router-link v-if="false" to="/user">
        <md-text-button class="button">
          <div class="align">
            <md-icon class="icon">account_circle</md-icon>
            <span class="sub-nav">使用者</span>
          </div>
        </md-text-button>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";

export default defineComponent({
  name: 'NavigationBar',
  components: {},
  setup() {
    return {}
  }
})

</script>

<style lang="stylus" scoped>
.nav-bar
  position relative
  z-index 4
  box-sizing border-box
  height var(--navbar-height)
  box-shadow 0 1px 8px 0 rgba(0, 0, 0, .25)
  background-color var(--md-sys-color-on-primary)
  display flex
  justify-content space-between
  align-items center
  .home-link
    display flex
    flex-direction row
    margin-left 16px
    align-items center
  .user-link
    margin-right 24px
    display flex
    flex-direction row
    align-items center
    .explore-search
      display none
  .icon
    margin-right 4px
    --md-icon-size 16px
  .line
    height 24px
    width 1px
    background-color var(--md-sys-color-netural-10)
  .home-title
    margin-top 6px
    height 24px
    margin-left 8px
    font-size var(--md-sys-fontsize-headline-small)
  .sub-nav
    font-size var(--md-sys-fontsize-label-large)
  .button
    .align
      display flex
      align-items center
      span
        font-weight 550

@media (max-width: 474px)
  .nav-bar
    .home-link
      margin-left 8px
      .line
        display none
      .route
        display none
      .sub-nav
        display none
    .user-link
      margin-right 16px
      .explore-search
        margin-left 24px
        display block
</style>
