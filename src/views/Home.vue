<template>
  <div id="home">
    <Header></Header>
    <Carousel class="position-relative"></Carousel>
    <Latest></Latest>
    <Calendar></Calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/PageComponents/Carousel.vue";
import Latest from "@/components/PageComponents/Latest.vue";
import Calendar from "@/components/PageComponents/Calendar.vue";
import LayoutDefault from "@/layouts/default"

export default {
  name: "Home",
  components: {
    Carousel,
    Latest,
    Calendar,
  },
  created() {
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>

