import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Post from "../views/Post.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Simulator from "../views/Simulator.vue"
import Welcome from "@/components/Dashboard/Welcome";
import Calenders from "@/components/Dashboard/Calenders";
import Posts from "@/components/Dashboard/Posts";
import Formula_3 from "@/components/Dashboard/Formula3";
import Formula_4 from "@/components/Dashboard/Formula4";


import {
  auth
} from "../../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/news",
      name: "news",
      component: News,
    },
    {
      path: "/simulator",
      name: "simulator",
      component: Simulator,
    }, {
      path: "/post/:slug",
      name: "post",
      component: Post,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [{
          path: "/",
          component: Welcome,
        },
        {
          path: "posts",
          component: Posts,
        },
        {
          path: "calenders",
          component: Calenders,
          children: [{
              path: "f3",
              component: Formula_3,
            },
            {
              path: "f4",
              component: Formula_4,
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (to.name === "login" && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;