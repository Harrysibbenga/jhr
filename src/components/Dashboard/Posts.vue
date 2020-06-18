<template>
  <div>
    <mdb-container>
      <mdb-collapse
        :toggleTag="['button']"
        :togglers="1"
        :toggleClass="['btn btn-primary']"
        :toggleText="['Add Post']"
      >
        <form @submit.prevent="submitForm" class="p-2">
          <div class="md-form col-md-6 col-lg-4 p-0">
            <mdb-input type="date" inline v-model.trim="post.date" />
          </div>

          <div class="md-form">
            <mdb-input label="Title" inline v-model.trim="post.title" />
          </div>

          <div class="md-form">
            <mdb-input label="Excerpt" inline v-model.trim="post.excerpt" />
          </div>

          <div class="md-form">
            <mdb-input
              label="Content"
              type="textarea"
              v-model="post.content"
              :rows="5"
            ></mdb-input>
          </div>

          <div class="row col-12 col-md-6 col-lg-4 py-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="imageInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imageInput"
                  aria-describedby="imageInput"
                  @change="checkFile($event)"
                  ref="imageInput"
                  accept="image/jpeg image/png"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Header image</label
                >
              </div>
            </div>
          </div>

          <mdb-btn color="none" type="submit">Add Post</mdb-btn>
        </form>
      </mdb-collapse>
    </mdb-container>

    <mdb-container>
      <transition name="fade">
        <div
          v-if="msg.message != ''"
          :class="`bg-${msg.type}`"
          class="pl-5 mt-2 text-white text-center"
        >
          <p>{{ msg.message }}</p>
        </div>
      </transition>
    </mdb-container>

    <div class="container-fluid pt-5 p-0">
      <table class="table">
        <thead class="black text-white">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in paginatedData" :key="index">
            <th scope="row">{{ post.title }}</th>
            <td>{{ post.date | formatDate }}</td>
            <td>
              <a @click="editPost(post)" class="mr-1">
                <mdb-icon icon="edit" />
              </a>
              <a @click="deletePost(post.id)" class="ml-1">
                <mdb-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-12 text-center">
        <mdb-btn
          :class="{ 'd-none': pageNumber == 0 }"
          @click="prevPage"
          color="primary"
        >
          <mdb-icon icon="angle-double-left" />
        </mdb-btn>
        <mdb-btn
          :class="{ 'd-none': pageNumber >= pageCount - 1 }"
          @click="nextPage"
          color="primary"
        >
          <mdb-icon icon="angle-double-right" />
        </mdb-btn>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { postsCollection } from "../../../firebase";
import { mdbInput, mdbBtn, mdbCollapse, mdbContainer, mdbIcon } from "mdbvue";

export default {
  data() {
    return {
      post: {
        title: "",
        desc: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
      },
      search: "",
      pageNumber: 0,
      msg: "",
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbCollapse,
    mdbContainer,
    mdbIcon,
  },
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"];
    },
    pageCount() {
      let l = this.posts.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  methods: {
    addPost() {
      let slugArry = [],
        newSlug = [],
        date = "";
      // create slug
      slugArry = this.post.title.split(" ");
      date = this.post.date;
      this.post.year = date.split("-")[0];

      slugArry.forEach((item) => {
        newSlug.push(item.toLowerCase());
      });

      this.post.slug = newSlug.join("-") + "-" + date;

      postsCollection
        .add({
          title: this.post.title,
          desc: this.post.desc,
          excerpt: this.post.excerpt,
          slug: this.post.slug,
          date: this.post.date,
          content: this.post.content,
          year: this.post.year,
          createdOn: new Date(),
        })
        .then(() => {
          this.post = {
            title: "",
            desc: "",
            excerpt: "",
            slug: "",
            date: "",
            content: "",
            year: "",
          };
          this.msg = {
            type: "success",
            message: "Post added",
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
    checkFile(event) {
      console.log(event);
    },
    submitForm() {
      this.addPost();
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    deletePost(id) {
      postsCollection
        .doc(id)
        .delete()
        .then(() => {
          this.msg = {
            type: "danger",
            message: "Post deleted",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((error) => {
          this.msg = {
            type: "warning",
            message: error.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    editPost(post) {
      console.log(post);
    },
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
