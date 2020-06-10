<template>
  <div id="home">
    <Header></Header>
    <carousel class="position-relative"></carousel>
    <latest></latest>
    <calendar></calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/Carousel.vue";
import Latest from "@/components/Latest.vue";
import Calendar from "@/components/Calendar.vue";
import Header from "@/components/Header-footer/Header";

export default {
  name: "Home",
  components: {
    Carousel,
    Latest,
    Calendar,
    Header
  }
};
</script>

<style scoped>
/* header {
  z-index: 2;
  color: white !important;
} */
</style>