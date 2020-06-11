<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";
import Header from "@/components/Header-footer/Header";

export default {
  components: {
    Footer,
    Header
  }
};
</script>
<style lang="scss"></style>
