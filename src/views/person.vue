<!--  -->
<template>
  <div class="personalContainer">
    <div class="user-section">
      <img class="bg" src="/images/personal/bgImg2.jpg">
      <div class="user-info-box" @click="toLogin">
        <div class="portrait-box">
          <img class="portrait" :src="headerPhoto">
        </div>
        <div class="info-box">
          <span class="username">{{userInfo.nickname?userInfo.nickname: '游客'}}</span>
        </div>
      </div>

      <div class="vip-card-box">
        <img class="card-bg" src="/images/personal/vip-card-bg.png" >
        <div class="b-btn">
          立即开通
        </div>
        <div class="tit">
          <!-- 会员图标-->
          <span class="iconfont icon-wangguan"></span>
          硅谷会员
        </div>
        <span class="e-m">atguigu Union</span>
        <span class="e-b">开通会员听歌, 撸代码</span>
      </div>
    </div>
    <!-- <div
      class="cover-container"
      style="{transform: coverTransform ,transition: coveTransition}"
    >
      <img class="arc" src="/static/images/personal/arc.png">

      <div class="nav-section">
        <div class="nav-item"  hover-class="common-hover"  hover-stay-time="50">
          <span class="iconfont icon-xiaoxi"></span>
          <span>我的消息</span>
        </div>
        <div class="nav-item"   hover-class="common-hover" hover-stay-time="50">
          <span class="iconfont icon-myRecommender"></span>
          <span>我的好友</span>
        </div>
        <div class="nav-item"  hover-class="common-hover"  hover-stay-time="50">
          <span class="iconfont icon-gerenzhuye"></span>
          <span>个人主页</span>
        </div>
        <div class="nav-item" hover-class="common-hover"  hover-stay-time="50">
          <span class="iconfont icon-gexingzhuangban"></span>
          <span>个性装扮</span>
        </div>
      </div>

      <div class="personalContent">
        <div class="recentPlayContainer">
          <span class="title">最近播放</span>

          <scroll-div if="{{recentPlayList.length}}" scroll-x class="recentScroll" enable-flex>
            <div class="recentItem" wx:for="{{recentPlayList}}" wx:key="{{id}}">
              <image src="{{item.song.al.picUrl}}"></image>
            </div>
          </scroll-div>
          <div wx:else>暂无播放记录</div>
        </div>

        <div class="cardList">
          <div class="card-item">
            <span class="title">我的音乐</span>
            <span class="more"> > </span>
          </div>
          <div class="card-item">
            <span class="title">我的收藏</span>
            <span class="more"> > </span>
          </div>
          <div class="card-item">
            <span class="title">我的电台</span>
            <span class="more"> > </span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'person',
  data () {
    return {
      userInfo:{},
      // coverTransform: `translateY(0rpx)`,
      // coveTransition: 'transform 1s linear'
    };
  },

  components: {
    
  },

  computed: {
    headerPhoto() {
     
      return  this.userInfo.avatarUrl?this.userInfo.avatarUrl:require('../../public/images/personal/missing-face.png')
    },
  },

  created () {
    this.$store.commit('headerTitleChange','个人中心')
    if(JSON.parse(localStorage.getItem('userInfo'))) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    // if(this.userInfo) {
    //   this.getUserPlayList(this.userInfo.userId)
    // }
  },

  mounted () {},

  methods: {
    toLogin() {
      this.$router.push('/login')  
    },
    
    // 获取用户播放记录
    // async getUserPlayList(userId) {
    //   let userListData = await this.axios({
    //     url:'/user/record',
    //     baseURL: "http://localhost:3000",
    //     params:{
    //       uid:userId,
    //       type:0
    //     }
    //   })
    // }
  }
}

</script>
<style lang='scss' scoped>
  .personalContainer {
    // overflow: hidden;
    width: 100%;
    height: 100%;
    position: relation;
    .user-section {
      height: 520px;
      position: relative;
      padding: 100px 30px 0;
      .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        filter: blur(1px);
      }
      .user-info-box {
        height: 180px;
        display:flex;
        align-items:center;
        position:relative;
        z-index: 1;
        .portrait {
          width: 130px;
          height: 130px;
          border:5px solid #fff;
          border-radius: 50%;
        }
        .username {
          font-size: 24px;
          color: #303133;
          margin-left: 20px;
        }
      }
      .vip-card-box {
        position: relative;
        display: flex;
        flex-direction: column;
        // background: linear-gradient(left, red, black);
        background: rgba(0, 0, 0, .7);
        height: 240rpx;
        color: #f7d680;
        border-radius: 16px 16px 0 0;
        padding: 20px 24px;
        .card-bg {
          position:absolute;
          top: 20px;
          right: 0;
          width: 380px;
          height: 260px;
        }
        .b-btn {
          position: absolute;
          right: 20px;
          top: 16px;
          width: 132px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 22px;
          color: #36343c;
          border-radius: 20px;
          background: #f9e6af;
          z-index: 1;
        }
        .tit {
          font-size: 22px;
          color: #f7d680;
          margin-bottom: 28px;
          .iconfont {
            color: #f6e5a3;
            margin-right: 1rpx;
          }
        }
        .e-m{
          font-size: 34px;
          margin-top: 10px;
        }
        .e-b{
          font-size: 24px;
          color: #d8cba9;
          margin-top: 10px;
        }
      }
    }
  }
</style>