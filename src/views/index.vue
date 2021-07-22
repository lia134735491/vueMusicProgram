<template>
  <div>
    <van-swipe class="banner">
      <van-swipe-item v-for="item in swipeData" :key="item.bannerId">
        <img :src="item.pic">
      </van-swipe-item>
    </van-Swipe>
    <div class="navContainer">
      <!-- <router-link class="navItem">
        <span class="iconfont icon--damuzhi"></span>
        <span>每日推荐</span>
      </router-link> -->
      <div class="navItem" @click="iflogin">
        <span class="iconfont icon--damuzhi"></span>
        <span>每日推荐</span>
      </div>
      <div class="navItem">
        <span class="iconfont icon-ziyuanldpi"></span>
        <span>other页面</span>
      </div>
      <div class="navItem">
        <span class="iconfont icon-paihangbang"></span>
        <span>排行榜</span>
      </div>
      <div class="navItem">
        <span class="iconfont icon-diantai"></span>
        <span>电台</span>
      </div>
      <div class="navItem">
        <span class="iconfont icon-zhiboshipinshexiang"></span>
        <span>直播</span>
      </div>
    </div>
    <div class=recommendContainer>
      <nav-header title="推荐歌曲" nav="为你精心推荐"></nav-header>
      <div class="recommendScroll" >
        <div class="parent" ref="recommend" >
          <div class="scrollItem" v-for="item in recommendData" :key="item.id" ref="recommendItem">
            <img :src="item.picUrl" alt="">
            <span class="text">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="topList">
      <nav-header title="排行榜" nav="热歌风向标"></nav-header>
        <div class="topListSwiper">
          <div v-for="item in resultArr" :key="item.id" class="swiper">
            <div class="swiperItem">
              <div class="title">{{item.name}}</div>
              <div class="musicItem" v-for="(otherItem,index) in item.tracks" :key="otherItem.id">
                <img :src="otherItem.al.picUrl">
                <span class="count">{{index + 1}}</span>
                <span class="musicName">{{otherItem.name}}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <transition name="ll">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import navHeader from '../components/navHeader.vue'
export default {
  data () {
    return {
      swipeData:[],
      recommendData:[],
      resultArr:[],
      active: 0
    };
  },

  components: {
    vanSwipe:Swipe,
    vanSwipeItem:SwipeItem,
    navHeader
  },

  computed: {},

  created () {

    this.$store.commit('headerTitleChange','黑皮音乐')
    this.getBannerList();
    this.recommendList();
    this.paihangbang()
  },

  mounted () {
    this.recommendScroll()
  },

  methods: {
    // 轮播图数据
    async getBannerList() {
      let bannerData = await this.axios({
                                url:'/banner',
                                baseURL: "http://localhost:3000",
                                params:{
                                  type:2
                                }
                              })
      
      this.swipeData = bannerData.data.banners                
    },

    // 获取推荐歌单数据

    async recommendList() {
//       let recommendListData = await this.request('/personalized',{
//       limit: 10
//       })
// this.recommendData = recommendListData.data.result
      let recommendListData = await this.axios({
        url:'/personalized',
        baseURL: "http://localhost:3000",
        params: {
          limit: 10
        }
      })
      this.recommendData = recommendListData.data.result
    },

    // 排行榜
    async paihangbang() {
      let index = 0;
      while(index<5) {
        let topListData = await this.axios({
          url: '/top/list',
          baseURL: "http://localhost:3000",
          params: {
            idx: index++
          }
        })
        let topListItem = {name:topListData.data.playlist.name,tracks:topListData.data.playlist.tracks.slice(0,3)}
        this.resultArr.push(topListItem)
      }
    },

    // 推荐歌曲滚动
    recommendScroll() {
      let recommend = this.$refs.recommend;
      let start
      let distance
      let distanceTatol = 0
      let move = 0
      let recmomendOverflowWidth = 0
      recommend.addEventListener('touchstart',e=>{
        let recommendItemWidth = getComputedStyle(this.$refs.recommendItem[0]).width
        let recommendItemRight = getComputedStyle(this.$refs.recommendItem[0]).marginRight
        let recommendTotalWidth = (parseInt(recommendItemWidth)+parseInt(recommendItemRight ))*this.$refs.recommendItem.length
        recmomendOverflowWidth = recommendTotalWidth - parseInt(getComputedStyle(this.$refs.recommend).width)
        start = e.touches[0].clientX
        console.log(recmomendOverflowWidth)
      },false)

      recommend.addEventListener('touchmove',function(e) {
        distance = e.touches[0].clientX-start
        move = distanceTatol + distance
        if(move>=0){
          move = 0
          
        }
        if(move<=-recmomendOverflowWidth ) {
          move = -recmomendOverflowWidth

        }
        this.style.WebkitTransform = 'translateX('+move+'px)'
      })
      recommend.addEventListener('touchend',function() {
        distanceTatol = move
      })
    },

    // 判断是否登录并且跳转到每日推荐页
    iflogin() {
      this.$router.push('/recommendSong')

    }
  }
}

</script>
<style lang='scss' scoped>
@import '../../public/iconfont.css';
  .banner {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /* 五个图标导航区域 */
  .navContainer {
    display: flex;
    .navItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      .iconfont {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        background: rgb(240, 19, 19);
        font-size: 50px;
        color: #fff;
        margin: 20px 0;
      }
      span:last-child {
        font-size: 12px;
      }
    }
  }
  /* 推荐歌曲 */
  .recommendContainer {
    padding: 20px;
    .recommendScroll {
      width: 100%;
      overflow: hidden;    
      height: 300px;
      .parent {
        white-space: nowrap;
        display: flex;
        .scrollItem {
        width: 200px;
        margin-right: 20px;
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 12px;
        }
      }
      }
    }
  }
  // 排行榜
  .topList {
    padding: 20px;
    .topListSwiper {
      height: 400px;
      display: flex;
      overflow: hidden;
      .swiperItem {
        width: 96%;
        background: #fbfbfb;
        .title {
          font-size: 30px;
          line-height: 80px;
        }
        .musicItem {
          display: flex;
          margin-bottom: 20px;
          img {
            width: 100px;
            height: 100px;
            border-radius: 6px;
          }
          .count {
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
          .musicName {
            font-size: 12px;
            height: 100px;
            line-height: 100px;
            max-width: 400px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
