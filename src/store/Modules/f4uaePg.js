import { f4uaePg } from "../../../firebase";
const f4uaePage = {
  namespaced: true,
  state: {
    content: {},
  },
  mutations: {
    setContent(state, val) {
      state.content = val;
    },
  },
  actions: {
    setContent({ commit }) {
      f4uaePg.onSnapshot((querySnapshot) => {
        let contentArray = [];

        querySnapshot.forEach((doc) => {
          let content = doc.data();
          content.id = doc.id;
          contentArray.push(content);
        });
        commit("setContent", contentArray[0]);
      });
    },
  },
  getters: {
    getContent(state) {
      return state.content;
    },
  },
};

export default f4uaePage;
