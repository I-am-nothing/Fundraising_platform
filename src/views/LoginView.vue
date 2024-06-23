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
        <md-outlined-text-field class="top-margin" v-for="(input, index) in getInputConfig()" :key="input.label"
                                @input="(event: Event) => updateTextFieldValue(index, event)"
                                :type="input.type"
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
        <md-filled-button @click="summit()" class="button">{{getTypeString()}}</md-filled-button>
        <div class="top-margin" style="text-align: center">
          <span class="normal">繼續進行代表你同意</span>
          <router-link to="/policy">
            <span class="normal primary-color underline">服務條款</span>
          </router-link>
          <span class="normal">。</span>
        </div>
        <div v-if="errorMsgRef != ''" class="top-margin" style="text-align: center">
          <span class="normal" style="color: var(--md-sys-color-error)">{{errorMsgRef}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";
import {useRoute} from "vue-router";
import {AuthService} from "@/service/auth/AuthService";
import {AuthUser} from "@/service/auth/data/Type";
import router from "@/router";

export default defineComponent({
  name: 'BottomNavigation',
  components: {},
  setup() {
    const authService = AuthService.create("http://localhost:8080")

    const errorMsgRef = ref("")

    const loginInputConfigRef = ref([{
      label: '電子信箱',
      icon: 'email',
      type: 'email',
      value: '',
      error: ''
    }, {
      label: '密碼',
      icon: 'lock_person',
      type: 'password',
      value: '',
      error: ''
    }])

    const registerInputConfigRef = ref([{
      label: '電子信箱',
      icon: 'email',
      type: 'email',
      value: '',
      error: ''
    }, {
      label: '姓名',
      type: 'text',
      icon: 'person',
      value: '',
      error: ''
    }, {
      type: 'text',
      label: '電話',
      icon: 'phone',
      value: '',
      error: ''
    }, {
      type: 'password',
      label: '密碼',
      icon: 'lock_person',
      value: '',
      error: ''
    }, {
      type: 'password',
      label: '確認密碼',
      icon: 'lock_person',
      value: '',
      error: ''
    }])

    const route = useRoute();
    const type = computed(() => {
      return route.meta.type;
    });

    authService.checkLogin().then((user: AuthUser) => {
      router.push("/")
    }).catch((reason) => {
      console.log(reason)
    })

    function getInputConfig() {
      return type.value == "login"? loginInputConfigRef.value : registerInputConfigRef.value
    }

    function getType() {
      return type.value
    }

    function getTypeString() {
      return (type.value == "login")? "登入" : "註冊"
    }

    function updateTextFieldValue(index: number, event: Event) {
      if (type.value == "login") {
        loginInputConfigRef.value[index].value = (event.target as HTMLInputElement).value
      } else {
        registerInputConfigRef.value[index].value = (event.target as HTMLInputElement).value
      }
    }

    function summit() {
      let inputValid = true
      errorMsgRef.value = ""
      if (type.value == "login") {
        const email = loginInputConfigRef.value[0].value
        const password = loginInputConfigRef.value[1].value

        // check email is valid or not
        if (email == "") {
          loginInputConfigRef.value[0].error = "請輸入電子信箱"
          inputValid = false
        } else {
          loginInputConfigRef.value[0].error = ""
        }

        // check password is valid or not
        if (password == "") {
          loginInputConfigRef.value[1].error = "請輸入密碼"
          inputValid = false
        } else {
          loginInputConfigRef.value[1].error = ""
        }

        if (!inputValid) {
          return
        }

        authService.login(email, password).then((authUser: AuthUser) => {
          console.log(authUser)
          router.push("/")
        }).catch((reason) => {
          console.log(reason)
          if (reason == undefined) {
            errorMsgRef.value = "伺服器錯誤"
          }
          else {
            errorMsgRef.value = reason
          }
          router.push("/")
        })
      } else {
        const email = registerInputConfigRef.value[0].value
        const name = registerInputConfigRef.value[1].value
        const phone = registerInputConfigRef.value[2].value
        const password = registerInputConfigRef.value[3].value
        const confirmPassword = registerInputConfigRef.value[4].value


        // check email is valid or not
        if (email == "") {
          registerInputConfigRef.value[0].error = "請輸入電子信箱"
          inputValid = false
        } else {
          registerInputConfigRef.value[0].error = ""
        }
        if (!email.includes("@")) {
          registerInputConfigRef.value[0].error = "電子信箱格式錯誤"
          inputValid = false
        } else {
          registerInputConfigRef.value[0].error = ""
        }

        // check name is valid or not
        if (name == "") {
          registerInputConfigRef.value[1].error = "請輸入姓名"
          inputValid = false
        } else {
          registerInputConfigRef.value[1].error = ""
        }

        // check phone is valid or not
        if (phone == "") {
          registerInputConfigRef.value[2].error = "請輸入電話"
          inputValid = false
        } else {
          registerInputConfigRef.value[2].error = ""
        }
        if (phone.length != 10) {
          registerInputConfigRef.value[2].error = "電話格式錯誤"
          inputValid = false
        } else {
          registerInputConfigRef.value[2].error = ""
        }

        // check password is valid or not
        if (password == "") {
          registerInputConfigRef.value[3].error = "請輸入密碼"
          inputValid = false
        } else {
          registerInputConfigRef.value[3].error = ""
        }
        if (password.length < 6) {
          registerInputConfigRef.value[3].error = "密碼長度需大於6"
          inputValid = false
        } else {
          registerInputConfigRef.value[3].error = ""
        }

        // check confirmPassword is valid or not
        if (confirmPassword == "") {
          registerInputConfigRef.value[4].error = "請輸入確認密碼"
          inputValid = false
        } else if (confirmPassword != password) {
          registerInputConfigRef.value[4].error = "密碼不一致"
          inputValid = false
        } else {
          registerInputConfigRef.value[4].error = ""
        }

        if (!inputValid) {
          return
        }

        authService.register(email, name, phone, password, confirmPassword).then((authUser: AuthUser) => {
          console.log(authUser)
          router.push("/")
        }).catch((reason) => {
          console.log(reason)
          if (reason == undefined) {
            errorMsgRef.value = "伺服器錯誤"
          }
          else {
            errorMsgRef.value = reason
          }
        })
      }
    }

    return {getInputConfig, getType, getTypeString, summit, errorMsgRef, updateTextFieldValue}
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
