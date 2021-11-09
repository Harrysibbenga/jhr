import { videoCollection, storage } from "../../../firebase";

import store from "../store";

const videos = {
  namespaced: true,
  state: {
    video: {},
    videos: [],
    msg: {},
  },
  mutations: {
    setVideo(state, val) {
      state.video = val;
    },
    setVideos(state, val) {
      state.videos = val;
    },
    setMsg(state, val) {
      state.msg = val;
    },
  },
  actions: {
    uploadVideo({ commit }, payload) {
      let file = payload.file;
      let alt = payload.alt;
      let storageRef = storage.ref("videos/" + file.name);
      let uploadTask = storageRef.put(file);

      store.dispatch("global/setLoading", true);

      uploadTask.on(
        "state_changed",
        () => {
          // snapshot
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            videoCollection
              .add({
                name: file.name,
                createdOn: new Date(),
                url: downloadURL,
                alt: alt,
              })
              .then((doc) => {
                let id = doc.id;
                videoCollection
                  .doc(id)
                  .get()
                  .then((doc) => {
                    let img = doc.data();
                    img.id = id;
                    commit("setVideo", img);
                  })
                  .then(() => {
                    store.dispatch("global/setLoading", false);
                    let msg = {
                      type: "success",
                      message: "video sucssesfully uploaded to storage",
                    };
                    commit("setMsg", msg);
                    setTimeout(() => {
                      commit("setMsg", {});
                    }, 8000);
                  })
                  .catch((err) => {
                    store.dispatch("global/setLoading", false);
                    let msg = {
                      type: "warning",
                      message: err.message,
                    };
                    commit("setMsg", msg);
                    setTimeout(() => {
                      commit("setMsg", {});
                    }, 8000);
                  });
              })
              .catch((err) => {
                store.dispatch("global/setLoading", false);
                let msg = {
                  type: "warning",
                  message: err.message,
                };
                commit("setMsg", msg);
                setTimeout(() => {
                  commit("setMsg", {});
                }, 8000);
              });
          });
        }
      );
    },
    // eslint-disable-next-line no-empty-pattern
    singleUpload({}, payload) {
      return new Promise((resolve, reject) => {
        let file = payload.file;
        let alt = payload.alt;
        let storageRef = storage.ref("videos/" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          () => {
            // snapshot
          },
          () => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              videoCollection
                .add({
                  name: file.name,
                  createdOn: new Date(),
                  url: downloadURL,
                  alt: alt,
                })
                .then((doc) => {
                  let id = doc.id;
                  videoCollection
                    .doc(id)
                    .get()
                    .then((doc) => {
                      let img = doc.data();
                      img.id = id;
                      resolve(img);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            });
          }
        );
      });
    },
    setVideos({ commit }) {
      videoCollection
        .orderBy("createdOn", "desc")
        .onSnapshot((querySnapshot) => {
          let videosArray = [];

          querySnapshot.forEach((doc) => {
            let video = doc.data();
            video.id = doc.id;
            videosArray.push(video);
          });
          commit("setVideos", videosArray);
        });
    },
  },
  getters: {
    getVideo(state) {
      return state.video;
    },
    getVideos(state) {
      return state.videos;
    },
    getMsg(state) {
      return state.msg;
    },
  },
};

export default videos;
