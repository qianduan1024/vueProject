<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span
          class="header_login_text"
        >{{user._id? (user.name?(user.name):(user.phone?(user.phone):('登录|注册'))) :('登录|注册')}}</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category,index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>
<script>
import ShopList from "../../components/ShopList/ShopList";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ShopList
  },
  async mounted() {
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getShops");
    this.$store.dispatch("getCategorys", () => {
      this.$nextTick(() => {
        var mySwiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    });
    // await this.$store.dispatch("getCategorys");
    // this.$nextTick(() => {
    //     var mySwiper = new Swiper(".swiper-container", {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: ".swiper-pagination"
    //       }
    //     });
    // });
    // var mySwiper = new Swiper(".swiper-container", {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   }
    // });
  },
  computed: {
    //...mapState(["address", "categorys","user"]),
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys,
      user: state => state.user.user,
    }),
    categorysArr() {
      const { categorys } = this;
      const bigArr = [];
      let smallArr = [];
      categorys.forEach(category => {
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(category);
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      return bigArr;
    }
  }
  //在vue中数据如果发生变化，立即同步调用监视中的回调函数，异步更新界面
  //   watch: {
  //     categorys() {
  //       this.nextTick(() => {
  //         var mySwiper = new Swiper(".swiper-container", {
  //           loop: true, // 循环模式选项
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination"
  //           }
  //         });
  //       });
  //     }
  //   }
};
</script>
<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width: 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top: 45px
    height: 200px
    background: #fff
    .swiper-container
      width: 100%
      height: 100%
      .swiper-wrapper
        width: 100%
        height: 100%
        .swiper-slide
          display: flex
          justify-content: center
          align-items: flex-start
          flex-wrap: wrap
          .link_to_food
            width: 25%
            .food_container
              display: block
              width: 100%
              text-align: center
              padding-bottom: 10px
              font-size: 0
              img
                display: inline-block
                width: 50px
                height: 50px
            span
              display: block
              width: 100%
              text-align: center
              font-size: 13px
              color: #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background: #02a774
</style>