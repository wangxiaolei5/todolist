import Router from 'vue-router'
import routes from './routes'
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'extrac-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // ,parseQuery(query) {

    // },
    // stringifyQuery(obj) {

    // }
    fallback: true
  })
}
