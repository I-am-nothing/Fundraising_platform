<template>
  <not-found v-if="isNotFound()" title="找不到此產品"/>
  <div v-else class="product">
    <div class="info-container">
      <div class="yt-viewer">
        <LiteYouTubeEmbed
            id="dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        />
      </div>
      <div class="info">
        <product-goal :goal="'100,000'" :current="'50,000'" :remain="50000" :founders="100"/>
        <span class="description">由 Nothing 所創建的快速上手課程，內容包含<br>> Vue 3<br>> HTML<br>> CSS<br>> Typescript<br>> API 串接<br>> 建立圖表<br>> CI / CD 自動部屬</span>
        <div class="line"/>
        <span style="font-size: var(--md-sys-fontsize-title-medium)">募資期間 2024/06/17 12:00 - 2024/06/24 23:59</span>
        <div class="contact-layout">
          <router-link to="/company/0001/contact">
            <md-outlined-button class="button">
              <div class="align">
                <md-icon class="icon">chat_bubble</md-icon>
                <span class="sub-nav">傳送訊息</span>
              </div>
            </md-outlined-button>
          </router-link>
          <div v-for="link in linksRef" :key="link.name">
            <md-outlined-icon-button style="margin-left: 8px" v-if="link.md_icon" @click="navClick(link.url)">
              <md-icon>{{link.md_icon}}</md-icon>
            </md-outlined-icon-button>
            <md-icon-button v-else :aria-label="link.name" @click="navClick(link.url)">
              <color-icon :src="link.svg"/>
            </md-icon-button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-nav">
      <md-tabs class="tabs" :active-tab-index="1" auto-activate>
        <div v-for="nav in productNavRef" :key="nav.name">
          <router-link v-if="nav.route" :to="nav.route">
            <md-primary-tab :selected="nav.selected" >{{nav.name}}</md-primary-tab>
          </router-link>
          <md-primary-tab v-else :selected="nav.selected" >{{nav.name}}</md-primary-tab>
        </div>
      </md-tabs>
      <div class="support-layout">
        <md-outlined-icon-button>
          <md-icon>bookmark_border</md-icon>
        </md-outlined-icon-button>
        <md-filled-button style="margin-left: 8px">
          <div class="button">
            <md-icon class="icon">navigate_next</md-icon>
            <span class="text">贊助專案</span>
          </div>
        </md-filled-button>
      </div>
    </div>
    <div class="product-main">
      <div class="left">
        <div class="position">
          <md-icon-button @click="scrollToMainContentTop()">
            <md-icon>description</md-icon>
          </md-icon-button>
          <md-text-button @click="scrollToOtherContentTop(index)" v-for="(item, index) in otherContentRef" :key="index">
            {{item.title}}
          </md-text-button>
        </div>
        <div class="contents-layout" ref="uiMainContentsRef">
          <img class="contents" :src="content" alt="content" v-for="content in contentsRef" :key="content"/>
        </div>
        <div class="other-contents" :ref="el => setUiMainContentsRef(el, index)" v-for="(item, index) in otherContentRef" :key="index">
          <span class="title">{{item.title}}</span>
          <div v-if="item.type == 'label-text'" class="description">
            <span v-for="(line, idx) in item.description" :key="idx">{{line}}<br></span>
          </div>
          <Bar v-else-if="item.type == 'earnings'"
              style="aspect-ratio: 16/9; flex: 1"
              :options="chartOptionsRef"
              :data="chartDataRef">
          </Bar>

        </div>
        <div style="height: 24px"/>
      </div>
      <div class="right">
        <router-link class="plan" :to="`/company/plan/${plan.id}`" v-for="plan in plansRef" :key="plan.id">
          <img class="image" :src="plan.image" alt="plan-img"/>
          <span class="title">{{plan.title}}</span>
          <span class="title" style="margin-top: 8px">NT$ {{plan.price}}</span>
          <div class="remain">
            <div class="remain-text" style="background-color: var(--md-sys-color-tertiary)">
              <span class="remain-text" style="color: var(--md-sys-color-on-tertiary)">剩餘 {{plan.limit - plan.sold}} 份</span>
            </div>

            <div class="remain-text" style="background-color: var(--md-sys-color-secondary); margin-left: 8px">
              <span class="remain-text" style="color: var(--md-sys-color-on-secondary)">已被贊助 {{plan.sold}} / {{plan.limit}} 次</span>
            </div>
          </div>
          <span class="description" v-for="(line, index) in plan.description" :key="index">{{line}}<br></span>
          <div class="line"/>
          <div class="benefit-layout">
            <div class="benefit" v-for="(benefit, index) in plan.benefits" :key="index">
              <md-icon class="icon">check</md-icon>
              <span>{{benefit}}</span>
            </div>
          </div>
          <div class="line"/>
          <span class="deliver-desc">{{plan.deliverDescription}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NotFound from "@/components/NotFound.vue";
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
import ProductGoal from "@/components/ProductGoal.vue";
import ColorIcon from "@/components/ColorIcon.vue";

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'ProductView',
  components: {ColorIcon, ProductGoal, NotFound, LiteYouTubeEmbed, Bar},
  setup() {
    const chartDataRef = ref({
      labels: ['6/1', '6/2', '6/3', '6/4', '6/4', '6/5', '6/6', '6/1', '6/2', '6/3', '6/4', '6/4', '6/5', '6/6', '6/1', '6/2', '6/3', '6/4', '6/4', '6/5', '6/6'],
      datasets: [
        {
          label: '日銷量',
          backgroundColor: [
            'rgb(188 236 231)',
            'rgb(220 231 200)',
            'rgb(205 237 163)',
          ],
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        }
      ]
    })

    const chartOptionsRef = ref({
      responsive: true,
      maintainAspectRatio: false
    })

    const linksRef = ref([{
      svg: "icons/X.svg",
      name: "X",
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
      md_icon: "attach_file",
      name: "Copy Link",
      url: null
    }])

    const productNavRef = ref([{
      name: "專案內容",
      route: null,
      selected: true
    }, {
      name: "常見問答",
      route: "/product/0001/faq",
      selected: false
    }, {
      name: "留言",
      route: "/product/0001/comments",
      selected: false
    }])

    const contentsRef = ref([
      require("../assets/images/content_01.jpg"),
      require("../assets/images/content_02.jpg"),
      require("../assets/images/content_03.jpg"),
      require("../assets/images/login.jpg"),
    ])

    const otherContentRef = ref([{
      title: "目前銷售狀況",
      type: "earnings",
      description: null,
    }, {
      title: "風險與挑戰",
      type: "label-text",
      description: ["募資計畫有眾多變數，團隊會盡力於承諾的時間內生產出貨，但還是可能發生生產意外、配送異常等導致出貨延後。當您贊助此計畫即同意接受各種可能延遲出貨之變因（不一定會發生），產品進度會持續公告於Nothing計畫更新與FB粉絲專頁，若無法接受延遲出貨風險，請在「集資期間」登入帳號，於右上角選單中的『贊助記錄』進入，找到『修改/查看紀錄』，在此處的贊助細節頁面的「取消贊助並退款」按鈕來取消贊助或退款，透過您贊助時的原付款方式退還您所支持的金額（不包含虛擬帳號轉帳交易手續費）。若已結束集資，請直接聯繫客服。"],
    }, {
      title: "登記資訊",
      type: "label-text",
      description: ["登記人：Nothing Chang", "電話：0918-214-333", "聯絡信箱：jdps99119@gamil.com", "建議聯絡時間：週一至週五 10:00-18:00"],
    }])

    const plansRef = ref([{
      id: "0001",
      title: "一個月觀看",
      image: require("../assets/images/content_04.jpg"),
      description: ["> Vue 3", "> HTML", "> CSS", "> Typescript", "> API 串接", "> 建立圖表", "> CI / CD 自動部屬"],
      price: 999,
      sold: 78,
      limit: 87,
      deliverDescription: "預計 2024 年 8 月釋出教學影片",
      benefits: ["信用卡享3期零利率", "信用卡享3期零利率", "信用卡享3期零利率"],
    }, {
      id: "0001",
      title: "一個月觀看",
      image: require("../assets/images/content_04.jpg"),
      description: ["> Vue 3", "> HTML", "> CSS", "> Typescript", "> API 串接", "> 建立圖表", "> CI / CD 自動部屬"],
      price: 999,
      sold: 78,
      limit: 87,
      deliverDescription: "預計 2024 年 8 月釋出教學影片",
      benefits: ["信用卡享3期零利率", "信用卡享3期零利率", "信用卡享3期零利率"],
    }])

    const route = useRoute();
    const productId = computed(() => {
      return route.params.productId;
    });

    const uiMainContentsRef = ref<HTMLDivElement | null>(null)
    const uiOtherContainerRefs = ref<(HTMLElement | null)[]>([]);

    async function scrollToMainContentTop() {
      if (uiMainContentsRef.value == null) return
      await nextTick();
      const top = uiMainContentsRef.value.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }

    function setUiMainContentsRef(el: HTMLElement | null, index: number) {
      uiOtherContainerRefs.value[index] = el;
    }

    async function scrollToOtherContentTop(index: number) {
      if (uiOtherContainerRefs.value[index]) {
        const container = uiOtherContainerRefs.value[index];

        await nextTick();

        if (container == null) return
        const top = container.getBoundingClientRect().top + window.scrollY - 100;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    }

    function isNotFound() {
      return productId.value != "0001"
    }

    function navClick(url: string | null) {
      if (url == null) {
        navigator.clipboard.writeText(window.location.href)
        window.alert("已複製連結")
        return
      }
      window.open(url, '_blank')
    }

    return {isNotFound, linksRef, navClick, productNavRef, contentsRef,
      scrollToMainContentTop, uiMainContentsRef, otherContentRef,
      setUiMainContentsRef, scrollToOtherContentTop, plansRef,
      chartDataRef, chartOptionsRef}
  }
})

