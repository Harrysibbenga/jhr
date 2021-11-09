<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      layout: 'div',
    };
  },
  created() {
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("drivers/setDrivers");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("videos/setVideos");
    this.$store.dispatch("carousel/setImages");
    this.$store.dispatch("about/setContent");
    this.$store.dispatch("sim/setContent");
    this.$store.dispatch("f4britPg/setContent");
    this.$store.dispatch("f4uaePg/setContent");
    this.$store.dispatch("gb3Pg/setContent");
    this.$store.dispatch("gb4Pg/setContent");
    this.$store.dispatch("f4brit/setFixtures");
    this.$store.dispatch("f4uae/setFixtures");
    this.$store.dispatch("gb3/setFixtures");
    this.$store.dispatch("gb4/setFixtures");
  },
};
</script>
