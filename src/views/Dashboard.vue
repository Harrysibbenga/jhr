<template>
  <div class="container-fluid">
    <b-nav tabs>
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item to="/dashboard/posts/">Posts</b-nav-item>
      <b-nav-item to="/dashboard/calenders/">Calenders</b-nav-item>
      <b-nav-item @click="logout">Logout</b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import { auth } from "../../firebaseConfig";

export default {
  computed: {
    currentUser() {
      return this.$store.getters["admin/currentUser"];
    }
  },
  methods: {
    // logout() {
    //   auth.signOut().then(() => {
    //     this.$store.dispatch("admin/clearData");
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>
