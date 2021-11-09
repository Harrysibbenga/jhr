<template>
  <div>
    <form @submit.prevent="submitForm" class="pt-2 d-flex flex-column">
      <mdb-container>
        <mdb-row>
          <mdb-col class="col-12 text-center pb-3 pt-2">
            <h3 class="pb-3">Driver Images</h3>
            <mdb-container fluid>
              <mdb-row>
                <mdb-col class="col-3">
                  <helpers-image-handler :image.sync="headline" :imageList="images" :type="'headline image'"></helpers-image-handler>
                </mdb-col>
                <mdb-col class="col-3">
                  <helpers-image-handler :image.sync="social.img" :imageList="images" :type="'social image'"></helpers-image-handler>
                </mdb-col>
                <mdb-col class="col-3">
                  <helpers-image-handler :image.sync="career.img" :imageList="images" :type="'career image'"></helpers-image-handler>
                </mdb-col>
                <mdb-col class="col-3">
                  <helpers-image-handler :image.sync="bio.img" :imageList="images" :type="'bio image'"></helpers-image-handler>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-col>

          <mdb-col class="col-12">
            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="First Name" inline v-model.trim="firstName" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Last Name" inline v-model.trim="lastName" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="Lives" inline v-model.trim="lives" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="DOB" inline v-model.trim="dob" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="Race number" inline v-model.trim="raceNumber" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Sponsors" inline v-model.trim="sponsors" />
              </div>
            </div>
          </mdb-col>

          <mdb-col class="col-12 text-center pb-4">
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Facebook link</span>
              <mdb-input slot="body" label="Facebook link" v-model="social.platforms.facebook"></mdb-input>
              <mdb-btn slot="reference">Facebook</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">insta link</span>
              <mdb-input slot="body" label="insta link" v-model="social.platforms.insta"></mdb-input>
              <mdb-btn slot="reference">insta</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Twitter link</span>
              <mdb-input slot="body" label="Twitter link" v-model="social.platforms.twitter"></mdb-input>
              <mdb-btn slot="reference">Twitter</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Google+ link</span>
              <mdb-input slot="body" label="Gplus link" v-model="social.platforms.gplus"></mdb-input>
              <mdb-btn slot="reference">Google+</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Twitch link</span>
              <mdb-input slot="body" label="Twitch link" v-model="social.platforms.twitch"></mdb-input>
              <mdb-btn slot="reference">Twitch</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Pinterest link</span>
              <mdb-input slot="body" label="Pinterest link" v-model="social.platforms.pinterest"></mdb-input>
              <mdb-btn slot="reference">Pinterest</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Youtube link</span>
              <mdb-input slot="body" label="Youtube link" v-model="social.platforms.youtube"></mdb-input>
              <mdb-btn slot="reference">Youtube</mdb-btn>
            </mdb-popover>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Career Highlights</h3>
            <app-editor2 :content.sync="career.content"></app-editor2>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Bio</h3>
            <app-editor2 :content.sync="bio.content"></app-editor2>
          </mdb-col>
        </mdb-row>
        <mdb-col class="col-12 pt-3">
          <mdb-btn type="submit">Add Driver</mdb-btn>
        </mdb-col>
      </mdb-container>
    </form>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

    <mdb-container fluid class="pt-5">
      <mdb-row>
        <mdb-col>
          <table class="table">
            <thead class="black text-white">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">DOB</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(driver, index) in paginatedData" :key="index">
                <th scope="row">{{ driver.firstName }} {{ driver.lastName }}</th>
                <td>{{ driver.dob }}</td>
                <td>
                  <a @click="editDriver(driver)" class="mr-1">
                    <mdb-icon icon="edit" />
                  </a>
                  <a @click="deleteDriver(driver)" class="ml-1">
                    <mdb-icon icon="trash-alt" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </mdb-col>
        <mdb-col class="col-12 text-center">
          <mdb-btn :class="{ 'd-none': pageNumber == 0 }" @click="prevPage" color="primary">
            <mdb-icon icon="angle-double-left" />
          </mdb-btn>
          <mdb-btn
            :class="{ 'd-none': pageNumber >= pageCount - 1 }"
            @click="nextPage"
            color="primary"
          >
            <mdb-icon icon="angle-double-right" />
          </mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger">Are you sure you want to delete this driver</span>
        {{ toDeleteDriver.firstName }} {{ toDeleteDriver.lastName }}
        <mdb-btn color="secondary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="danger" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- edit modal  -->
    <mdb-modal top position="top" fullHeight direction="top" :show="editModal" @close="cancelEdit">
      <mdb-modal-header>
        <mdb-modal-title>{{ clickedDriver.firstName }} {{ clickedDriver.lastName }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container fluid>
          <mdb-row>
            <mdb-col class="col-12 text-center pb-3 pt-2">
              <h3 class="pb-3">Driver Images</h3>
              <mdb-container fluid>
                <mdb-row>
                  <mdb-col class="col-3">
                    <helpers-image-handler :image.sync="clickedDriver.headline" :imageList="images" :type="'headline image'"></helpers-image-handler>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <helpers-image-handler :image.sync="clickedDriver.social.img" :imageList="images" :type="'social image'"></helpers-image-handler>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <helpers-image-handler :image.sync="clickedDriver.career.img" :imageList="images" :type="'career image'"></helpers-image-handler>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <helpers-image-handler :image.sync="clickedDriver.bio.img" :imageList="images" :type="'bio image'"></helpers-image-handler>
                  </mdb-col>
                </mdb-row>
              </mdb-container>
            </mdb-col>

            <mdb-col class="col-12">
              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="First Name" inline v-model.trim="clickedDriver.firstName" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="Last Name" inline v-model.trim="clickedDriver.lastName" />
                </div>
              </div>

              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="Lives" inline v-model.trim="clickedDriver.lives" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="DOB" inline v-model.trim="clickedDriver.dob" />
                </div>
              </div>

              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="Race number" inline v-model.trim="clickedDriver.raceNumber" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="Sponsors" inline v-model.trim="clickedDriver.sponsors" />
                </div>
              </div>
            </mdb-col>

            <mdb-col class="col-12 text-center pb-4">
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Facebook link</span>
                <mdb-input
                  slot="body"
                  label="Facebook link"
                  v-model="clickedDriver.social.platforms.facebook"
                ></mdb-input>
                <mdb-btn slot="reference">Facebook</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Instagram link</span>
                <mdb-input
                  slot="body"
                  label="Instagram link"
                  v-model="clickedDriver.social.platforms.insta"
                ></mdb-input>
                <mdb-btn slot="reference">Instagram</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Twitter link</span>
                <mdb-input
                  slot="body"
                  label="Twitter link"
                  v-model="clickedDriver.social.platforms.twitter"
                ></mdb-input>
                <mdb-btn slot="reference">Twitter</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Google+ link</span>
                <mdb-input
                  slot="body"
                  label="Gplus link"
                  v-model="clickedDriver.social.platforms.gplus"
                ></mdb-input>
                <mdb-btn slot="reference">Google+</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Twitch link</span>
                <mdb-input
                  slot="body"
                  label="Twitch link"
                  v-model="clickedDriver.social.platforms.twitch"
                ></mdb-input>
                <mdb-btn slot="reference">Twitch</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Pinterest link</span>
                <mdb-input
                  slot="body"
                  label="Pinterest link"
                  v-model="clickedDriver.social.platforms.pinterest"
                ></mdb-input>
                <mdb-btn slot="reference">Pinterest</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Youtube link</span>
                <mdb-input
                  slot="body"
                  label="Youtube link"
                  v-model="clickedDriver.social.platforms.youtube"
                ></mdb-input>
                <mdb-btn slot="reference">Youtube</mdb-btn>
              </mdb-popover>
            </mdb-col>

            <mdb-col class="col-6">
              <h3 class="text-center">Career Highlights</h3>
              <app-editor2 :content.sync="clickedDriver.career.content"></app-editor2>
            </mdb-col>

            <mdb-col class="col-6">
              <h3 class="text-center">Bio</h3>
              <app-editor2 :content.sync="clickedDriver.bio.content"></app-editor2>
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelEdit">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveEdit">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import { driversCollection } from "../../../firebase";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbPopover,
  mdbIcon,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
  data() {
    return {
      bio: {
        img: {
          url: "",
          alt: "",
        },
        content: "",
      },
      firstName: "",
      lastName: "",
      lives: "",
      dob: "",
      raceNumber: "",
      sponsors: "",
      headline: {
        url: "",
        alt: "",
      },
      career: {
        img: {
          url: "",
          alt: "",
        },
        content: "",
      },
      social: {
        img: {
          url: "",
          alt: "",
        },
        platforms: {
          facebook: "",
          website: "",
          twitter: "",
          gplus: "",
          insta: "",
          twitch: "",
          pinterest: "",
          youtube: "",
        },
      },
      toDeleteDriver: {
        id: "",
        firstName: "",
        lastName: "",
      },
      clickedDriver: {
        id: "",
        bio: {
          img: {
            url: "",
            alt: "",
          },
          content: "",
        },
        firstName: "",
        lastName: "",
        lives: "",
        dob: "",
        raceNumber: "",
        sponsors: "",
        headline: {
          url: "",
          alt: "",
        },
        career: {
          img: {
            url: "",
            alt: "",
          },
          content: "",
        },
        social: {
          img: {
            url: "",
            alt: "",
          },
          platforms: {
            facebook: "",
            website: "",
            twitter: "",
            gplus: "",
            insta: "",
            twitch: "",
            pinterest: "",
            youtube: "",
          },
        },
      },
      img: {
        id: "",
        content: "",
        alt: "",
      },
      msg: "",
      edit: false,
      pageNumber: 0,
      file: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
      existsModal: false,
      deleteModal: false,
      editModal: false,
      uploadImage: false,
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
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbPopover,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
  },
  computed: {
    drivers() {
      return this.$store.getters["drivers/getDrivers"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    updatedImage() {
      return this.$store.getters["images/getImage"];
    },
    pageCount() {
      let l = this.drivers.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.drivers.slice(start, end);
    },
    images() {
      return this.$store.getters['images/getImages']
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    reset() {
      this.bio = {
        img: {
          url: "",
          alt: "",
        },
        content: ""
      };
      this.firstName = "";
      this.lastName = "";
      this.lives = "";
      this.dob = "";
      this.raceNumber = "";
      this.sponsors = "";
      this.headline = {
        url: "",
        alt: "",
      };
      this.career = {
        img: {
          url: "",
          alt: "",
        },
        content: "",
      };
      this.social = {
        img: {
          url: "",
          alt: "",
        },
        imgId: "",
      };
      this.social.platforms = {
        facebook: "",
        website: "",
        twitter: "",
        gplus: "",
        insta: "",
        twitch: "",
        pinterest: "",
        youtube: "",
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    addDriver() {
      if (this.headline.url == "") {
        this.headline.url = this.defaultImage;
        this.headline.alt = "Placeholder image";
        this.headline.imgId = "";
      }
      if (this.social.url == "") {
        this.social.url = this.defaultImage;
        this.social.alt = "Placeholder image";
        this.social.imgId = "";
      }
      if (this.bio.url == "") {
        this.bio.url = this.defaultImage;
        this.bio.alt = "Placeholder image";
        this.bio.imgId = "";
      }
      if (this.career.url == "") {
        this.career.url = this.defaultImage;
        this.career.alt = "Placeholder image";
        this.career.imgId = "";
      }
      driversCollection
        .add({
          bio: {
            url: this.bio.img.url,
            alt: this.bio.img.alt,
            content: this.bio.content
          },
          firstName: this.firstName,
          lastName: this.lastName,
          lives: this.lives,
          dob: this.dob,
          raceNumber: this.raceNumber,
          sponsors: this.sponsors,
          headline: {
            url: this.headline.url,
            alt: this.headline.alt,
          },
          career: {
            url: this.career.img.url,
            alt: this.career.img.alt,
            content: this.career.content
          },
          social: {
            url: this.social.img.url,
            alt: this.social.img.alt,
            platforms: this.social.platforms
          }
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Driver added",
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
      if (this.dob == "" || this.firstName == "" || this.lastName == "") {
        this.msg = {
          type: "warning",
          message: "Missing information check the form is completely filled",
        };
        setTimeout(() => {
          this.msg = {
            type: "",
            message: "",
          };
        }, 2000);
      } else {
        this.addDriver();
      }
    },
    editDriver(driver) {
      this.clickedDriver = {
        id: driver.id,
        bio: {
          img: {
            url: driver.bio.url,
            alt: driver.bio.alt,
          },
          content: driver.bio.content,
        },
        firstName: driver.firstName,
        lastName: driver.lastName,
        lives: driver.lives,
        dob: driver.dob,
        raceNumber: driver.raceNumber,
        sponsors: driver.sponsors,
        headline: {
          url: driver.headline.url,
          alt: driver.headline.alt,
        },
        career: {
          img: {
            url: driver.career.url,
            alt: driver.career.alt,
          },
          content: driver.career.content,
        },
        social: {
          img: {
            url: driver.social.url,
            alt: driver.social.alt,
          },
          platforms: {
            facebook: driver.social.platforms.facebook,
            website: driver.social.platforms.website,
            twitter: driver.social.platforms.twitter,
            gplus: driver.social.platforms.gplus,
            insta: driver.social.platforms.insta,
            twitch: driver.social.platforms.twitch,
            pinterest: driver.social.platforms.pinterest,
            youtube: driver.social.platforms.youtube,
          },
        },
      };
      this.editModal = true;
    },
    cancelEdit() {
      this.clickedDriver = {
        id: "",
        bio: {
          img: {
            url: "",
            alt: "",
          },
          content: "",
        },
        firstName: "",
        lastName: "",
        lives: "",
        dob: "",
        raceNumber: "",
        sponsors: "",
        headline: {
          url: "",
          alt: "",
        },
        career: {
          img: {
            url: "",
            alt: "",
          },
          content: "",
        },
        social: {
          img: {
            url: "",
            alt: "",
          },
          content: "",
          platforms: {
            facebook: "",
            website: "",
            twitter: "",
            gplus: "",
            insta: "",
            twitch: "",
            pinterest: "",
            youtube: "",
          },
        },
      };
      this.editModal = false;
      this.edit = false;
    },
    saveEdit() {
      driversCollection
        .doc(this.clickedDriver.id)
        .update({
          bio: {
            url: this.clickedDriver.bio.img.url,
            alt: this.clickedDriver.bio.img.alt,
            content: this.clickedDriver.bio.content
          },
          firstName: this.clickedDriver.firstName,
          lastName: this.clickedDriver.lastName,
          lives: this.clickedDriver.lives,
          dob: this.clickedDriver.dob,
          raceNumber: this.clickedDriver.raceNumber,
          sponsors: this.clickedDriver.sponsors,
          headline: {
            url: this.clickedDriver.headline.url,
            alt: this.clickedDriver.headline.alt,
          },
          career: {
            url: this.clickedDriver.career.img.url,
            alt: this.clickedDriver.career.img.alt,
            content: this.clickedDriver.career.content
          },
          social: {
            url: this.clickedDriver.social.img.url,
            alt: this.clickedDriver.social.img.alt,
            platforms: this.clickedDriver.social.platforms
          }
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Driver updated",
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
    deleteDriver(driver) {
      this.deleteModal = true;
      this.toDeleteDriver.firstName = driver.firstName;
      this.toDeleteDriver.lastName = driver.lastName;
      this.toDeleteDriver.id = driver.id;
    },
    cancelDelete() {
      this.toDeleteDriver = {
        id: "",
        lastName: "",
        firstName: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      driversCollection
        .doc(this.toDeleteDriver.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Driver deleted",
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
  },
};
</script>