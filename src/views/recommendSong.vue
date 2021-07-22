<!--  -->
<template>
  <div class="recommendSongContainer">
    <div class="header">
        <img src="/images/recommendSong/recommendSong.jpg">
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
        <div class='listScroll' ref="parentScroll">
            <div class="aa" ref="listScroll" @click="tosongDetail">
                <div class="scrollItem" v-for="(item,index) in recommendList" :key="item.id" :data-index="index" :data-song-id="item.id">
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
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
        day: '', 
        month: '', 
        index: 0,
        recommendList:[]
    };
  },

  components: {},

  computed: {

  },

  created() {
      
      this.$store.commit('headerTitleChange',this.$route.meta.title)
      this.bus.$on('change',type=>{
          console.log(122)
          if(type==='next') {
              if(this.index == 0) {
                  this.index = this.recommendList.length-1
              }else{
                  this.index = --this.index
              }
          }
          if(type==='pre') {
              if(this.index == this.recommendList.length-1) {
                  this.index = 0
              }else {
                  this.index = ++this.index
              }
          }
          let id =this.recommendList[this.index].id
          this.bus.$emit('musicId',id)

      })
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
      this.scroll()
       console.log(this.route)
  },

  methods: {
    // 获取每日推荐的数据
    async getRecommendList() {
        let recommendListData = await this.request('/recommend/songs')
        this.recommendList = recommendListData.data.recommend
    },

    // 滚动歌单
    scroll() {
        let listScroll = this.$refs.listScroll;
        let parentScroll = this.$refs.parentScroll;
        let listScrollHeight = parentScroll.clientHeight
        let move = 0
        let start = 0
        let keepDistance = 0
        let listHeight
      
        listScroll.addEventListener('touchstart',function(e) {
            listHeight = parseInt(getComputedStyle(this).height);
            start = e.touches[0].clientY
        })
        listScroll.addEventListener('touchmove',function(e) {
             move = keepDistance + e.touches[0].clientY - start
            if(move>=0) {
                move=0
            }else if(move<=listScrollHeight - listHeight) {
                move = listScrollHeight - listHeight
            }
           
            listScroll.style.transform = 'translateY('+move+'px)'
        })
        listScroll.addEventListener('touchend',function() {
            keepDistance = move
        })
     },

    // 跳转到歌曲播放页面
    tosongDetail(e) {
        this.index = parseInt(e.target.dataset.index)

        this.$router.push({
            name: 'songDetail',
            params: {
                id: e.target.dataset.songId
            }
        })
    }
  }
}

</script>
<style lang='scss' scoped>
.recommendSongContainer {
    position: fixed;
    z-index: 99;
 background: #fff;
    overflow: hidden;
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
            height: calc(100vh - 460px);
           overflow: hidden;
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