<template>
  <div class="not-found">
    <div class="container" style="margin-top: 24px">
      <h1>Oops! {{title}}!</h1>
    </div>
    <div class="container" style="margin-top: 16px">
      <h2 style="margin-top: 24px; margin-bottom: 8px">我們十分抱歉把你帶到這個地方</h2>
      <h2 style="margin: 0">你認為是哪位工程師在偷懶？</h2>
      <div class="profile-layout">
        <button @click="selectedRef=index" :class="selectedRef == index? 'selected':''" class="profile" v-for="(profile, index) in getProfiles()" :key="profile.id">
          <img class="image" :src="profile.img" alt="profile">
          <span class="name">{{profile.name}}</span>
        </button>
      </div>
      <div v-if="selectedRef != null" class="select-container">
        <div class="description">
          <h3 style="margin-block: 0">你選擇了 {{getProfiles()[selectedRef].name}} 工程師，</h3>
          <h3 style="margin-block: 0">按下返回首頁即送出此問答</h3>
        </div>
        <div class="cancel-layout">
          <h3 style="margin-block: 8px">還是覺得太殘忍了</h3>
          <button class="button" @click="selectedRef=null">
            <span class="text">取消選擇</span>
          </button>
        </div>
      </div>
      <md-filled-button class="home-btn" @click="$router.push(`/`)">返回首頁</md-filled-button>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'NotFound',
  components: {},
  props: {
    title: {
      type: String,
      default: '找不到此頁面'
    }
  },
  setup() {
    const profilesRef = ref([{
      id: "0001",
      name: '工程師A',
      img: require('../assets/images/meme_man.jpg')
    }, {
      id: "0002",
      name: '工程師B',
      img: require('../assets/images/meme_man.jpg')
    }, {
      id: "0003",
      name: '工程師C',
      img: require('../assets/images/meme_man.jpg')
    }, {
      id: "0004",
      name: '工程師D',
      img: require('../assets/images/meme_man.jpg')
    }])

    const selectedRef = ref<number | null>(null)

    function getProfiles() {
      return profilesRef.value
    }

    return {getProfiles, selectedRef}
  }
})

</script>

<style lang="stylus" scoped>
.not-found
  margin-inline auto
  max-width 1392px
  display flex
  flex-direction column
  text-align start
  margin-bottom 24px
  .container
    display flex
    flex-direction column
    padding-inline 24px
    margin-inline 24px
    border-radius 24px
    background-color var(--md-sys-color-secondary-fixed)
    .home-btn
      margin-block 16px 32px
      width 150px
    .select-container
      display flex
      flex-direction column
      .description
        display: flex;
      .cancel-layout
        display flex
        align-items center
        .button
          border none
          color var(--md-sys-color-error)
          text-decoration underline
          background-color transparent
          font-size 20px
          font-weight 550
    .profile-layout
      display grid
      grid-template-columns repeat(auto-fill, minmax(150px, 1fr))
      margin-block 24px
      gap 24px
      .profile
        padding-block 24px
        aspect-ratio 1
        display flex
        flex-direction column
        justify-content center
        border none
        background-color var(--md-sys-color-on-secondary)
        border-radius 16px 24px
        //hover
        &:hover
          // scale
          transform scale(1.05)
          transition transform 0.3s
          background-color var(--md-sys-color-surface-container-low)
        .name
          font-size var(--md-sys-fontsize-headline-small)
          color var(--md-sys-color-primary)
          font-weight 550
          margin-top 8px
          margin-inline auto
        .image
          margin-inline auto
          border-radius 1000px
          width 100px
          height 100px
          object-fit cover
          border var(--md-sys-color-primary) 4px solid
      .selected
        background-color var(--md-sys-color-error-container)
        border var(--md-sys-color-error)  2px solid
        .image
          border-color var(--md-sys-color-error)
        .name
          color var(--md-sys-color-error)

@media (max-width: 541px)
  .not-found
    .container
      .select-container
        .description
          flex-direction column

@media (max-width:436px)
  .not-found
    .container
      h1
        font-size 26px
      h2
        font-size 18px
      h3
        font-size 18px
      .profile-layout
        .profile
          aspect-ratio auto
      .select-container
        .description
          flex-direction column
        .cancel-layout
          .button
            font-size 18px

</style>
