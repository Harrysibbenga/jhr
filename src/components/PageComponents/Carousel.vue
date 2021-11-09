<template>
  <div id="carousel-section">
    <UiPostCarousel
      :items="posts"
      :type="'post'"
    ></UiPostCarousel>
  </div>
</template>

<script>
import UiPostCarousel from '@/components/UI/PostCarousel'

export default {
  name: "Carousel",
  components: {
    UiPostCarousel,
  },
  computed: {
    posts() {
      return this.$store.getters["posts/getPublishedPosts"].slice(0, 4);
    },
  },
};
</script>

