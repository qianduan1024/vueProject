//引入mutation的type
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-type.js'
//引入api目录中的index.js 使用里面的方法
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue';
const state = {

  //mock相关的数据
  goods: [],
  ratings: [],
  info: {},
  cartFood: []
}
const mutations = {
  //mock
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  [ADD_FOOD_COUNT](state, { food }) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartFood.push(food)
    } else {
      food.count++
    }
  },
  [REDUCE_FOOD_COUNT](state, { food }) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        state.cartFood.splice(state.cartFood.indexOf(food), 1)
      }
    }
  }
}
const actions = {
  //mock
  async getGoods({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  async getRatings({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },
  async getInfo({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  updateFood({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, { food })
    } else {
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
}
const getters = {
  totalCount(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count, 0)
  },
  totalPrice(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}