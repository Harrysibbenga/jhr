<template>
  <div id="latest" class="py-2">
    <div class="container-md py-md-5">
      <div class="row">
        <Carousel :items="posts" :type="'post'"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Carousel from "@/components/UI/PostCarousel"

export default {
  name: "Latest",
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"].slice(0, 4);
    },
  },
  components: {
    Carousel
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 767px) {
  .main {
    .main-img {
      max-width: 100%;
      height: auto;
    }
  }
}

@media (min-width: 768px) {
  .main {
    .main-content {
      transition: all 0.3s ease-in;
      .main-img {
        transform: translateX(-25%);
      }
    }
  }
  .main:hover {
    .main-content {
      transform: scale(1.05);
      .main-img {
        transform: translateX(-25%);
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .main {
    .main-img {
      height: 473px;
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .main {
    .main-img {
      height: 633px;
    }
  }
}

@media (min-width: 1200px) {
  .main {
    .main-img {
      height: 753px;
    }
  }
}
</style>
