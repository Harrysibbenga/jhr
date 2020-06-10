<template>
  <div id="latest">
    <div class="container-md pt-5">
      <div class="row">
        <div class="col-md-6 pt-1 p-0 main px-1 overflow-hidden">
          <img
            src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
            alt
            class="main-img"
          />
        </div>
        <div class="col-md-6 p-0 px-1 d-flex flex-column">
          <div class="pt-1">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="img-fluid"
            />
          </div>
          <div class="pt-1">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="img-fluid"
            />
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
    .main-img {
      transform: translateX(-25%);
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
