<template>
  <hooper :settings="hooperSettings" style="height:1000px" v-if="type == 'post'">
    <slide v-for="(post,index) in items" :key="index">
        <div class="col-12 flex-column flex-center my-2">
            <img :src="post.url" :alt="post.alt" class="img-fluid" />
            <div class="rgba-black-strong text-center w-100">
              <h2 class="text-white">{{ post.title }}</h2>
              <p class="text-white">{{ post.date | formatDate }}</p>
              <router-link :to="`/post/${post.slug}`" class="text-danger">More info</router-link>
            </div>
          </div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>

  <hooper :settings="hooperSettings" style="height:1200px" :hoverPause="false" v-else>
    <slide v-for="(post,index) in items" :key="index">
        <img :src="post.url" :alt="post.alt" class="img-fluid" />
    </slide>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination, } from 'hooper';
import 'hooper/dist/hooper.css';
import moment from "moment";

export default {
  name: 'LatestCarousel',
  components: {
    Hooper,
    HooperNavigation,
    HooperPagination,
    Slide
  },
  props: {
      items:{
          type: Array,
          default: () => [],
      },
      type:{
          type: String,
          default: 'default',
      }
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        infiniteScroll: true,
        mouseDrag: false,
        wheelControl: false,
        shortDrag: false,
        autoPlay: true,
        transition: 500,
      }
    };
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>