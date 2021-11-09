<template>
  <div>
    
    <mdb-container >
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="sim.video">
        <label class="custom-control-label" for="customSwitch1">Use video ?</label>
      </div>
      <mdb-row v-if="sim.video == false">
        <helpers-image-handler :image.sync="sim.img" :imageList="images"></helpers-image-handler>
      </mdb-row>
      <mdb-row v-else>
        <mdb-col class="text-center pt-2">
          <helpers-video-handler :video.sync="sim.vid" :videoList.sync="videos"></helpers-video-handler>
        </mdb-col>
      </mdb-row>
      <form @submit.prevent="submitForm" class="pt-2 row">
        <mdb-col>
          <mdb-input label="Excerpt" v-model="sim.excerpt"></mdb-input>
          <app-editor2 :content.sync="sim.content"></app-editor2>
          <mdb-btn color="primary" type="submit">Update Content</mdb-btn>
        </mdb-col>
      </form>
    </mdb-container>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { simPage } from "../../../firebase";
import {
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbRow,
  mdbInput,
} from "mdbvue";
export default {
  data() {
    return {
      sim: {
        img: {
          url: "",
          alt: "",
        },
        excerpt: '',
        content: "",
        video: false,
        link: "",
        vid: {
          alt: '',
          url: ''
        }
      },
      msg: {
        message: "",
        type: "",
      },
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
  components: {
    mdbBtn,
    mdbContainer,
    mdbCol,
    mdbRow,
    mdbInput,
  },
  computed: {
    simContent() {
      return this.$store.getters["sim/getContent"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
    videos() {
      return this.$store.getters["videos/getVideos"]
    }
  },
  methods: {
    reset() {
      this.sim = {
        id: this.simContent.id,
        img: {
          url: this.simContent.url,
          alt: this.simContent.alt
        },
        content: this.simContent.content,
        video: this.simContent.video,
        link: this.simContent.link,
        vid: this.simContent.vid,
        excerpt: this.simContent.excerpt
      }
    },
    updateContent() {
      simPage
        .doc(this.sim.id)
        .update({
          alt: this.sim.img.alt,
          url: this.sim.img.url,
          content: this.sim.content,
          video: this.sim.video,
          link: this.sim.link,
          vid: this.sim.vid,
          excerpt: this.sim.excerpt
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Content updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.msg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    submitForm() {
      this.updateContent();
    },
  },
  created() {
    setTimeout(() => {
      this.sim = {
        id: this.simContent.id,
        img: {
          url: this.simContent.url,
          alt: this.simContent.alt
        },
        content: this.simContent.content,
        video: this.simContent.video,
        link: this.simContent.link,
        vid: this.simContent.vid,
        excerpt: this.simContent.excerpt,
      }
    }, 2000);
  },
};
</script>