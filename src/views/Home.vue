<template>
  <div id="home">
    <Header></Header>
    <Carousel class="position-relative"></Carousel>
    <Simulation></Simulation>
    <Calendar></Calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/PageComponents/Carousel.vue";
import Simulation from "@/components/PageComponents/Simulation.vue";
import Calendar from "@/components/PageComponents/Calendar.vue";
import LayoutDefault from "@/layouts/default"

export default {
  name: "Home",
  components: {
    Carousel,
    Simulation,
    Calendar,
  },
  created() {
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>

