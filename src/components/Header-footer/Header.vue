<template>
  <header id="header">
    <b-navbar type="light" variant="faded">
      <b-navbar-nav>
        <b-nav-item to="about">About</b-nav-item>

        <b-nav-item to="drivers">Drivers</b-nav-item>

        <b-nav-item to="news">News</b-nav-item>

        <b-nav-item to="/">Home</b-nav-item>

        <b-nav-item to="drivers">F3</b-nav-item>

        <b-nav-item to="drivers">Simulator</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss"></style>
