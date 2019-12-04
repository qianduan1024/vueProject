
import Vue from 'vue';
import VeeValidate,{ Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);

Validator.localize('zh_CN', {
  messages:zh_CN.messages,
  attributes: {
    phoe: '手机号',
    code: '验证码',
    name: '用户名',
    pwd:'密码',
    captcha:'图形验证码'
  }
 
});
