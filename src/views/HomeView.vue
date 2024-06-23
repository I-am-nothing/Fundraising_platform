<template>
  <div class="home">
    <div class="main-container" ref="uiMainContainerRef">
      <div class="card" v-for="card in getMainCards()" :key="card.id">
        <img class="image" :src="card.image" alt="logo"/>
        <div class="title-container">
          <span class="title">{{card.title}}</span>
          <div class="info">
            <span class="count">{{card.supporters}} 人支持</span>
            <span class="money">NT$ {{card.amount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-pos">
      <button class="button" v-for="(card, index) in getMainCards()" :key="card.id" @click="showMainCard(index)">
          <div class="dot" :class="index == currentMainCardIndex? 'dot-selected':'dot-normal'"/>
      </button>
    </div>
    <div class="category-container">
      <div class="title">
        <div class="line"/>
        <span class="text">熱門標籤</span>
        <div class="line"/>
      </div>
      <div class="category">
        <router-link :to="`/explore?tag=${category.id}`" class="category-item" v-for="category in getCategories()" :key="category.id">
          <md-outlined-button>{{category.title}}</md-outlined-button>
        </router-link>
      </div>
      <div class="line" style="flex: none; margin-top: 8px"/>
    </div>
    <div class="explore-container">
      <span class="title">群眾募資</span>
      <router-link to="/explore">
        <md-filled-button class="button">
          <div class="align">
            <md-icon class="icon">navigate_next</md-icon>
            <span class="sub-nav">更多</span>
          </div>
        </md-filled-button>
      </router-link>
    </div>
    <div class="product-container">
      <router-link :to="`/product/${product.id}`" class="product" v-for="product in getPageProducts()" :key="product.id">
        <img class="image" :src="product.image" alt="project-img"/>
        <span class="title">{{product.title}}</span>
        <div class="progress-layout">
          <md-linear-progress class="progress" :value="product.progress/100"></md-linear-progress>
          <span class="text">{{product.progress}}%</span>
        </div>
        <div class="info">
          <span class="money">NT$ {{product.amount}}</span>
          <div class="right">
            <md-icon class="icon">person_3</md-icon>
            <span class="count">{{product.supporters}} 人</span>
            <md-icon class="icon">timer</md-icon>
            <span class="count">{{product.remainDays}} 天</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="page-container">
      <div v-for="index in pageSelectionRef" :key="index">
        <md-filled-tonal-icon-button v-if="index == currentPageIndex">{{index}}</md-filled-tonal-icon-button>
        <span v-else-if="index == null" class="text">...</span>
        <md-icon-button v-else>{{index}}</md-icon-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import ColorIcon from "@/components/ColorIcon.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const mainCardsRef = ref([{
      id: "0001",
      image: require('../assets/images/home_01.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習',
      supporters: "8,787",
      amount: "878,787",
    }, {
      id: "0002",
      image: require('../assets/images/home_02.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習 fasfasdfdasfdas',
      supporters: "8,787",
      amount: "878,787",
    },{
      id: "0003",
      image: require('../assets/images/home_01.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習 fafdasfasdfsdaf ',
      supporters: 8787,
      amount: 878787,
    }]);

    const categoriesRef = ref([{
      id: "design",
      title: '設計',
    }, {
      id: "music",
      title: '音樂',
    },{
      id: "nice-store",
      title: '挺好店',
    }]);

    const productsRef = ref([{
      id: "0001",
      image: require('../assets/images/home_01.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習',
      progress: 87,
      amount: "878,787",
      supporters: "8,787",
      remainDays: 30,
    }, {
      id: "0002",
      image: require('../assets/images/home_02.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習 fasfasdfdasfdas',
      progress: 50,
      amount: "878,787",
      supporters: "8,787",
      remainDays: 30,
    },{
      id: "0003",
      image: require('../assets/images/home_01.jpg'),
      title: 'Nothing 專案募資即將調漲【Vue3 + Typescript 教學募資】，輕松學習 fafdasfasdfsdaf ',
      progress: 25,
      amount: "878,787",
      supporters: "8,787",
      remainDays: 30,
    }]);

    const pageSelectionRef = ref([1, 2, 3, null, 10])
    const currentPageIndex = ref(1)

    const uiMainContainerRef = ref<HTMLDivElement | null>(null)

    const currentMainCardIndex = ref(0)

    function getMainCards() {
      return mainCardsRef.value
    }
    function getCategories() {
      return categoriesRef.value
    }

    function getPageProducts(page: number) {
      return productsRef.value
    }

    function showMainCard(index: number) {
      currentMainCardIndex.value = index
      if (uiMainContainerRef.value) {
        const container = uiMainContainerRef.value
        container.scrollTo({
          left: container?.clientWidth * index + 24 * index,
          behavior: 'smooth'
        })
      }
    }

    return {
      getMainCards, getCategories, getPageProducts, showMainCard,
      uiMainContainerRef, currentMainCardIndex, pageSelectionRef, currentPageIndex
    }
  }
})

</script>

<style lang="stylus" scoped>
  .home
    max-width 1392px
    width calc(100% - 48px)
    display flex
    flex-direction column
    padding 24px
    margin-inline auto
    overflow-y auto

    .page-container
      display flex
      justify-content center
      margin-block 24px;
      align-items center
      .text
        font-size var(--md-sys-fontsize-title-medium)
        margin-inline 8px
        font-weight bold

    .product-container
      display grid
      grid-template-columns repeat(auto-fill, minmax(286px, 1fr))
      gap 24px
      .product
        text-decoration none
        display flex
        flex-direction column
        border-radius 24px
        text-align start
        background-color var(--md-sys-color-secondary-fixed)
        color var(--md-sys-color-on-secondary-container)
        .image
          object-fit cover
          border-radius 24px 24px 0 0
          width 100%
          height 200px
          background-size cover
          background-position center
        .title
          font-size var(--md-sys-fontsize-title-large)
          height 60px
          padding 8px 16px
          margin-top 6px
          display -webkit-box
          -webkit-line-clamp 3
          -webkit-box-orient vertical
          overflow hidden
          text-overflow ellipsis
        .info
          display flex
          justify-content space-between
          margin 8px 16px 16px 16px
          align-items center
          .money
            font-size var(--md-sys-fontsize-title-medium)
          .right
            display flex
            align-items center
            .icon
              margin-right 4px
              --md-icon-size 16px
            .count
              font-size var(--md-sys-fontsize-title-medium)
        .progress-layout
          margin-top 8px
          display flex
          justify-content space-between
          align-items center
          padding-inline 16px
          .progress
            width calc(100% - 48px)
            --md-sys-color-primary var(--md-sys-color-secondary)
            --md-sys-color-surface-container-highest var(--md-sys-color-on-secondary)
            --md-linear-progress-track-shape: 8px
          .text
            font-size var(--md-sys-fontsize-title-medium)




    .explore-container
      margin-block 48px 32px
      box-sizing border-box
      display flex
      justify-content space-between
      .title
        font-size var(--md-sys-fontsize-headline-small)
        font-weight 550
        color var(--md-sys-color-netural-10)
      .icon
        margin-right 4px
        --md-icon-size 16px
      .sub-nav
        font-size var(--md-sys-fontsize-label-large)
      .button
        .align
          display flex
          align-items center

    .category-container
      display flex
      flex-direction column
      margin-top 24px
      .line
        flex 1
        height 1px
        background-color var(--md-sys-color-netural-70)
      .title
        display flex
        align-items center
        justify-content center
        .text
          margin-inline  8px
          font-size var(--md-sys-fontsize-body-medium)
          font-weight 550
          color var(--md-sys-color-netural-50)
      .category
        display flex
        justify-content center
        flex-wrap wrap
        margin-top 10px
        .category-item
          margin-inline 6px
          margin-block 0 8px

    .main-pos
      display flex
      justify-content center
      margin-top 4px
      .button
        background none
        border none
        padding 8px 4px
        .dot
          width 8px
          height 8px
          border-radius 8px
        .dot-normal
          background-color var(--md-sys-color-netural-50)
        .dot-selected
          width 16px
          background-color var(--md-sys-color-primary)

    .main-container
      display flex
      flex-direction row
      overflow hidden
      .card
        flex 1 0 100%
        margin-right 24px
        transition transform 0.5s ease
        display flex
        flex-direction column
        .image
          width 100%
          height 35vh
          border-radius 32px 32px 0 0
          box-shadow 0 1px 8px 0 rgba(0, 0, 0, .25)
          object-fit cover
        .title-container
          display grid
          grid-template-columns: 1fr auto;
          flex-direction row
          padding 24px
          align-items center
          background-color var(--md-sys-color-tertiary)
          border-radius 0 0 24px 24px
          color var(--md-sys-color-on-tertiary)

          .title
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            font-size var(--md-sys-fontsize-headline-medium)
            font-weight 500
            text-align left
          .info
            display flex
            align-items center
            .count, .money
              font-size var(--md-sys-fontsize-title-large)
              margin-left 16px
            .money
              font-weight 500

@media (max-width: 700px)
  .home
    .main-container
      .card
        .title-container
          .info
            display none

  @media (max-width: 500px)
    .home
      .main-container
        .card
          .title-container
            padding 16px
            .title
              display -webkit-box
              -webkit-line-clamp 2
              -webkit-box-orient vertical
              white-space normal
              font-size var(--md-sys-fontsize-title-large)
              line-height 1.5
            .info
              display none
</style>
