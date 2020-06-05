import Vue from "vue";

import Bootstrap from "bootstrap-vue";
import {
    BIcon,
    IconsPlugin
} from "bootstrap-vue";

Vue.component('BIcon', BIcon)
Vue.use(IconsPlugin)

import "../../node_modules/bootstrap/scss/bootstrap.scss";

Vue.use(Bootstrap);