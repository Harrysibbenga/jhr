import Vue from "vue";
import Vuex from "vuex";
import posts from "./Modules/posts";
import carousel from "./Modules/carousel";
import global from "./Modules/global";
import images from "./Modules/images";
import videos from "./Modules/videos";
import circuits from "./Modules/circuits";
import drivers from "./Modules/drivers";
import about from "./Modules/about";
import sim from "./Modules/sim";
import f4britPg from "./Modules/f4britPg";
import f4uaePg from "./Modules/f4uaePg";
import gb3Pg from "./Modules/gb3Pg";
import gb4Pg from "./Modules/gb4Pg";
import f4brit from "./Modules/f4brit";
import f4uae from "./Modules/f4uae";
import gb3 from "./Modules/gb3";
import gb4 from "./Modules/gb4";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    carousel,
    global,
    images,
    videos,
    gb3,
    f4brit,
    gb4,
    f4uae,
    circuits,
    drivers,
    about,
    sim,
    f4britPg,
    f4uaePg,
    gb3Pg,
    gb4Pg,
  },
});
