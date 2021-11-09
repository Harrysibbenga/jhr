<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6 offset-md-3 offset-lg-0 col-lg-4 p-5 px-md-0 py-md-5 p-lg-5">
          <img :src="sim.url" class="img-fluid" :alt="sim.alt" />
        </div>
        <div class="col-12 col-lg-8 px-md-5 p-lg-5">
          <div class="pb-5">
            <div class="col-12 pt-3 text-justify" v-html="sim.content"></div>
          </div>
          <contact-modal></contact-modal>
        </div>
        <div col="12">
          <video 
              width="100%"
              height="100%"
              class="position-relative"
          >
              <source :src="sim.displayVid.url" type="video/mp4">
              Your browser does not support the video tag.
          </video> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutDefault from "@/layouts/default"

export default {
  computed: {
    sim() {
      return this.$store.getters["sim/getContent"];
    },
  },
  created() {
    this.$emit('update:layout', LayoutDefault);
  }
};
</script>
