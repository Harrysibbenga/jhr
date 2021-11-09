import { gb3Collection } from "../../../firebase";
const gb3 = {
  namespaced: true,
  state: {
    fixtures: [],
    fixture: "",
  },
  mutations: {
    setFixture(state, val) {
      state.fixture = val;
    },
    setFixtures(state, val) {
      state.fixtures = val;
    },
  },
  actions: {
    setFixture({ commit }, id) {
      gb3Collection
        .doc(id)
        .get()
        .then((doc) => {
          let fixture = doc.data();
          fixture.id = doc.id;
          commit("setFixture", fixture);
        });
    },
    setFixtures({ commit }) {
      gb3Collection.orderBy("date").onSnapshot((querySnapshot) => {
        let fixturesArray = [];

        querySnapshot.forEach((doc) => {
          let fixture = doc.data();
          fixture.id = doc.id;
          fixturesArray.push(fixture);
        });
        commit("setFixtures", fixturesArray);
      });
    },
  },
  getters: {
    getFixture(state) {
      return state.fixture;
    },
    getFixtures(state) {
      return state.fixtures;
    },
  },
};

export default gb3;
