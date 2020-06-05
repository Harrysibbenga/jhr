<template>
  <header id="header" class="mx-auto">
    <b-navbar toggleable="md" type="light" variant="faded" class="p-0">
      <b-navbar-toggle target="navbar-toggle-collapse" class="ml-4">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse
        id="navbar-toggle-collapse"
        is-nav
        class="order-1 bg-primary border-top border-secondary"
      >
        <b-navbar-nav class="align-items-center py-3">
          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item delay="0" to="about" smleft="280" lgleft class="about"
              >About</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="news" delay="2" smleft="410" lgleft class="news"
              >News</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="f3" delay="4" smleft="540" lgleft class="f3"
              >F3</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="drivers"
              delay="6"
              smleft="660"
              lgleft
              class="drivers"
              >Drivers</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="simulator"
              delay="8"
              smleft="800"
              lgleft="1000"
              class="simulator"
              >Simulator</b-nav-item
            >
          </transition>
        </b-navbar-nav>

        <div class="w-100 bg-dark">
          <div class="text-center pt-3">
            <img
              src="../../assets/jhr.png"
              alt="JHR logo"
              class="img-fluid"
              width="200px"
            />
            <p class="text-secondary">
              Steven Hunter
              <br />JHR Developments <br />Hunter Park <br />Callywhite Lane
              <br />Dronfield <br />Derbyshire <br />S18 2XR
              <br />
            </p>
            <div class="container-fluid text-center">
              <div class="row mx-auto py-4">
                <div class="col-4 pl-1">
                  <a href="#" target="_blank">
                    <img
                      src="../../assets/facebook-square-brands-white.png"
                      class="img-fluid"
                      width="30px"
                    />
                  </a>
                </div>
                <div class="col-4 px-1">
                  <a href="#" target="_blank">
                    <span>
                      <img
                        src="../../assets/instagram-square-brands-white.png"
                        class="img-fluid"
                        width="30px"
                      />
                    </span>
                  </a>
                </div>
                <div class="col-4 pr-1">
                  <a href="#" target="_blank">
                    <img
                      src="../../assets/twitter-square-brands-white.png"
                      class="img-fluid"
                      width="30px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>

      <b-navbar-brand to="/" class="order-0">
        <img
          src="../../assets/jhr.png"
          alt="JHR logo"
          class="img-fluid"
          width="200px"
        />
      </b-navbar-brand>
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
        let left = parseInt(el.getAttribute("lgleft"));
        Velocity(
          el,
          { opacity: 1, left },
          { delay, duration: 2000, complete: done }
        );
      } else {
        let left = parseInt(el.getAttribute("smleft"));
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

<style scoped lang="scss">
.col-4 {
  img:hover {
    background-color: red;
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}

ul {
  li a {
    font-size: 1.2rem;
    padding: 1rem 0;
    font-weight: 700;
  }
}

@media (min-width: 768px) {
}
</style>
