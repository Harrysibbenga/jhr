<template>
  <div>
    <mdb-container>
      <mdb-row>
        <form @submit.prevent="submitForm">
          <mdb-col class="text-center pt-2">
            <img v-if="carousel.url" :src="carousel.url" :alt="img.alt" class="img-fluid" />

            <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />

            <div class>
              <mdb-btn color="primary" class="ml-3" inline @click="newImage">Add image</mdb-btn>
              <mdb-btn color="primary" class="ml-3" inline type="submit">Save</mdb-btn>
            </div>
          </mdb-col>
        </form>
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

    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col class="col-4" v-for="(carouselImage, index) in carouselList" :key="index">
          <img :src="carouselImage.url" :alt="carouselImage.alt" class="img-fluid" />
          <div class="text-center">
            <a @click="editItem(carouselImage)" class="mr-1">
              <mdb-icon icon="edit" />
            </a>
            <a @click="deleteItem(carouselImage)" class="ml-1">
              <mdb-icon icon="trash-alt" />
            </a>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <!-- editModel  -->
    <mdb-modal top position="top" fullHeight direction="top" :show="editModal" @close="cancelEdit">
      <mdb-modal-header>
        <mdb-modal-title>{{ clickedItem.name }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent class="p-2">
          <img
            v-if="clickedItem.url"
            :src="clickedItem.url"
            class="img-fluid"
            :alt="clickedItem.alt"
          />
          <mdb-btn @click="changeImage" color="primary">Change image</mdb-btn>
        </form>
      </mdb-modal-body>
      <mdb-container>
        <transition name="fade">
          <div
            v-if="editMsg.message != ''"
            :class="`bg-${editMsg.type}`"
            class="pl-5 mt-2 text-white text-center"
          >
            <p>{{ editMsg.message }}</p>
          </div>
        </transition>
      </mdb-container>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelEdit">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveEdit">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger">Are you sure you want to delete this image from the list</span>
        {{ toDeleteItem.name }}
        <mdb-btn color="secondary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="danger" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- existsModal -->
    <mdb-modal size="md" :show="existsModal" @close="existsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Image exists with that name</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row col-12 col-md-6 col-lg-4 py-3">
          <p>Would you like to use this one ?</p>
        </div>
        <img :src="img.content.url" :alt="img.content.alt" class="img-fluid" />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="declineUse">No</mdb-btn>
        <mdb-btn color="primary" size="sm" @click="confirmUse">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- uploadImage -->
    <mdb-modal size="md" :show="uploadImage" @close="closeImageUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input label="Description" inline v-model.trim="img.alt" />
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
                  id="imageInput"
                  aria-describedby="imageInput"
                  @change="checkFile($event)"
                  ref="imageInput"
                  accept="image/jpeg image/png"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                >{{ file.name }}</label>
                <label class="custom-file-label" for="inputGroupFile01" v-else>Image</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeImageUpload">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" :disabled="img.alt == ''" @click="saveFile(type)">Save</mdb-btn>
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
import moment from "moment";
import { carouselCollection, imageCollection } from "../../../firebase";
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
      clickedItem: {
        name: "",
        alt: "",
        url: "",
        id: "",
        imgId: "",
      },
      carousel: {
        name: "",
        alt: "",
        url: "",
        imgId: "",
      },
      toDeleteItem: {
        id: "",
        name: "",
        alt: "",
        url: "",
        imgId: "",
      },
      msg: {
        message: "",
        type: "",
      },
      editMsg: {
        message: "",
        type: "",
      },
      editModal: false,
      deleteModal: false,
      existsModal: false,
      uploadImage: false,
      file: "",
      img: {
        id: "",
        content: "",
        alt: "",
      },
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
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
    carouselList() {
      return this.$store.getters["carousel/getImages"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    updatedImage() {
      return this.$store.getters["images/getImage"];
    },
  },
  methods: {
    reset() {
      this.carousel = {
        name: "",
        alt: "",
        url: "",
        imgId: "",
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    addItem() {
      if (this.carousel.url == "") {
        this.carousel.url = this.defaultImage;
      }

      carouselCollection
        .add({
          name: this.carousel.name,
          createdOn: new Date(),
          imgId: this.carousel.imgId,
          url: this.carousel.url,
          alt: this.carousel.alt,
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Carousel item added",
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
    newImage() {
      this.uploadImage = true;
      this.type = "new";
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;
              return;
            }
          });
        });
    },
    saveFile() {
      if (this.type == "new") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.carousel.imgId = this.img.content.id;
          this.carousel.url = this.img.content.url;
          this.carousel.alt = this.img.alt;
          this.carousel.name = this.file.name;
          this.uploadImage = false;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }, 2000);
      } else if (this.type == "edit") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.clickedItem.imgId = this.img.content.id;
          this.clickedItem.url = this.img.content.url;
          this.clickedItem.alt = this.img.alt;
          this.clickedItem.name = this.file.name;
          this.uploadImage = false;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }, 2000);
      }
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    confirmUse() {
      if (this.type == "new") {
        this.carousel.imgId = this.img.id;
        this.existsModal = false;
        this.carousel.url = this.img.content.url;
        this.carousel.alt = this.img.content.alt;
        this.carousel.name = this.file.name;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      } else if (this.type == "edit") {
        this.clickedItem.imgId = this.img.id;
        this.existsModal = false;
        this.clickedItem.url = this.img.content.url;
        this.clickedItem.alt = this.img.content.alt;
        this.clickedItem.name = this.file.name;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      }
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    submitForm() {
      this.addItem();
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.toDeleteItem = {
        id: item.id,
        name: item.name,
        alt: item.alt,
        url: item.url,
        imgId: item.imgId,
      };
    },
    cancelDelete() {
      this.toDeleteItem = {
        id: "",
        name: "",
        alt: "",
        url: "",
        imgId: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      carouselCollection
        .doc(this.toDeleteItem.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Carousel item deleted",
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
    editItem(item) {
      this.editModal = true;
      this.clickedItem.id = item.id;
      this.clickedItem.name = item.name;
      this.clickedItem.url = item.url;
      this.clickedItem.imgId = item.imgId;
      this.clickedItem.alt = item.alt;
    },
    cancelEdit() {
      this.clickedItem = {
        name: "",
        alt: "",
        url: "",
        id: "",
        imgId: "",
      };
      this.editModal = false;
    },
    changeImage() {
      this.uploadImage = true;
      this.type = "edit";
    },
    saveEdit() {
      carouselCollection
        .doc(this.clickedItem.id)
        .update({
          name: this.clickedItem.name,
          createdOn: new Date(),
          imgId: this.clickedItem.imgId,
          url: this.clickedItem.url,
          alt: this.clickedItem.alt,
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Carousel item updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.editMsg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.editMsg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
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