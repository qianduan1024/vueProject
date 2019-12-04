//引入mutation的type
import {RESET_USER,RECEIVE_USER} from '../mutation-type.js'
//引入api目录中的index.js 使用里面的方法
import {  reqLoginOut } from '../../api'
const state={
  user:{},
}
const mutations={
  // 更新用户信息
  [RECEIVE_USER](state, user){
    state.user=user
  },
  // 更新清除用户信息
  [RESET_USER](state){
    state.user={}
  },

}
const actions={
  async loginOut({commit}){
    const result=await reqLoginOut()
    if(result.code===0){
      commit(RESET_USER)
    }
  },
}
const getters={}

export default{
  state,
  mutations,
  actions,
  getters
}