<template>
  <div>
    <mdb-container>
        <h2>Fixture Headline Image</h2>
        <mdb-row>
          <helpers-image-handler :image-list="images" :image.sync="f3.head"></helpers-image-handler>
        </mdb-row>
      <mdb-row>
        <mdb-col class="text-center pt-2">
          <helpers-image-handler :image-list="images" :image.sync="f3.img_1"></helpers-image-handler>
        </mdb-col>
        <mdb-col class="text-center pt-2">
          <helpers-image-handler :image-list="images" :image.sync="f3.img_2"></helpers-image-handler>
        </mdb-col>
        <mdb-col class="text-center pt-2">
          <helpers-image-handler :image-list="images" :image.sync="f3.img_3"></helpers-image-handler>
        </mdb-col>
      </mdb-row>

      <form @submit.prevent="submitForm" class="pt-2 row">
        <mdb-col>
          <app-editor2 :content.sync="f3.content"></app-editor2>
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
import { f4britPg } from "../../../firebase";
import {
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbRow,
} from "mdbvue";
export default {
  data() {
    return {
      f3: {
        head: {
          url: '',
          alt: '',
        },
        img_1: {
          url: "",
          alt: "",
        },
        img_2: {
          url: "",
          alt: "",
        },
        img_3: {
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
    mdbRow,
  },
  computed: {
    f3Content() {
      return this.$store.getters["f4britPg/getContent"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
  },
  methods: {
    reset() {
      this.f3 = this.f3Content;
    },
    updateContent() {
      f4britPg
        .doc(this.f3.id)
        .update({
          content: this.f3.content,
           head: {
            url: this.f3.head.url,
            alt: this.f3.head.alt,
          },
          img_1: {
            alt: this.f3.img_1.alt,
            url: this.f3.img_1.url,
          },
          img_2: {
            alt: this.f3.img_2.alt,
            url: this.f3.img_2.url,
          },
          img_3: {
            alt: this.f3.img_3.alt,
            url: this.f3.img_3.url,
          },
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
      this.f3 = this.f3Content;
    }, 2000);
  },
};
</script>