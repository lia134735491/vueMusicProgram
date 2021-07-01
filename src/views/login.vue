<template>
  <transition >
    <div v-show="control" class="aa">
      <div class="container">
        <div class="wrapper">
          <div class="left-top-sign">LOGIN</div>
          <div class="welcome">
            欢迎回来！
          </div>
          <div class="input-content">
            <div class="input-item">
              <span class="tit">手机号码</span>
              <input  type="span" placeholder="请输入手机号码" data-test="abc" data-type="phone" id="phone" @input="handleInput"/>
            </div>
            <div class="input-item">
              <span class="tit">密码</span>
              <input type="password"  placeholder="请输入密码" data-test="abc" data-type="password" id="password" @input="handleInput"/>
            </div>
          </div>
          <button class="confirm-btn" @click="login">登录</button>
          <div class="forget-section">
            忘记密码?
          </div>
        </div>
        <div class="register-section">
          还没有账号?
          <span >马上注册</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      
    };
  },

  props:['control'],

  components: {},

  computed: {},

  mounted () {},

  methods: {
    
  }
}

</script>
<style lang='scss' scoped>
    // .ll-enter,.ll-leave-to {
    //   position: absolute;
    //   transform: translate3d(100%,0,0);
    //   background-color: white;
    // }
    // .ll-enter-to,.ll-leave {
    //   position: absolute;
    //   transform: translate3d(0,0,0);
    //   background-color: white;
    // }
    // .ll-enter-active,.ll-leave-active {
    //   transition: all .3s ease
    // }
    .aa {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 90;
      background-color: white;
    }
    .wrapper {
      
      
      padding-bottom: 40px;
      .left-top-sign {
        font-size: 120px;
        color: #f8f8f8;
        position:relative;
        left: -16px;
      }
      .welcome {
        position:relative;
        left: 50px;
        top: -90px;
        font-size: 46px;
        color: #555;
      }
      .input-content {
        padding: 0 60px;
        .input-item {
          display:flex;
          flex-direction: column;
          align-items:flex-start;
          justify-content: center;
          padding: 0 30px;
          background:#f8f6fc;
          height: 120px;
          border-radius: 4px;
          margin-bottom: 50px;
          &:last-child {
            margin-bottom: 0;
          }
          .tit {
            height: 50px;
            line-height: 56px;
            font-size: 30px;
            color: #606266;
          }
          input {
            height: 60px;
            font-size: 30px;
            color: #303133;
            width: 100%;
          }
        }
      }
      .confirm-btn {
        width: 630px!important;
        height: 76px;
        line-height: 76px;
        border-radius: 50px;
        margin-top: 70px;
        background: #d43c33;
        color: #fff;
        font-size: 32px;
        padding: 0;
      }
      .forget-section {
        font-size: 28px;
        color: #4399fc;
        text-align: center;
        margin-top: 40px;
      }
      .register-section {
        position:absolute;
        left: 0;
        bottom: 50px;
        width: 100%;
        font-size: 28px;
        color: #606266;
        text-align: center;
        span {
          color: #4399fc;
          margin-left: 10px;
        }
      }
    }
</style>