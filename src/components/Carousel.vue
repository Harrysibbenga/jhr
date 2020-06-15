<template>
  <div id="carousel-section" class="position-relative">
    <mdb-carousel :items="items" :interval="4000" controlls class="d-none d-md-block"></mdb-carousel>
    <div v-if="upcomingEvent" class="timer">
      <timer :deadline="upcomingEvent"></timer>
    </div>
  </div>
</template>

<script>
import { mdbCarousel } from "mdbvue";
import Timer from "./Timer";

export default {
  name: "Carousel",
  props: {
    msg: String
  },
  data() {
    return {
      upcomingEvent: "07/07/2020",
      items: [
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
        },
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(16).jpg"
        },
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
        }
      ]
    };
  },
  components: {
    Timer,
    mdbCarousel
  }
};
</script>

<style scoped>
@media (min-width: 768px) {
  .timer {
    position: absolute;
    top: 0;
    z-index: 2;
  }
}
</style>
