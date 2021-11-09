<template>
  <div>
    <div class="container text-center">
      <mdb-btn color="primary" class="ml-0" inline @click="newVideo">Add new video</mdb-btn>
    </div>
    <mdb-container fluid style="margin-bottom: 300px">
      <mdb-row>
        <mdb-col class="col-4" v-for="(video, index) in videoList" :key="index">
          <video 
              width="100%"
              height="100%"
              autoplay
              controls="controls"
              muted 
              class="position-relative"
          >
              <source :src="video.url" type="video/mp4">
              Your browser does not support the video tag.
          </video> 
          <p>name: {{ video.name }}</p>
          <p>alt: {{ video.alt }}</p>
          <div class="text-center">
            <a @click="deleteItem(video)">
              <mdb-icon icon="trash-alt" />
            </a>
          </div>
        </mdb-col>
      </mdb-row>
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

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span
          class="text-danger"
        >Are you sure you want to delete this video ? ( any documents that use this video will need to be changed )</span>
        {{ toDeleteItem.name }}
        <mdb-btn color="secondary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="danger" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- uploadVideo -->
    <mdb-modal size="md" :show="uploadVideo" @close="closeVideoUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload video</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input label="Description" inline v-model.trim="vid.alt" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="videoInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="videoInput"
                  aria-describedby="videoInput"
                  @change="checkFile($event)"
                  ref="videoInput"
                  accept="video/mp4"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                >{{ file.name }}</label>
                <label class="custom-file-label" for="inputGroupFile01" v-else>video</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeVideoUpload">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" :disabled="vid.alt == ''" @click="saveFile(type)">Save</mdb-btn>
      </mdb-modal-footer>
      <transition name="fade">
        <div
          v-if="uploadMsg.message != ''"
          :class="`bg-${uploadMsg.type}`"
          class="text-white text-center"
        >
          <p>{{ uploadMsg.message }}</p>
        </div>
      </transition>
    </mdb-modal>
  </div>
</template>

<script>
import { videoCollection } from "../../../firebase";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbCol,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
} from "mdbvue";
export default {
  data() {
    return {
      toDeleteItem: {
        id: "",
        name: "",
        alt: "",
        url: "",
      },
      deleteModal: false,
      uploadVideo: false,
      file: "",
      msg: {
        message: "",
        type: "",
      },
      vid: {
        alt: "",
      },
    };
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbCol,
    mdbRow,
  },
  computed: {
    videoList() {
      return this.$store.getters["videos/getVideos"];
    },
    uploadMsg() {
      return this.$store.getters["videos/getMsg"];
    },
  },
  methods: {
    newVideo() {
      this.uploadVideo = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      videoCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              let msg = {
                type: "warning",
                message: "Video with this name already exists",
              };
              this.$store.commit("videos/setMsg", msg);
              this.file = "";
              return;
            }
          });
        });
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.toDeleteItem = {
        id: item.id,
        name: item.name,
        alt: item.alt,
        url: item.url,
      };
    },
    cancelDelete() {
      this.toDeleteItem = {
        id: "",
        name: "",
        alt: "",
        url: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      videoCollection
        .doc(this.toDeleteItem.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "video deleted",
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
    saveFile() {
      let payload = {};
      payload.file = this.file;
      payload.alt = this.vid.alt;
      this.$store.dispatch("videos/uploadVideo", payload);
      setTimeout(() => {
        this.uploadVideo = false;
        this.file = "";
        this.vid.alt = "";
      }, 2000);
    },
    closeVideoUpload() {
      this.uploadVideo = false;
      this.file = "";
      this.vid.alt = "";
    },
  },
};
</script>