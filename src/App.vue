<template>
  <div id="app">
    <loader></loader>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";

export default {
  components: {
    Footer
  },
  created() {
    this.$store.dispatch("posts/setPosts");
  }
};
</script>
