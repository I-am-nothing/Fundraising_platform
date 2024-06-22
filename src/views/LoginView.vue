<template>
  <div class="login">
    <div class="img-container"/>
    <div class="login-layout">
      <div class="login-container">
        <div class="align">
          <md-icon class="icon">pets</md-icon>
          <span class="home-title">Nothing 募資</span>
          <div class="line"/>
          <span class="sub-title">Just Nothing</span>
        </div>
        <span class="title">{{getTypeString()}}</span>
        <div v-if="getType() == 'login'" class="login-register">
          <span class="normal">尚未成為會員？</span>
          <router-link to="/register">
            <span class="normal primary-color underline">註冊</span>
          </router-link>
          <span class="normal">。</span>
        </div>
        <div v-else class="login-register">
          <span class="normal">已經擁有帳號？</span>
          <router-link to="/login">
            <span class="normal primary-color underline">登入</span>
          </router-link>
          <span class="normal">。</span>
        </div>
        <md-outlined-text-field class="top-margin" v-for="input in getInputConfig()" :key="input.label"
                                :label="input.label" :value="input.value"
                                :error="input.error != ''" :error-text="input.error">
          <md-icon slot="leading-icon">{{input.icon}}</md-icon>
        </md-outlined-text-field>
        <div v-if="getType() == 'login'" class="preference">
          <div class="remember">
            <md-checkbox touch-target="wrapper"/>
            <span class="normal">記住我</span>
          </div>
          <router-link to="/forget-password">
            <span class="normal primary-color underline">忘記密碼</span>
          </router-link>
        </div>
        <div v-else style="height: 4px"/>
        <md-filled-button class="button">{{getTypeString()}}</md-filled-button>
        <div class="top-margin" style="text-align: center">
          <span class="normal">繼續進行代表你同意</span>
          <router-link to="/policy">
            <span class="normal primary-color underline">服務條款</span>
          </router-link>
          <span class="normal">。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'BottomNavigation',
  components: {},
  setup() {
    const loginInputConfigRef = ref([{
      label: '電子信箱',
      icon: 'email',
      value: '',
      error: ''
    }, {
      label: '密碼',
      icon: 'lock_person',
      value: '',
      error: ''
    }])

    const registerInputConfigRef = ref([{
      label: '電子信箱',
      icon: 'email',
      value: '',
      error: ''
    },{
      label: '電話',
      icon: 'phone',
      value: '',
      error: ''
    }, {
      label: '密碼',
      icon: 'lock_person',
      value: '',
      error: ''
    }, {
      label: '確認密碼',
      icon: 'lock_person',
      value: '',
      error: ''
    }])

    const route = useRoute();
    const type = computed(() => {
      return route.meta.type;
    });

    function getInputConfig() {
      return type.value == "login"? loginInputConfigRef.value : registerInputConfigRef.value
    }

    function getType() {
      return type.value
    }

    function getTypeString() {
      return (type.value == "login")? "登入" : "註冊"
    }

    return {getInputConfig, getType, getTypeString}
  }
})

</script>

<style lang="stylus" scoped>
  .login
    display flex
    align-items center
    height 100vh
    background-color var(--md-sys-color-surface)
    .img-container
      flex 1
      height 100vh
      position relative
      background-image url(../assets/images/login.jpg)
      background-size cover
      background-position center
    .login-layout
      height 100vh
      width 20%
      min-width 450px
      align-items center
      display flex
      .login-container
        border-radius 24px
        background-color var(--md-sys-color-on-primary)
        width 100%
        padding 24px
        display flex
        flex-direction column
        margin 24px
        text-align start
        .preference
          margin-top 12px
          display flex
          justify-content space-between
          align-items center
          .remember
            display flex
            align-items center
        .top-margin
          margin-top 16px
        .login-register
          margin-top 8px
        .button
          margin-top 12px
        .primary-color
          color var(--md-sys-color-primary)
        .normal
          font-size var(--md-sys-fontsize-title-medium)
        .underline
          text-decoration underline
          text-decoration-color  var(--md-sys-fontsize-title-medium)
        .title
          font-size var(--md-sys-fontsize-headline-large)
          margin-top 80px
          font-weight 550
        .align
          height fit-content
          display flex
          align-items center
          font-weight 550
          .icon
            margin-right 16px
          .home-title
            font-size var(--md-sys-fontsize-headline-small)
          .line
            margin-inline 16px
            height 24px
            width 1px
            background-color var(--md-sys-color-netural-10)
          .sub-title
            font-size var(--md-sys-fontsize-title-medium)

  @media (max-width: 800px)
    .login
      .img-container
        display none
      .login-layout
        margin-inline auto
        max-width 450px
        min-width 0
        width 100%

  @media (max-width: 380px)
    .login
      .img-container
        display none
      .login-layout
        margin-inline auto
        max-width 450px
        min-width 0
        width 100%
        .align
          .sub-title
            width 56px

  @media (max-width: 350px)
    .login
      .img-container
        display none
      .login-layout
        margin-inline auto
        max-width 450px
        min-width 0
        width 100%
        .align
          .sub-title
            display none
          .line
            display none

</style>
