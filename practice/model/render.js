import Vue from 'vue'
const ChildComponent = {
  template: '<div>child component</div>',
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.yeye, this.data.value)
  }
}
const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  template: `
    <div :style="style">
        <slot :value = "value" aaa='111'>
        </slot>
        <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'compVal'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  // template: `
  //  <div>
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  //  </div>
  // `,
  render (createElement) {
    return createElement('comp-one', {
      ref: 'comp'
    }, [createElement('span', {
      ref: 'span'
    }, this.value)])
  }
})
