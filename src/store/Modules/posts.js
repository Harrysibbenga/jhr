import { postsCollection } from "../../../firebase";
import moment from "moment";

const posts = {
  namespaced: true,
  state: {
    allPosts: [],
    post: null,
    publishedPosts: [],
    postsByYear: [],
  },
  mutations: {
    setPosts(state, val) {
      if (val) {
        state.allPosts = val;
      } else {
        state.allPosts = [];
      }
    },
    setPostsByYear(state, val) {
      if (val) {
        state.postsByYear = val;
      } else {
        state.postsByYear = [];
      }
    },
    setPost(state, val) {
      if (val) {
        state.post = val;
      } else {
        state.post = null;
      }
    },
    setPublishedPosts(state, val) {
      if (val) {
        state.publishedPosts = val;
      } else {
        state.publishedPosts = null;
      }
    },
    clearPost(state) {
      state.post = null;
    },
    clearPosts(state) {
      state.allPosts = null;
    },
  },
  actions: {
    setPost({ commit }, id) {
      postsCollection
        .doc(id)
        .get()
        .then((doc) => {
          let post = doc.data();
          commit("setPost", post);
        });
    },
    setPostSlug({ commit }, slug) {
      postsCollection.where("slug", "==", slug).onSnapshot((doc) => {
        doc.forEach((doc) => {
          let post = doc.data();
          post.id = doc.id;
          commit("setPost", post);
        });
      });
    },
    setPosts({ commit }) {
      postsCollection.orderBy("date", "desc").onSnapshot((querySnapshot) => {
        let now = moment().format();
        let postsArray = [];

        querySnapshot.forEach((doc) => {
          let post = doc.data();
          post.id = doc.id;
          if (!post.published) {
            postsCollection
              .doc(doc.id)
              .update({
                published: now,
              })
              .then(function() {
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                console.error("Error updating document: ", error);
              });
          }
          if (!post.gallery) {
            postsCollection.doc(post.id).update({
              gallery: [],
            });
          }
          if (!post.quoteContent) {
            postsCollection.doc(post.id).update({
              quoteContent: "",
            });
          }
          postsArray.push(post);
        });
        commit("setPosts", postsArray);
        commit(
          "setPublishedPosts",
          postsArray.filter((post) => now >= post.published)
        );
      });
    },
    setPostsByYear({ commit }, year) {
      postsCollection
        .where("year", "==", year)
        .orderBy("date", "desc")
        .onSnapshot((doc) => {
          let postsArray = [];

          doc.forEach((doc) => {
            let post = doc.data();
            post.id = doc.id;
            postsArray.push(post);
          });
          commit("setPostsByYear", postsArray);
        });
    },
  },
  getters: {
    getPost(state) {
      return state.post;
    },
    getPosts(state) {
      return state.allPosts;
    },
    getPostsByYear(state) {
      return state.postsByYear;
    },
    getPublishedPosts(state) {
      return state.publishedPosts;
    },
  },
};

export default posts;
