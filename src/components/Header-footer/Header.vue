<template>
  <header id="header" class="container mx-auto">
    <b-navbar toggleable="lg" type="light" variant="faded" class="mx-auto">
      <b-nav-brand to="/">
        <img
          src="../../assets/jhr.png"
          alt="JHR logo"
          class="img-fluid"
          width="200px"
        />
      </b-nav-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="mx-auto align-items-center">
          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              delay="0"
              to="about"
              left="280"
              class="position-absolute about"
              >About</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="news"
              delay="2"
              left="410"
              class="position-absolute news"
              >News</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="f3"
              delay="4"
              left="540"
              class="position-absolute f3"
              >F3</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="drivers"
              delay="6"
              left="660"
              class="position-absolute drivers"
              >Drivers</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="simulator"
              delay="8"
              smLeft="800"
              lgLeft="1000"
              class="position-absolute simulator"
              >Simulator</b-nav-item
            >
          </transition>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  data() {
    return {
      windowWidth: 0,
    };
  },
  name: "Header",
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    beforeEnter(el) {
      el.style.left = "0";
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = parseInt(el.getAttribute("delay"));

      if (this.windowWidth >= 1440) {
        let left = parseInt(el.getAttribute("lgLeft"));
        Velocity(
          el,
          { opacity: 1, left },
          { delay, duration: 2000, complete: done }
        );
      } else {
        let left = parseInt(el.getAttribute("smLeft"));
        Velocity(
          el,
          { opacity: 1, left },
          { delay, duration: 2000, complete: done }
        );
      }
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<style scoped lang="scss"></style>
