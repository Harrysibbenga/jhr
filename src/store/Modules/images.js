import {
    imageCollection,
    storage
} from "../../../firebase";

import store from "../store";

const images = {
    namespaced: true,
    state: {
        image: {},
        msg: {}
    },
    mutations: {
        setImage(state, val) {
            state.image = val
        },
        setMsg(state, val) {
            state.msg = val
        }
    },
    actions: {
        uploadImage({
            commit
        }, payload) {
            let file = payload.file
            let alt = payload.alt
            let storageRef = storage.ref("images/" + file.name);
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
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        imageCollection
                            .add({
                                name: file.name,
                                createdOn: new Date(),
                                url: downloadURL,
                                alt: alt
                            })
                            .then(doc => {
                                let id = doc.id
                                imageCollection
                                    .doc(id)
                                    .get()
                                    .then(doc => {
                                        let img = doc.data()
                                        img.id = id
                                        commit("setImage", img)
                                    })
                                    .then(() => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "success",
                                            message: "Image sucssesfully uploaded to storage"
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    })
                                    .catch(err => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "warning",
                                            message: err.message
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    });
                            })
                            .catch(err => {
                                store.dispatch("global/setLoading", false);
                                let msg = {
                                    type: "warning",
                                    message: err.message
                                }
                                commit("setMsg", msg)
                                setTimeout(() => {
                                    commit("setMsg", {})
                                }, 8000)
                            });
                    });
                }
            );
        },
        overwriteImage({
            commit
        }, file, alt, name) {

            filename = name

            let storageRef = storage.ref("images/" + filename),
                uploadTask = storageRef.put(file),
                filename = '';

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
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        imageCollection
                            .add({
                                name: filename,
                                createdOn: new Date(),
                                url: downloadURL,
                                alt: alt
                            })
                            .then(doc => {
                                let id = doc.id
                                imageCollection
                                    .doc(id)
                                    .get()
                                    .then(doc => {
                                        let img = doc.data()
                                        img.id = id
                                        commit("setImage", img)
                                    })
                                    .then(() => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "success",
                                            message: "Image sucssesfully uploaded to storage"
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    })
                                    .catch(err => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "warning",
                                            message: err.message
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    });
                            })
                            .catch(err => {
                                store.dispatch("global/setLoading", false);
                                let msg = {
                                    type: "warning",
                                    message: err.message
                                }
                                commit("setMsg", msg)
                                setTimeout(() => {
                                    commit("setMsg", {})
                                }, 8000)
                            });
                    });
                }
            );
        }
    },
    getters: {
        getImage(state) {
            return state.image
        },
        getMsg(state) {
            return state.msg
        }
    }
}

export default images