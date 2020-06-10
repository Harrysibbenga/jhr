import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import Welcome from "@/components/Dashboard/Welcome";
import Calenders from "@/components/Dashboard/Calenders";
import Formula_3 from "@/components/Dashboard/Formula3";
import Formula_4 from "@/components/Dashboard/Formula4";


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
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
          path: '/',
          component: Welcome
        },
        {
          path: 'calenders',
          component: Calenders,
          children: [{
              path: 'f3',
              component: Formula_3
            },
            {
              path: 'f4',
              component: Formula_4
            }
          ]
        },
      ]
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