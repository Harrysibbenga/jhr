<template>
  <hooper :settings="hooperSettings" class="height-carousel background" v-if="type == 'post'">
    <slide v-for="(post,index) in items" :key="index">
      <div class="row no-gutters">
        <div class="col-12 col-md-10 col-lg-8 mx-auto">
          <img :src="post.url" :alt="post.alt" class="img-fluid" />
        </div>
        <div class="col-12 col-lg-4 my-auto p-5">
          <div class="text-center height-content">
              <h2 class="text-white h1-responsive">{{ post.title }}</h2>
              <p class="text-white">{{ post.date | formatDate }}</p>
              <router-link :to="`/post/${post.slug}`" class="text-danger">More info</router-link>
          </div>
        </div>
      </div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
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
        pauseOnHover: false
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

<style lang="css" scoped>
  .height-carousel {
    height: auto !important;
  }
  .height-content {
    height: auto;
  }
  .background {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (min-width: 768px) {
    .height-content {
      height: auto;
    }
  }
  @media (min-width: 992px) {
     .height-carousel {
      height: auto !important;
    }
    .height-content {
      height: auto;
    }
  }
</style>