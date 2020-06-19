import Vue from "vue";
import Vuex from "vuex";
import posts from "./Modules/posts";
import calendars from "./Modules/calendars";
import carousel from "./Modules/carousel";
import global from "./Modules/global";
import images from "./Modules/images";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    calendars,
    carousel,
    global,
    images
  },
});