</script>

<style lang="stylus" scoped>
.product
  margin-inline auto
  max-width 1392px
  display flex
  flex-direction column
  text-align start
  height fit-content
  .other-contents
    margin-top 24px
    display flex
    flex-direction column
    .title
      font-size var(--md-sys-fontsize-headline-small)
      font-weight 550
    .description
      margin-top 16px
      line-height 1.5
      font-size var(--md-sys-fontsize-title-medium)
      color var(--md-sys-color-netural-10)
  .product-main
    display grid
    grid-template-columns 1fr 350px
    .right
      display flex
      flex-direction column
      row-gap 24px
      padding 24px
      .plan
        text-decoration none
        color inherit
        display flex
        flex-direction column
        background-color var(--md-sys-color-on-primary)
        border-radius 24px
        padding 24px
        &:hover
          scale 1.03
          transition 0.5s
          border 1px solid var(--md-sys-color-primary)
        .benefit-layout
          margin-block 4px
          display flex
          flex-direction row
          flex-wrap wrap
          --md-icon-size 14px
          text-align start
          column-gap 6px
          row-gap 2px
          .benefit
            display flex
            align-items center
            .icon
              margin-right 4px
              background-color var(--md-sys-color-primary)
              color var(--md-sys-color-on-primary)
              border-radius 50px
            span
              font-size var(--md-sys-fontsize-title-small)
        .deliver-desc
          margin-inline auto
          margin-top 12px
          font-size var(--md-sys-fontsize-title-medium)
        .line
          margin-block 4px
          width 100%
          height 1px
          background-color var(--md-sys-color-netural-70)
        .description
          line-height 1.5
          font-size var(--md-sys-fontsize-title-medium)
        .remain
          margin-block 8px
          display flex
          flex-direction row
          .remain-text
            padding 4px
            border-radius 8px
            font-size var(--md-sys-fontsize-title-medium)

        .image
          width 100%
          height 100%
          object-fit cover
          border-radius 24px
          margin-bottom 24px
        .title
          font-size var(--md-sys-fontsize-headline-small)
          font-weight 550

    .left
      margin-left 48px
      .contents-layout
        border-radius 24px
        overflow hidden
        display flex
        flex-direction column
        .contents
          width 100%
          height 100%
      .position
        width calc(100% - 16px)
        overflow-y hidden
        box-shadow 0 2px 4px 0 var(--md-sys-color-netural-70)
        background-color var(--md-sys-color-surface)
        position sticky
        top 56px
        display flex
        border-radius 0 0 24px 24px
        border 1px solid var(--md-sys-color-netural-70)
        padding 2px 8px

  .product-nav
    box-shadow 0 2px 4px 0 var(--md-sys-color-netural-70)
    position: sticky;
    top 8px
    margin-inline 24px
    display flex
    justify-content space-between
    border-radius 48px
    background-color var(--md-sys-color-on-primary)
    align-items center
    .support-layout
      margin-right 4px
      display flex
      align-items center
      .button
        height 20px
        width 150px
        display flex
        justify-content center
        align-items center
    .tabs
      display flex
      container-shape 1000px

      --md-sys-color-surface: var(--md-sys-color-on-primary)
      --md-sys-color-primary: #005353;
      --md-primary-tab-label-text-size: 0.8em;
      --md-primary-tab-container-shape 1000px
  .info-container
    display grid
    grid-template-columns 1fr 350px
    width calc(100% - 120px)
    padding-inline 24px
    align-items center
    .yt-viewer
      border-radius 24px
      overflow hidden
      height fit-content
      .youtube
        display flex
        max-height 25vh
        border-radius 24px
    .info
      background-color var(--md-sys-color-on-secondary)
      padding 24px
      border-radius 24px
      margin-block 24px
      margin-left 24px
      width 350px
      display flex
      flex-direction column
      .line
        margin-block 16px
        width 100%
        height 1px
        background-color var(--md-sys-color-netural-70)
      .description
        margin-top 8px
        line-height 1.5
        font-size var(--md-sys-fontsize-title-medium)
      .contact-layout
        display flex
        margin-top 16px
        .button
          height 32px
          margin-inline 4px 8px
          font-size var(--md-sys-fontsize-title-medium)
          color var(--md-sys-color-primary)
          border none
        .align
          display flex
          flex-direction row
          align-items center
          justify-content center
          .icon
            --md-icon-size 20px
            margin-right 4px
          .sub-nav
            font-size var(--md-sys-fontsize-title-medium)
            color var(--md-sys-color-primary)
      span
        color var(--md-sys-color-netural-10)
        font-size var(--md-sys-fontsize-title-medium)

@media (max-width: 780px)
  .product
    .info-container
      display flex
      flex-direction column
      padding-inline 16px
      width calc(100% - 32px)
      .yt-viewer
        width 100%
      .info
        width calc(100% - 48px)
        margin-inline 16px
    .product-nav
      border-radius 24px 24px 0 0
      .support-layout
        display none
    .product-main
      grid-template-columns 1fr
      .left
        .position
          width calc(100% - 32px)
          margin-inline 8px
        margin-inline 16px

</style>
