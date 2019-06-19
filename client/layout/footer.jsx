import '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Wxl'
    }
  },
  render (h) {
    return (
      <div id="footer">
        Written by {this.author}
      </div>
    )
  }
}
