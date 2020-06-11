<template>
  <div id="latest" class="py-2">
    <div class="container-md py-5">
      <div class="row overflow-hidden">
        <div class="col-md-6 mt-1 p-0 main overflow-hidden">
          <div class="view overlay main-content px-1 zoom overflow-hidden">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="main-img"
            />
            <div class="mask rgba-black-strong d-flex flex-column justify-content-end pb-5 pl-5">
              <h2 class="text-white">Headline</h2>
              <p class="text-white">2 Jan 2020</p>
              <router-link to="/" class="text-danger">More info</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 p-0 px-1 d-flex flex-column">
          <div class="mt-1 view overlay zoom">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="img-fluid"
            />
            <div class="mask rgba-black-strong d-flex flex-column justify-content-end pb-5 pl-5">
              <h2 class="text-white">Headline</h2>
              <p class="text-white">2 Jan 2020</p>
              <router-link to="/" class="text-danger">More info</router-link>
            </div>
          </div>
          <div class="mt-1 view overlay zoom">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="img-fluid"
            />
            <div class="mask rgba-black-strong d-flex flex-column justify-content-end pb-5 pl-5">
              <h2 class="text-white">Headline</h2>
              <p class="text-white">2 Jan 2020</p>
              <router-link to="/" class="text-danger">More info</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Latest"
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
