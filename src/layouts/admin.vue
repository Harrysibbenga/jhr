<template>
  <div id="app">
    <slot />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";

export default {
  components: {
    Footer,
  },
};
</script>