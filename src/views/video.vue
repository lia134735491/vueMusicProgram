<!--  -->
<template>
  <div class="aa">
    <van-loading size="24px" v-if="loading" vertical>加载中...</van-loading>
    <div class="videoContainer">
    <!-- 头部区域  -->
      <div class="header">
        <img src="/images/video/video.jpg">
        <div class="search" >
          搜索音乐
        </div>
        <img src="/images/logo.png">
      </div>

      <!-- 导航区域 -->
      <div class="navScroll">
        <div class="navItem" v-for="item in videoGroupList" :key="item.id" >
          <div class="navContent" :class="[navId===item.id?'active':'']" @click="changeNav" :data-id="item.id">
            {{item.name}}
          </div>
        </div>
      </div>


      <div class="videoScroll">
        <div class="videoItem" v-for="item in videoList" :key="item.id">
          <video class="common" controls ref="video" v-if="videoId===item.data.vid" :src="item.data.urlInfo.url" @play="playing" >   
          </video>
          <!-- 性能优化：使用img图片代替video标签 -->
          <img class="common" :id="item.data.vid" :src="item.data.coverUrl" v-else @click="handlePlay">
          <div class="content">{{item.data.title}}</div>
          <div class="footer">
            <img class="avatar" :src="item.data.creator.avatarUrl">
            <span class="nickName">{{item.data.creator.nickname}}</span>
            <div class="comments_praised">
              <span class="item">
                <span class="iconfont icon-aixin"></span>
                <span class="count">{{item.data.praisedCount}}</span>
              </span>
              <span class="item">
                <span class="iconfont icon-xinxi"></span>
                <span class="count">{{item.data.commentCount}}</span>
              </span>
              <button class="item btn">
                <span class="iconfont icon-gengduo"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'vant'
export default {
  data () {
    return {
      videoGroupList: [],
      navId: 0,
      videoList: [],
      isTriggered: false,
      videoId: '',
      playState:'',
      isplay: false,
      loading: true,
      show:false
    };
  },

  components: {
    vanLoading: Loading
  },

  computed: {},

  created() {
    
    this.getVideoGroupListData()
    
  },

  mounted () {
    this.$store.commit('headerTitleChange','视频')

  },

  methods: {
    async getVideoGroupListData() {
      let videoGroupListData = await this.request('/video/group/list')
      this.videoGroupList = videoGroupListData.data.data.slice(0, 14)
      this.navId = videoGroupListData.data.data[0].id
      this.getVideoList(this.navId)
    },
    
    changeNav(e) {
      this.videoList = []
      this.navId = parseInt(e.target.dataset.id)
      this.getVideoList(this.navId)
    },

    async getVideoList(id) {
      this.loading = true
      
      let index = 0;
      let videoListData = await this.request('/video/group', {id: id})
        setTimeout(()=>{
          this.loading = false
        },500000)
      let videoList = videoListData.data.datas.map(item => {
        item.id = index++;
        return item;
      })
      this.videoList = videoList
      this.isTriggered = false 
    },

    handlePlay(e) {
      this.videoId = e.target.id
      
      this.$nextTick(()=> { 
        let video = this.$refs.video[0]
        video.play()
        video.volume=0.2
         this.playState = !video.paused   
        console.log(this.playState)
      })
    },

    playing() {
      let video = this.$refs.video[0]
      this.playState = !video.paused   
      console.log(this.playState)
    },

    pause() {
      let video = this.$refs.video[0]
      this.playState = video.paused    
    }
  }
}
</script>
<style lang='scss' scoped>
.aa {
  width:100%;
  height: 100%;
}
.van-loading {

  left: 50%;
  right: 50%;
  transform: translate(-50%,-50%)
}
.videoContainer {
  .header {
    display: flex;
    padding: 10px;
    img {
      width: 60px;
      height: 60px;
    }
    .search {
      border: 1px solid #eee;
      flex: 1;
      margin: 0 20px;
      font-size: 26px;
      text-align: center;
      line-height: 60px;
      color: #d43c33;
    }
  }
  .navScroll {
    display: flex;
    white-space: nowrap;
    height: 60px;
    .navItem {
      padding: 0 30px;
      font-size: 28px;
      height: 6px;
      line-height: 60px;
      .navContent {
        height: 60px;
        box-sizing: border-box;
      }
      .active {
        border-bottom: 1px solid #d43c33;
      }
    }
  }
  .videoScroll {
    margin-top: 10px;
    height: calc(100vh - 152px);
    .videoItem {
      padding: 0 3%;
      position: relative;
      .progressControl {
        position: absolute;
        bottom: 200px;
        width: 640px;
        height: 80px;
        line-height: 80px;
        display: flex;
        .iconfont {
          font-size: 48px;
          color: white;
        }
        span {
          font-size: 28px;
          color: white;
        }
        .barControl {
            position: relative;
            width: 450px;
            height: 4px;
            background: rgba(0, 0, 0, 0.4);
            margin: auto;
            .audio-currentTime-Bar {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                height: 4px;
                background: red;
                .audio-circle {
                    position: absolute;
                    right: -6px;
                    top: -4px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #fff;
                }
            }
        }
      }
      .common {
        position: relative;
        width: 100%;
        height: 360px;
        border-radius: 10px;
        object-fit: cover;
      }
      .content {
        font-size: 26px;
        height:80px;
        line-height: 80px;
        max-width: 500px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .footer {
        border-top: 1px solid #eee;
        padding: 20px 0;
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .nickName {
          font-size: 26px;
          vertical-align: middle;
          margin-left: 20px;
        }
        .comments_praised {
          float: right;
          .item {
            margin-left: 50px;
            position: relative;
            span:first-child {
              font-size: 38px;
            }
            .count {
              position: absolute;
              top: -20px;
              font-size: 20px;
            }
          }
          .btn {
            display: inline;
            padding: 0;
            background-color: transparent;
            border-color: transparent;
            &:after {
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>