<template>
  <div>
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
                <span class="input-group-text" id="imageInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="videoInput"
                  aria-describedby="videoInput"
                  ref="videoInput"
                  @change="checkFile($event)"
                  accept="video/mp4"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                >{{ file.name }}</label>
                <label class="custom-file-label" for="inputGroupFile01" v-else>Video</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeVideoUpload">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" :disabled="vid.alt == ''" @click="saveFile()">Save</mdb-btn>
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
import {
  mdbInput,
  mdbBtn,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
  data() {
    return {
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
  props: {
      uploadVideo: {
          type: Boolean,
          default: false
      },
      video: {
          type: Object,
          default: () => {}
      }
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
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
    saveFile() {
      let payload = {};
      payload.file = this.file;
      payload.alt = this.vid.alt;
      this.$store.dispatch("videos/singleUpload", payload).then((vid) => {
        this.$emit('update:video', vid)
      })
      setTimeout(() => {
        this.$emit('update:uploadVideo', false)
        this.file = "";
        this.img.alt = "";
      }, 2000);
    },
    checkFile(event) {
      this.file = event.target.files[0];
    },
    closeVideoUpload() {
      this.$emit('update:uploadVideo', false)
      this.file = "";
      this.vid.alt = "";
    },
  },
};
</script>