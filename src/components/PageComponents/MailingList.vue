<template>
  <div class="d-flex flex-column flex-center bg-dark py-5 background">
    <h2 class="text-light">Keep up to date with our latest content</h2>
    <button class="btn btn-secondary" @click="open()">Subscribe</button>
  </div>
</template>

<script>
export default {
  name: "MailingList",
  methods: {
    open() {
      this.$store.dispatch("global/setModal", true);
    },
  },
};
</script>

<style lang="css" scoped>
  .background {
    background: url('../../assets/l4_Pulling-01.jpg');
    background-attachment: fixed; 
  }
</style>