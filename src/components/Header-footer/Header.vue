<template>
  <header id="header" class="mx-auto">
    <b-navbar toggleable="md" type="light" variant="faded" class="p-0">
      <b-navbar-toggle target="navbar-toggle-collapse" class="ml-4">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav class="order-1">
        <b-navbar-nav class="align-items-center py-3 w-100 position-relative ">
          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item delay="0" to="about" :left="about" class="about"
              >About</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="news" delay=".5" :left="news" class="news"
              >News</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="drivers" delay="1" :left="drivers" class="drivers"
              >Drivers</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item
              to="simulator"
              delay="1.5"
              :left="simulator"
              class="simulator"
              >Simulator</b-nav-item
            >
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="f3" delay="2" :left="f3" class="f3">F3</b-nav-item>
          </transition>

          <transition v-on:before-enter="beforeEnter" v-on:enter="enter" appear>
            <b-nav-item to="f4" delay="2.5" :left="f4" class="f4"
              >F4</b-nav-item
            >
          </transition>
        </b-navbar-nav>

        <div class="w-100 bg-dark d-md-none">
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
            <p class="text-secondary">
              <span class="text-white">Phone:</span> 07803 669 894
            </p>

            <p class="text-secondary">
              <span class="text-white">Email:</span>
              enquiries@jhrdevelopments.com
            </p>
            <div class="container-fluid text-center">
              <div class="row mx-auto py-4">
                <div class="col-4">
                  <a href="#" target="_blank">
                    <img
                      src="../../assets/facebook-square-brands-white.png"
                      class="img-fluid"
                      width="30px"
                    />
                  </a>
                </div>
                <div class="col-4">
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
                <div class="col-4">
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

      <transition name="slide">
        <b-navbar-brand to="/" v-if="show" class="order-0">
          <img
            src="../../assets/jhr.png"
            alt="JHR logo"
            class="img-fluid"
            width="200px"
            delay="0"
          />
        </b-navbar-brand>
      </transition>
    </b-navbar>
  </header>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  data() {
    return {
      windowWidth: 0,
      about: 0,
      news: 0,
      drivers: 0,
      simulator: 0,
      f3: 0,
      f4: 0,
      show: false,
    };
  },
  name: "Header",
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.setLeft();
    },
    showImage() {
      this.show = true;
    },
    setLeft() {
      if (this.windowWidth >= 767) {
        let half = this.windowWidth / 2;
        let left = half - 200;
        let right = half - 200;
        let diff = left / 3;

        // left of logo
        this.about = diff / 2 - 20;
        this.news = this.about + diff;
        this.drivers = this.news + diff;

        // right of logo
        this.simulator = right + this.about;
        this.f3 = this.simulator + diff;
        this.f4 = this.f3 + diff;
      }
    },
    beforeEnter(el) {
      el.style.left = "0";
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = parseInt(el.getAttribute("delay"));
      let left = parseInt(el.getAttribute("left"));

      Velocity(
        el,
        { opacity: 1, left },
        { delay, duration: 2000, complete: done }
      );
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted() {
    this.showImage();
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

@media (max-width: 767px) {
  #navbar-toggle-collapse {
    border-top: 0.25rem solid #6e6e6d;
    background-color: #e4e4e4;
  }
}

@media (min-width: 768px) {
  #navbar-toggle-collapse {
    position: absolute;
    width: 100%;
    margin-bottom: 100px;
    li {
      position: relative;
    }
  }
  .navbar-brand {
    margin-bottom: 150px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
.slide-enter-active {
  transition: all 2s ease;
}
.slide-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
