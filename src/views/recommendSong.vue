<!--  -->
<template>
  <div class="recommendSongContainer">
    <div class="header">
        <img src="../../public/images/recommendSong/recommendSong.jpg">
        <div class="date">
            <span class="day">{{day}}/ </span>
            <span class="month">{{month}}</span>
        </div>
    </div>

    <div class="ListContainer">
        <div class="listHeader">
            <span>播放全部</span>
            <span class="changeMore">多选</span>
        </div>

        <!-- 内容区 -->
        <div class='listScroll'>
            <div class="scrollItem" v-for="item in recommendList" :key="item.id" data-index="index" data-song='item' >
                <img :src="item.album.picUrl">
                <div class="musicInfo">
                    <span class="musicName">{{item.name}}</span>
                    <span class="author">{{item.artists[0].name}}</span>
                </div>
                <span class="iconfont icon-gengduo"></span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
        day: '', 
        month: '', 
        recommendList:[]
    };
  },

  components: {},

  computed: {},

  created() {
      let userInfo = localStorage.getItem('userInfo')
      if(!userInfo) {
          Dialog({
              message:'请先登录'
          })
          this.$router.push('/login')
      }
      this.day = new Date().getDate();
      this.month = new Date().getMonth()
      this.getRecommendList()
  },

  mounted () {

  },

  methods: {
    // 获取每日推荐的数据
    async getRecommendList() {
        let recommendListData = this.axios({
            baseURL: "http://localhost:3000",
            url: '/recommend/songs',
            headers:{
                cookie:localStorage.getItem('cookies')?localStorage.getItem('cookies').find(item=>item.indexOf('MUSIC_U')!==-1):''
            }
        })
        this.recommendList = recommendListData.data.recommend
        console.log(this.recommendList)
    }
  }
}

</script>
<style lang='scss' scoped>
.recommendSongContainer {
    .header {
        position: relative;
        width: 100%;
        height: 300px;
        img {
            width: 100%;
            height: 100%;
        }
        .date {
           position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -50px;
            width: 300px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            color: #fff; 
            .day {
                font-size: 38px;
            }
        }
    }

    .ListContainer {
        position: relative;
        top: -20px;
        padding: 0 20px;
        border-radius: 30px;
        background: #fff;
        .listHeader {
            height: 80px;
            font-size: 14px;
            line-height: 80px;
            .changeMore {
                float: right;
            }
        }
        .listScroll{
            height: calc(100vh - 380px);
            .scrollItem {
                position: relative;
                display: flex;
                margin-bottom: 20px;
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                }
                .musicInfo {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                    span {
                        height: 40rpx;
                        line-height: 40px;
                        font-size: 24px;
                        max-width: 500px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                .iconfont {
                    position: absolute;
                    right: 0;
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    text-align: right;
                }
            }
        }
    }
} 
</style>