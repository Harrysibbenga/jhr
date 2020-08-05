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
    Footer,
  },
  created() {
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("drivers/setDrivers");
    this.$store.dispatch("formula3/setFixtures");
    this.$store.dispatch("formula4/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("carousel/setImages");
  },
};
</script>
