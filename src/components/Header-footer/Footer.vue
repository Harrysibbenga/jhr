<template>
  <footer id="footer" class="bg-dark pb-5 mt-5 bottom">
    <div class="container">
      <div class="row pt-5">
        <div class="col-12 col-md-6 text-center pt-2">
          <img
            src="../../assets/jhr.png"
            alt="JHR logo"
            class="img-fluid mt-5 mb-4"
            width="300px"
          />
        </div>
        <div class="text-center pt-2 col-12 col-md-6">
          <h3 class="text-white">Contact</h3>
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
            <span class="text-white">Email:</span> enquiries@jhrdevelopments.com
          </p>
          <div class="d-flex flex-row px-5 pt-3 justify-content-center">
            <div class="p-2">
              <a href="#" target="_blank">
                <img
                  src="../../assets/facebook-square-brands-white.png"
                  class="img-fluid"
                  width="35px"
                />
              </a>
            </div>
            <div class="p-2">
              <a href="#" target="_blank">
                <span>
                  <img
                    src="../../assets/instagram-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </span>
              </a>
            </div>
            <div class="p-2">
              <a href="#" target="_blank">
                <img
                  src="../../assets/twitter-square-brands-white.png"
                  class="img-fluid"
                  width="35px"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
.d-flex {
  img:hover {
    background-color: red;
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}
</style>
