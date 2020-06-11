<template>
  <div id="calendar">
    <div class="container bg-dark">
      <div class="row py-5">
        <div class="col-12 d-flex justify-content-around">
          <router-link to="calendar_f3" class="ml-5">F3 Calendar</router-link>
          <router-link to="calendar_f4" class="mr-5">F4 Calendar</router-link>
        </div>
      </div>
      <div class="row px-4">
        <div class="col-12 col-md-6 col-lg-4 flex-column flex-center my-2">
          <img src="../assets/circuits/Brands_gp-01.png" alt class="img-fluid d-none d-md-block" />
          <div class="border border-light w-100 text-center text-white pt-3">
            <h5 class="track">Track name</h5>
            <p class="date">2 Jan 2020</p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 flex-column flex-center mt-2">
          <img src="../assets/circuits/Brands_gp-01.png" alt class="img-fluid d-none d-md-block" />
          <div class="border border-light w-100 text-center text-white pt-3">
            <h5 class="track">Track name</h5>
            <p class="date">2 Jan 2020</p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 flex-column flex-center mt-2">
          <img src="../assets/circuits/Brands_gp-01.png" alt class="img-fluid d-none d-md-block" />
          <div class="border border-light w-100 text-center text-white pt-3">
            <h5 class="track">Track name</h5>
            <p class="date">2 Jan 2020</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
a {
  font-size: 1.2rem;
  padding: 1rem 0;
  font-weight: 700;
}

.track {
  text-decoration: underline;
  font-size: 1rem;
}
.date {
  font-size: 1rem;
  font-weight: 400;
}
@media screen and (max-width: 767px) {
  .border {
    border: none !important;
  }
}
</style>
