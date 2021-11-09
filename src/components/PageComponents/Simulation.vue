<template>
  <div id="latest">
    <div class="container-fluid p-0" v-if="post.video">
      <div class="row no-gutters rgba-black-strong" >
        <div class="col-12 position-relative">
                <video 
                    width="100%"
                    height="100%"
                    autoplay
                    muted 
                    loop
                    class="position-relative"
                >
                    <source :src="post.vid.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video> 
          <div class="col-12 col-lg-5 mt-auto rgba-black-strong position-absolute d-flex content-container" >
                <div class="text-center">
                    <h2 class="pb-3 text-white">In-house race simulator</h2>
                    <p class="text-white">{{ content }}</p>
                    <router-link to="/simulator" class="text-danger">More info</router-link>
                </div>
              </div>
        </div>
      </div>
    </div>

    <div class="container-md py-md-5" v-else>
      <div class="row no-gutters rgba-black-strong" >
        <div class="col-12 col-md-5 col-lg-6 my-auto image">
          <img :src="post.url" :alt="post.alt" class="img-fluid" />
        </div>
        <div class="col-12 col-md-7 col-lg-6 m-auto p-5 pl-xl-0">
          <div class="text-center">
              <h2 class="pb-3 text-white">In-house race simulator</h2>
              <p class="text-white">{{ content }}</p>
              <router-link to="/simulator" class="text-danger">More info</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Latest",
  computed: {
    post() {
      return this.$store.getters["sim/getContent"]
    },
    content() {
      var html = this.post.excerpt;
      var div = document.createElement("div");
      div.innerHTML = html;
      return this.truncateString(div.innerText, 250)
    }
  },
  methods: {
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
};
</script>

<style scoped lang="css">
  .content-container {
      top:0; height:100%;
  }

  @media screen and (min-width: 992px){
    .content-container {
      bottom:0 ;
      right: 0;
      height:300px;
    }
  }

  @media screen and (max-width: 768px){
    .image {
      text-align: center;
    }
  }
  
</style>