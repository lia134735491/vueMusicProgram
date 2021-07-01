<!--  -->
<template>
  <div class="header">
    <div class="title">{{title}}</div>
    <div>
      <span>{{nav}}</span>
      <span class="more">查看更多</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String
    },
    nav: {
      type: String
    }
  },

  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='scss' scoped>
@import '../assets/scss/border1px.scss';
  .header {
    padding-bottom: 0.2rem;
    .title {
      font-size: 0.32rem;
      line-height: 0.8rem;
      color: #666;
    }
    span:first-child{
      font-size: 0.3rem;
    }
    .more {
      float: right;
      @include border1px();
      padding: 0.1rem 0.2rem;
      font-size: 0.24rem;
    }
  }
</style>