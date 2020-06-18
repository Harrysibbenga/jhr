<template>
  <div>
    <Header></Header>

    <div id="news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-row py-5">
            <button
              class="btn"
              :class="{ active: isActive == 'all' }"
              @click="filter('all')"
            >
              All
            </button>
            <button
              class="btn"
              :class="{ active: isActive == '2020' }"
              @click="filter('2020')"
            >
              2020
            </button>
            <button
              class="btn"
              :class="{ active: isActive == '2019' }"
              @click="filter('2019')"
            >
              2019
            </button>
          </div>
        </div>
        <transition name="fade">
          <div class="row" v-if="transition">
            <div
              class="col-12 col-md-6 col-lg-4 p-0"
              v-for="(post, index) in paginatedData"
              :key="index"
            >
              <div class="view overlay zoom">
                <img
                  src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
                  alt
                  class="img-fluid"
                />
                <div
                  class="mask rgba-black-strong d-flex flex-column justify-content-end pb-4 pl-4"
                >
                  <h2 class="text-white">{{ post.title }}</h2>
                  <p class="text-white">{{ post.date | formatDate }}</p>
                  <router-link :to="`/post/${post.slug}`" class="text-danger"
                    >More info</router-link
                  >
                </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <mdb-btn
                :class="{ 'd-none': pageNumber == 0 }"
                @click="prevPage"
                color="primary"
              >
                <mdb-icon icon="angle-double-left" />
              </mdb-btn>
              <mdb-btn
                :class="{ 'd-none': pageNumber >= pageCount - 1 }"
                @click="nextPage"
                color="primary"
              >
                <mdb-icon icon="angle-double-right" />
              </mdb-btn>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from "mdbvue";
import moment from "moment";
// @ is an alias to /src

export default {
  name: "News",
  data() {
    return {
      isActive: null,
      pageNumber: 0,
      postsVw: [],
      transition: false,
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  computed: {
    posts: {
      get: function() {
        return this.postsVw;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    pageCount() {
      let l = this.posts.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  components: {
    mdbIcon,
    mdbBtn,
  },
  methods: {
    filter(value) {
      if (value == "all") {
        this.isActive = "all";
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPosts"];
          this.transition = true;
        }, 500);
      } else {
        this.isActive = value;
        this.$store.dispatch("posts/setPostsByYear", value);
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPostsByYear"];
          this.transition = true;
        }, 500);
        console.log(this.posts);
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
  created() {
    this.isActive = "all";
  },
  mounted() {
    setTimeout(() => {
      this.postsVw = this.$store.getters["posts/getPosts"];
      this.transition = true;
    }, 500);
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

<style scoped>
.active {
  background-color: #6e6e6d;
  color: white;
}
</style>
