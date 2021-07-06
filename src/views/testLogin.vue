<template>
  <transition name="ll"

  >
    <div  class="aa" >
      <div class="container">
        <div class="wrapper">
          <div class="left-top-sign">LOGIN</div>
          <div class="welcome">
            欢迎回来！
          </div>
          <div class="input-content">
            <div class="input-item">
              <span class="tit">手机号码</span>
              <input  type="span" placeholder="请输入手机号码" data-test="abc" data-type="phone" id="phone" ref="user" />
            </div>
            <div class="input-item">
              <span class="tit">密码</span>
              <input type="password"  placeholder="请输入密码" data-test="abc" data-type="password" id="password" ref="mima" />
            </div>
          </div>
          <button class="confirm-btn" @click="checkForm">登录</button>
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
import { Dialog } from 'vant'
export default {
  name:'login',
  data () {
    return {
      user:'',
      password:'',
    };
  },

  // props:['control'],

  components: {},

  computed: {},

  created() {
    
    this.$store.commit('headerTitleChange','登录中心')
    console.log(11122,this.control)
    this.user=''
    this.password=''
  },

  mounted () {
    // console.log(123456789456.match(/^1[3|4|5|7|8][0-9]{9}$/))
  },

  methods: {
    // 获取输入内容并且验证
    async checkForm() {
      this.user = this.$refs.user.value
      this.password = this.$refs.mima.value
      console.log(this.user)
      if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.user)){
        Dialog({
          message:'用户名错误',
        })
        return
      }
      else if(!this.user) {
        Dialog({
          message:'用户名不能为空',
        })
        return
      }
      else if(!this.password) {
        Dialog({
          message:'密码不能为空',
        })
        return
      }
      let result = await this.axios({
         baseURL: "http://localhost:3000",
         url: '/login/cellphone',
         params: {
          phone: this.user, 
          password: this.password,
          isLogin:true
        },
      })
      localStorage.setItem('cookies',result.cookies)
      if(result.data.code==200) {
        localStorage.setItem('userInfo',JSON.stringify(result.data.profile))
        this.$router.push('/person')
      }
    }
    // beforeEnter(el) {
    //   console.log(el)
    // },
    // leave(el) {
    //   console.log(el)
    // }
  }
}

</script>
<style lang='scss' scoped>
    .aa {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 80px;
      left: 0;
      z-index: 90;
      background-color: white;
      transition: all .3s ease;
      &.ll-enter,&.ll-leave-to {
        transform: translate3d(100%,0,0);
        // background-color: white;
      }
    }
    
    .wrapper {
      padding-bottom: 40px;
      .left-top-sign {
        font-size: 120px;
        color: #f8f8f8;
        // position:relative;
        // left: -16px;
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
            outline: none;
            border: 0;
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
        text-align: center;
        transform: translateX(-50%);
        margin-left: 50%;
      }
      .forget-section {
        font-size: 28px;
        color: #4399fc;
        text-align: center;
        margin-top: 40px;
      }
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
</style>