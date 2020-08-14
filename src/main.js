import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import '../mdb/mdbvue/scss/mdb-free.scss'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuelidate from "vuelidate";
import Loader from "@/components/UI/Loader";
import ContactModal from "@/components/Modals/ContactModal";
import Header from "@/components/Header-footer/Header";
import Contact from "@/components/PageComponents/Contact";
import MailingList from "@/components/PageComponents/MailingList";

// WYSIWYG
import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor2 from "./components/UI/Editor2.vue"
import {
  BIcon,
  IconsPlugin,
  NavbarPlugin
} from "bootstrap-vue";

Vue.component('BIcon', BIcon)
Vue.use(CKEditor);
Vue.use(NavbarPlugin)
Vue.use(IconsPlugin);
Vue.component("app-editor2", Editor2);


import {
  auth
} from "../firebase";

Vue.use(vuelidate);
Vue.component("loader", Loader);
Vue.component("contact-modal", ContactModal);
Vue.component("Header", Header);
Vue.component("contact", Contact)
Vue.component("mailing-list", MailingList)
Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: (h) => h(App),
    })
    store.dispatch('global/setModal', true)
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