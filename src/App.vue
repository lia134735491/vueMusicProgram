<!--  -->
<template>
  <div class="hidden">
    <header-title></header-title>
    <transition name="ll">
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active" active-color="#d43c33" route>
      <van-tabbar-item icon="home-o"  to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="search"  to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="friends-o"  to="/person">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import headerTitle from './components/headerTitle.vue'
export default {
  data () {
    return {
      active: 0
    };
  },

  components: {
    vanTabbar:Tabbar,
    vanTabbarItem:TabbarItem,
    headerTitle
  },

  computed: {},

  created () {
    
  },

  mounted () {
    
  },

  methods: {
    
  },
  
}

</script>
<style lang='scss' scoped>
.hidden {
  overflow: hidden;
}
</style>
