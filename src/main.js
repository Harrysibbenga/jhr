import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import '../mdb/mdbvue/scss/mdb-free.scss'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuelidate from "vuelidate";
import Loader from "@/components/Loader";
import Contact from "@/components/Contact";
import {
  BIcon,
  IconsPlugin,
  NavbarPlugin
} from "bootstrap-vue";

Vue.component('BIcon', BIcon)
Vue.use(NavbarPlugin)
Vue.use(IconsPlugin);


import {
  auth
} from "../firebase";

Vue.use(vuelidate);
Vue.component("loader", Loader);
Vue.component("contact", Contact);
Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: (h) => h(App),
    })
    router.beforeEach((to, from, next) => {
      store.dispatch("global/setLoading", true);

      // Simulate request
      setTimeout(() => {
        next();
      }, 1000);
    });

    router.afterEach(() => {
      store.dispatch("global/setLoading", false);
    });
  }
});