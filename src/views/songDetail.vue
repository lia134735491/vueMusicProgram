<template>
  <div>
      <audio :src="songUrl" ref="music" ></audio>
      <div class="songDetailContainer" >
        <div class="author" v-if="song.ar">{{song.ar[0].name}}</div>
        <div class="circle"></div>
        <img class="needle" :class="[isplay&&'needleRotate']" src="/images/song/needle.png">

        <div class="discContainer" :class="[isplay&&'discAnimation']" ref="discContainer">
            <img class="disc" src="/images/song/disc.png">
            <img class="musicImg" v-if="song.al" :src="song.al.picUrl">
        </div>

        <!-- 进度条控制区域 -->
        <div class="progressControl" >
            <span >{{currentTime}}</span>
            <!-- 总进度条 -->
            <div class="barControl"  ref="barControl" >
            <!-- 实时进度条 -->
                <div class="audio-currentTime-Bar" ref="currentBar">
                    <!-- 小圆球 -->
                    <div class="audio-circle" ref="circle" ></div>
                </div>
            </div>
            <span>{{durationTime}}</span>
        </div> 
        <!-- 底部控制播放区域 -->
        <div class="musicControl">
            <span class="iconfont icon-suiji" @click="movePlay"></span>

            <span class="iconfont icon-shangyishoushangyige" id="pre" @click="changeSong('pre')" ></span>

            <span class="iconfont" :class="[isplay?'icon-iconset0482':'icon-bofang']" @click=controlPlay></span>

            <span class="iconfont icon-xiayigexiayishou" id="next" @click="changeSong('next')" ></span>

            <span class="iconfont icon-gengduo1"></span>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data () {
    return {
        currentTime: '00:00',
        song:{},
        durationTime: '',
        songUrl: '',
        isplay: true
    };
  },

  components: {},

  computed: {},

  created() {
      this.bus.$on('musicId',id=>{
        this.getSongMessage(id)
        this.getSongUrl(id)
      })
      if(this.$route.params.id) {
        this.getSongMessage(this.$route.params.id)
        this.getSongUrl(this.$route.params.id)
        localStorage.setItem('id',this.$route.params.id)
      }else {
        let id = localStorage.getItem('id')
        this.getSongMessage(id)
        this.getSongUrl(id)
      }
  },

  mounted () {
      let music = this.$refs.music
      this.movePlay()
      // music.loop = true
      // 该属性设置是否禁音
      // music.muted=true
      music.addEventListener('canplay',function() {
          this.play()
      })
      // 实时显示播放时间
      
      music.addEventListener('timeupdate',this.showPlayTime)
      music.addEventListener('ended',()=> {
        this.isplay = !this.isplay
        this.bus.$emit('change','next')
      })
      setTimeout(()=> {
        this.$store.commit('headerTitleChange',this.song.name)
        console.log(222)
      },1000)

  },


  methods: {
      async getSongMessage(ids) {
          let songMessage = await this.request('/song/detail',{
              ids
          })
          this.song = songMessage.data.songs[0]
          this.durationTime = moment(this.song.dt).format('mm:ss')
      },

      // 获取歌曲url
      async getSongUrl(id) {
        let songUrlData = await this.request('/song/url',{
          id
        })
        this.songUrl = songUrlData.data.data[0].url
      },
      
      // 点击播放按钮控制音乐播放
      controlPlay() {
        let music = this.$refs.music
        this.isplay = !this.isplay
        if(!this.isplay) {
          music.pause()
          
        }else {
          music.play()
        }
      },

      // 跳转播放
      bouncePlay(e) {
        let music = this.$refs.music
        if(e.target===this.$refs.circle){
          return
        }
        let x = e.offsetX
        let barWidth = parseInt(getComputedStyle(e.currentTarget).width)
        music.currentTime = this.song.dt*x/barWidth/1000
        this.$refs.currentBar.style.width = music.currentTime*1000/this.song.dt*100+'%'
      },

      // 切换歌曲
      changeSong(type) {
        this.bus.$emit('change',type)
      },

      // 滑动到目标位置播放
      movePlay() {
        let circle = this.$refs.circle
        let barControl = this.$refs.currentBar
        let music = this.$refs.music
        let start = 0
        let move = 0
        let barControlWidth = parseInt(getComputedStyle(this.$refs.barControl).width)
        let currentBarWidth = 0
        circle.addEventListener('touchstart',e=> {
          music.removeEventListener('timeupdate',this.showPlayTime)
          start = e.touches[0].clientX
          currentBarWidth = parseInt(getComputedStyle(barControl).width)
        })
        circle.addEventListener('touchmove',e=> {
          move = e.touches[0].clientX - start + currentBarWidth
          
          if(move>=barControlWidth) {
            move = barControlWidth
          }
          this.$refs.currentBar.style.width = move + 'px' 
        })
        circle.addEventListener('touchend',()=> {
          this.$refs.currentBar.style.width = move/barControlWidth*100+'%'
          music.currentTime = move/barControlWidth*this.song.dt/1000
          this.currentTime = moment(music.currentTime*1000).format('mm:ss')
          music.addEventListener('timeupdate',this.showPlayTime)
          this.$refs.currentBar.style.width = move+'px'
        })
      },

      showPlayTime() {
          let music = this.$refs.music
          this.currentTime = moment(music.currentTime*1000).format('mm:ss')
          // let discContainRotate = getComputedStyle(this.$refs.discContainer).transformRotate
          // this.$refs.discContainer.style.transfrom = discContainRotate
          this.$refs.currentBar.style.width = music.currentTime*1000/this.song.dt*100+'%'

      }
  }
}

</script>
<style lang='scss' scoped>
.songDetailContainer {
  position: fixed;
  width: 100%;
  z-index: 99;
  height: calc(100vh - 80px);
  background: rgba(0, 0, 0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  .circle {
    position: relative;
    z-index: 100;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    margin: 10px 0;
  }
  .needle {
    position: relative;
    z-index: 99;
    top: -40px;
    left: 60px;
    width: 192px;
    height: 274px;
    transform-origin: 40px 0;
    transform: rotate(-20deg);
    transition: transform 1s;
  }
  .needleRotate {
    transform: rotate(0deg);
  }
  .discContainer {
    position: relative;
    top: -170px;
    width: 598px;
    height: 598px;
    .disc {
        width: 598px;
        height: 598px;
    }
    .musicImg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 370px;
        height: 370px;
        border-radius: 50%;
    }
  }
  .discAnimation {
    animation: disc 4s linear infinite;
    animation-delay: 1s;
  }
  .progressControl {
        position: absolute;
        bottom: 200px;
        width: 640px;
        height: 80px;
        line-height: 80px;
        display: flex;
        span {
          font-size: 28px;
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
  @keyframes disc {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  } 
  .musicControl {
    position: absolute;
    bottom: 40px;
    left: 0;
    border-top: 1px solid #fff;
    width: 100%;
    display: flex;
    span {
        width: 20%;
        height: 120px;
        line-height: 120px;
        text-align: center;
        color: #fff;
        font-size: 50px;
        &.big {
            font-size: 80px;
        } 
    }
  }  
}
</style>