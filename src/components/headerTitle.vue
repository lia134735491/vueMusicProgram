<!--  -->
<template>
  <div>{{changeTitle}}</div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    };
  },

  components: {},

  computed: {
    changeTitle() {
      if (this.$route.path=='/') {
        return '黑皮音乐'
      }
      return this.$store.state.title

    }
  },

  mounted () {
    
  },
  // beforeRouterLeave(to,from,next) {
  //   this.$store.commit
  // },
  methods: {}
}

</script>
<style lang='scss' scoped>
    div {
        width: 100%;
        height: 80px;
        line-height: 80px;
        position: relative;
        background-color: #d43c33;
        text-align: center;
        font-size: 18px;
        color: white;
    }
</style>