import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
import msite from './modules/msite.js';
import shop from './modules/shop.js';
import user from './modules/user.js';
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  mutations,
  actions,
  modules:{
    msite,
    shop,
    user
  }
})