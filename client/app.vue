<template>
    <div id="app">
        <div id="cover">
            <Header></Header>
            <transition name="fade">
              <router-view/>
            </transition>
            <!-- <notification content="test notify"></notification> -->
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$notify({
      content: 'test $notify',
      btn: 'close'
    })
  }
}
</script>
<style lang="stylus" scoped>
  #app {
   position absolute
   left 0
   right 0
   top 0
   bottom 0
  }
  #cover {
   position absolute
   left 0
   top 0
   right 0
   bottom 0
   background-color #999
   opacity .9
  }
</style>

