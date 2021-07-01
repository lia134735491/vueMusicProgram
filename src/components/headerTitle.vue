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

  methods: {}
}

</script>
<style lang='scss' scoped>
    div {
        width: 100%;
        position: relative;
        background-color: red;
        text-align: center;
    }
</style>