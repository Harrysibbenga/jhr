import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Post from "../views/Post.vue";
import Login from "../views/Login.vue";
import GB3 from "../views/GB3.vue";
import F4UAE from "../views/F4UAE.vue";
import F4BRIT from "../views/F4BRIT.vue";
import GB4 from "../views/GB4.vue";
import Dashboard from "../views/Dashboard.vue";
import Simulator from "../views/Simulator.vue";
import Driver from "../views/Drivers";
import DriverProfile from "../views/Driver";
// Dashboard
import Welcome from "@/components/Dashboard/Welcome";
import Calendars from "@/components/Dashboard/Calendars";
import Posts from "@/components/Dashboard/Posts";
import Drivers from "@/components/Dashboard/Drivers";
import Formula_4_BRIT from "@/components/Dashboard/F4BRIT";
import Formula_4_UAE from "@/components/Dashboard/F4UAE";
import GB_3 from "@/components/Dashboard/GB3";
import GB_4 from "@/components/Dashboard/GB4";
import Carousel from "@/components/Dashboard/Carousel";
import Gallery from "@/components/Dashboard/Gallery";
import Images from "@/components/Dashboard/Images";
import Pages from "@/components/Dashboard/Pages";
import Circuits from "@/components/Dashboard/Circuits";
import Videos from "@/components/Dashboard/Videos";
// Page edits
import AboutEdit from "@/components/Pages/About";
import SimulatorEdit from "@/components/Pages/Simulator";
import GB3Edit from "@/components/Pages/GB3";
import GB4Edit from "@/components/Pages/GB4";
import F4BRITEdit from "@/components/Pages/F4BRIT";
import F4UAEEdit from "@/components/Pages/F4UAE";

import { auth } from "../../firebase";

import store from "../store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
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
      path: "/driver/:id",
      name: "driverProfile",
      component: DriverProfile,
    },
    {
      path: "/drivers",
      name: "drivers",
      component: Driver,
    },
    {
      path: "/simulator",
      name: "simulator",
      component: Simulator,
    },
    {
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
      path: "/gb3",
      name: "GB3",
      component: GB3,
    },
    {
      path: "/gb4",
      name: "GB4",
      component: GB4,
    },
    {
      path: "/f4brit",
      name: "F4",
      component: F4BRIT,
    },
    {
      path: "/f4uae",
      name: "F4UAE",
      component: F4UAE,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          component: Welcome,
        },
        {
          path: "posts",
          component: Posts,
        },
        {
          path: "calendars",
          component: Calendars,
          children: [
            {
              path: "/",
              component: GB_3,
            },
            {
              path: "gb4",
              component: GB_4,
            },
            {
              path: "f4brit",
              component: Formula_4_BRIT,
            },
            {
              path: "f4uae",
              component: Formula_4_UAE,
            },
          ],
        },
        {
          path: "drivers",
          component: Drivers,
        },
        {
          path: "carousel",
          component: Carousel,
        },
        {
          path: "gallery",
          component: Gallery,
          children: [
            {
              path: "/",
              component: Images,
            },
            {
              path: "circuits",
              component: Circuits,
            },
            {
              path: "videos",
              component: Videos,
            },
          ],
        },
        {
          path: "pages",
          component: Pages,
          children: [
            {
              path: "/",
              component: AboutEdit,
            },
            {
              path: "simulator",
              component: SimulatorEdit,
            },
            {
              path: "gb3",
              component: GB3Edit,
            },
            {
              path: "gb4",
              component: GB4Edit,
            },
            {
              path: "f4brit",
              component: F4BRITEdit,
            },
            {
              path: "f4uae",
              component: F4UAEEdit,
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = auth.currentUser;
  store.dispatch("global/setLoading", true);
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

router.afterEach(() => {
  store.dispatch("global/setLoading", false);
});

export default router;
