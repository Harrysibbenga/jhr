<template>
  <div>
    <mdb-container>
      <mdb-row>
        <helpers-image-handler :image.sync="about.img" :imageList="images"></helpers-image-handler>
      </mdb-row>

      <form @submit.prevent="submitForm" class="pt-2 row">
        <mdb-col>
          <app-editor2 :content.sync="about.content"></app-editor2>
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
import { aboutPage } from "../../../firebase";
import {
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbRow
} from "mdbvue";
export default {
  data() {
    return {
      about: {
        img: {
          url: "",
          alt: "",
        },
        content: "",
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
    mdbRow
  },
  computed: {
    aboutContent() {
      return this.$store.getters["about/getContent"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
  },
  methods: {
    reset() {
      this.about = {
        id: this.aboutContent.id,
        img: {
          url: this.aboutContent.url,
          alt: this.aboutContent.alt
        },
        content: this.aboutContent.content
      }
    },
    updateContent() {
      aboutPage
        .doc(this.about.id)
        .update({
          alt: this.about.img.alt,
          url: this.about.img.url,
          content: this.about.content,
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
      this.about = {
        id: this.aboutContent.id,
        img: {
          url: this.aboutContent.url,
          alt: this.aboutContent.alt
        },
        content: this.aboutContent.content
      }
    }, 2000);
  },
};
</script>