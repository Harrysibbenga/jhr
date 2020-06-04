import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
//   const currentUser = auth.currentUser;

//   if (requiresAuth && !currentUser) {
//     next("/login");
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else if (to.name === 'login' && currentUser) {
//     next("/dashboard");
//   } else {
//     next();
//   }
// });

export default router