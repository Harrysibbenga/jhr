<template>
  <div>
    <Header></Header>
    <div id="post">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-center p-0">
            <img :src="post.url" :alt="post.alt" class="img-fluid" />
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 mt-3 text-center">
            <h2 class="pt-3">{{post.title}}</h2>
          </div>
          <div class="col-12 text-center">
            <p>{{post.date | formatDate}}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 pt-3 text-justify" v-html="post.content"></div>
        </div>
        <div class="row py-3" v-if="post.gallery.length > 0">
          <div class="col-4 py-2" v-for="(item, index) in post.gallery" :key="index">
            <img :src="item.url" :alt="item.alt" class="img-fluid">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 py-3 text-justify bg-info text-white" v-html="post.quoteContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LayoutDefault from "@/layouts/default"

export default {
  name: "News",
  computed: {
    post() {
      return this.$store.getters["posts/getPost"];
    },
  },
  created() {
    let slug = this.$route.params.slug;
    this.$store.dispatch("posts/setPostSlug", slug);
    this.$emit('update:layout', LayoutDefault);
  },
  destroyed() {
    this.$store.commit("posts/clearPost");
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
