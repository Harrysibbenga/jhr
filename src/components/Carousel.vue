<template>
  <div id="carousel" class="position-relative">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      class="d-none d-md-block"
    >
      <b-carousel-slide caption="First slide" img-src="https://picsum.photos/1024/480/?image=10"></b-carousel-slide>
      <b-carousel-slide caption="Second Slide" img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
      <b-carousel-slide caption="Third Slide" img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
    </b-carousel>
    <div v-if="upcomingEvent" class="timer">
      <timer :deadline="upcomingEvent"></timer>
    </div>
  </div>
</template>

<script>
import Timer from "./Timer";

export default {
  name: "Carousel",
  props: {
    msg: String
  },
  data() {
    return {
      upcomingEvent: "07/07/2020"
    };
  },
  components: {
    Timer
  },
  methods: {}
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
