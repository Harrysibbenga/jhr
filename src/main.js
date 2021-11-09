import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../mdb/mdbvue/scss/mdb-free.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuelidate from "vuelidate";
import Loader from "@/components/UI/Loader";
import Timer from "@/components/UI/Timer";
import ContactModal from "@/components/Modals/ContactModal";
import Header from "@/components/Header-footer/Header";
import Contact from "@/components/PageComponents/Contact";
import MailingList from "@/components/PageComponents/MailingList";
import AddImage from "@/components/Helpers/addImage";
import ImageHandler from "@/components/Helpers/imageHandler";
import AddVideo from "@/components/Helpers/addVideo";
import VideoHandler from "@/components/Helpers/videoHandler";
import SelectItem from "@/components/Helpers/selectItem";
import SelectVideo from "@/components/Helpers/selectVideo";
// WYSIWYG
import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor2 from "./components/UI/Editor2.vue";
import { BIcon, IconsPlugin, NavbarPlugin } from "bootstrap-vue";

Vue.component("BIcon", BIcon);
Vue.use(CKEditor);
Vue.use(NavbarPlugin);
Vue.use(IconsPlugin);
Vue.component("app-editor2", Editor2);

import { auth } from "../firebase";

Vue.use(vuelidate);
Vue.component("loader", Loader);
Vue.component("contact-modal", ContactModal);
Vue.component("Header", Header);
Vue.component("contact", Contact);
Vue.component("mailing-list", MailingList);
Vue.component("helpers-image-handler", ImageHandler);
Vue.component("helpers-add-image", AddImage);
Vue.component("helpers-video-handler", VideoHandler);
Vue.component("helpers-add-video", AddVideo);
Vue.component("helpers-select-item", SelectItem);
Vue.component("helpers-select-video", SelectVideo);
Vue.component("ui-timer", Timer);

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: (h) => h(App),
    });
    store.dispatch("global/setModal", true);
  }
});
