<template>
  <div id="app">
    <loader></loader>
    <slot />
    <mailing-model></mailing-model>
    <mailing-list></mailing-list>
    <contact></contact>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";
import MailingModel from "@/components/Modals/MailingListModal";

export default {
  components: {
    Footer,
    MailingModel,
  },
  computed: {
    modal() {
      return this.$store.getters["global/getModal"];
    },
  },
};
</script>