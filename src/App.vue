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
    this.$store.dispatch("formula3/setFixtures");
    this.$store.dispatch("formula4/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("carousel/setImages");
    this.$store.dispatch("about/setContent");
    this.$store.dispatch("sim/setContent");
    this.$store.dispatch("f3page/setContent");
    this.$store.dispatch("f4page/setContent");
  },
};
</script>
