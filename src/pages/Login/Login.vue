<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required'"
              />
              <span
                v-show="errors.has('phone')"
                class="text-style"
                v-cloak
              >{{ errors.first('phone') }}</span>
              <button
                :disabled="!isRightPhone || computeTime>0"
                class="get_verification"
                :class="{right_number_phone:isRightPhone}"
                @click.prevent="sendCode"
              >{{computeTime>0?`已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required'"
              />
              <span
                v-show="errors.has('code')"
                class="text-style"
                v-cloak
              >{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span
                  v-show="errors.has('name')"
                  class="text-style"
                  v-cloak
                >{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <!-- <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />-->
                <input
                  :type="isShowPwd? 'text' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="{required: true}"
                />

                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
                <span
                  v-show="errors.has('pwd')"
                  class="text-style"
                  v-cloak
                >{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="sendCaptcha">
                <!-- <img class="get_verification" src="./images/captcha.svg" alt="captcha" /> -->
                <span
                  v-show="errors.has('captcha')"
                  class="text-style"
                  v-cloak
                >{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api/index.js";
import { RECEIVE_USER } from "../../store/mutation-type.js";
export default {
  data() {
    return {
      loginWay: true,
      phone: "",
      computeTime: 0,
      isShowPwd: false,
      code: "",
      name: "",
      pwd: "",
      captcha: ""
    };
  },
  computed: {
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    //18101085318
    async sendCode() {
      this.computeTime = 10;
      const timeId = setInterval(() => {
        this.computeTime--;
        if (this.computeTime < 0) {
          this.computeTime = 0;
          clearInterval(timeId);
        }
      }, 1000);
      const result = await reqSendCode(this.phone);
      if (result.code === 0) {
        alert("发送成功");
      } else {
        this.computeTime = 0;
        clearInterval(timeId);
        alert(result.msg);
      }
    },
    sendCaptcha() {
      this.$refs.captcha.src = 'http://localhost:5000/captcha?time' + Date.now()
    },
    async login() {
      const { loginWay, phone, code, pwd, name, captcha } = this;
      let names;
      if (loginWay) {
        names = ["phone", "code"];
      } else {
        names = ["name", "pwd", "captcha"];
      }
      const success = await this.$validator.validateAll(names);
      if (success) {
        let result;
        if (loginWay) {
          result = await reqSmsLogin(phone, code);
        } else {
          result = await reqPwdLogin({ name, pwd, captcha });
          if (result.code !== 0) {
            this.sendCaptcha();
            this.captcha = "";
          }
        }
        if (result.code === 0) {
          const user = result.data;
          this.$store.commit(RECEIVE_USER, user);
          this.$router.replace("/profile");
        } else {
          // 失败了
          alert(result.msg);
        }
      }
    }
  },
  // /*
  //   在进行当前组件前调用
  //   在回调函数调用时, 组件对象还没有创建, this不是组件对象
  //    */
  //   beforeRouteEnter (to, from, next) {
  //     // next(callback): 回调函数在组件对象创建后调用callback
  //     next((comp) => {
  //       // 如果当前用户已经登陆, 自动跳转到个人中心
  //       if (comp.$store.state.user.user._id) {
  //          next('/profile')
  //       } else {
  //         // 否则放行
  //         next()
  //       }
  //     })
  //   }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.loginContainer
  width: 100%
  height: 100%
  background: #fff
  .loginInner
    padding-top: 60px
    width: 80%
    margin: 0 auto
    .login_header
      .login_logo
        font-size: 40px
        font-weight: bold
        color: #02a774
        text-align: center
      .login_header_title
        padding-top: 40px
        text-align: center
        >a
          color: #333
          font-size: 14px
          padding-bottom: 4px
          &:first-child
            margin-right: 40px
          &.on
            color: #02a774
            font-weight: 700
            border-bottom: 2px solid #02a774
    .login_content
      >form
        >div
          display: none
          &.on
            display: block
          input
            width: 100%
            height: 100%
            padding-left: 10px
            box-sizing: border-box
            border: 1px solid #ddd
            border-radius: 4px
            outline: 0
            font: 400 14px Arial
            &:focus
              border: 1px solid #02a774
          .login_message
            position: relative
            margin-top: 16px
            height: 48px
            font-size: 14px
            background: #fff
            .get_verification
              position: absolute
              top: 50%
              right: 10px
              transform: translateY(-50%)
              border: 0
              color: #ccc
              font-size: 14px
              background: transparent
              &.right_number_phone
                color: black
          .login_verification
            position: relative
            margin-top: 16px
            height: 48px
            font-size: 14px
            background: #fff
            .switch_button
              font-size: 12px
              border: 1px solid #ddd
              border-radius: 8px
              transition: background-color 0.3s, border-color 0.3s
              padding: 0 6px
              width: 30px
              height: 16px
              line-height: 16px
              color: #fff
              position: absolute
              top: 50%
              right: 10px
              transform: translateY(-50%)
              &.off
                background: #fff
                .switch_text
                  float: right
                  color: #ddd
              &.on
                background: #02a774
              >.switch_circle
                // transform translateX(27px)
                position: absolute
                top: -1px
                left: -1px
                width: 16px
                height: 16px
                border: 1px solid #ddd
                border-radius: 50
                background: #fff
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition: transform 0.3s
                &.right
                  transform: translateX(27px)
          .login_hint
            margin-top: 12px
            color: #999
            font-size: 14px
            line-height: 20px
            >a
              color: #02a774
        .login_submit
          display: block
          width: 100%
          height: 42px
          margin-top: 30px
          border-radius: 4px
          background: #4cd96f
          color: #fff
          text-align: center
          font-size: 16px
          line-height: 42px
          border: 0
      .about_us
        display: block
        font-size: 12px
        margin-top: 20px
        text-align: center
        color: #999
    .go_back
      position: absolute
      top: 5px
      left: 5px
      width: 30px
      height: 30px
      >.iconfont
        font-size: 20px
        color: #999
</style>