import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./Modules/admin"
import posts from "./Modules/posts"
import calendars from "./Modules/calendars"
import carousel from "./Modules/carousel"

Vue.use(Vuex)

export default new Vuex.Store({
    admin,
    posts,
    calendars,
    carousel
})