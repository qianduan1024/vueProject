<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqUser} from './api';
import {RECEIVE_USER} from './store/mutation-type.js';
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted() {
    //发送请求获取用户信息----生成了session---sid-------cookie---客户端

    const result= await reqUser()
    if(result.code===0){
      const user=result.data
      this.$store.commit(RECEIVE_USER,user)
    }
  },
}
</script>

<style scoped>

</style>
