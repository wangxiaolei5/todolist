<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class = "notifycation"
      :style = "style"
      v-show = "visible"
      @mouseenter = "clearTimer"
      @mouseleave = "createTimer"
    >
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn || '关闭'}}</a>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'Notification',
    props: {
      content: {
        type: String,
        required: true
      },
      btn: {
        type: String,
        default: '关闭'
      }
    },
    methods: {
      handleClose (e) {
        e.preventDefault()
        this.$emit('close')
      },
      afterLeave () {
        this.$emit('closed')
      },
      afterEnter () {
        this.height = this.$el.offsetHeight
      },
      clearTimer () {},
      createTimer () {}
    },
    computed: {
      style () {
        return {}
      }
    },
    data () {
      return {
        visible: true
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .notifycation
    display: inline-flex
    background-color #303030
    color rgba(255, 255, 255, 1)
    align-items center
    padding 20px
    min-width 280px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
    flex-wrap wrap
    transition all .3s
  .content
    padding 0
  .btn
    color #ff4081
    padding-left 24px
    margin-left auto
    cursor pointer
</style>

