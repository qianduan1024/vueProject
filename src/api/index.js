import ajax from './ajax.js';
const BASE='/api'
//根据经纬度获取地址信息
export const reqAddress= (longitude,latitude) => ajax(BASE + `/position/${latitude},${longitude}`)
//获取食品分类列表
export const reqCategorys= () => ajax(BASE + `/index_category`)
//根据经纬度获取商铺列表
export const reqShops= (longitude,latitude) => ajax(BASE + `/shops`,{latitude,longitude})
//发送短信验证码
export const reqSendCode=(phone) =>ajax(BASE + `/sendcode`,{phone})
//手机号验证码登录 post
export const reqSmsLogin=(phone,code) =>ajax(BASE + `/login_sms`,{phone,code},'POST')
//用户名密码登录 post
export const reqPwdLogin=({name,pwd,captcha}) =>ajax(BASE + `/login_pwd`,{name,pwd,captcha},'POST')
//根据会话获取用户信息----------持久登录----cookie-----session
export const reqUser=() =>ajax(BASE + `/userinfo`)
//用户登出-----退出
export const reqLoginOut=() =>ajax(BASE + `/logout`)

//mock数据相关的请求
export const reqGoods=()=>ajax('/goods')
export const reqRatings=()=>ajax('/ratings')
export const reqInfo=()=>ajax('/info')
