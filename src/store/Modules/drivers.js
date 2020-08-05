import {
    driversCollection
} from "../../../firebase";

const drivers = {
    namespaced: true,
    state: {
        allDrivers: [],
        driver: null,
    },
    mutations: {
        setDrivers(state, val) {
            if (val) {
                state.allDrivers = val;
            } else {
                state.allDrivers = [];
            }
        },
        setDriver(state, val) {
            if (val) {
                state.driver = val;
            } else {
                state.driver = null;
            }
        },
        clearDriver(state) {
            state.driver = null;
        },
        clearDrivers(state) {
            state.allDrivers = null;
        },
    },
    actions: {
        setDriver({
            commit
        }, id) {
            driversCollection
                .doc(id)
                .get()
                .then((doc) => {
                    let driver = doc.data();
                    commit("setDriver", driver);
                });
        },
        setDrivers({
            commit
        }) {
            driversCollection.orderBy("lastName").onSnapshot((querySnapshot) => {
                let driversArray = [];

                querySnapshot.forEach((doc) => {
                    let driver = doc.data();
                    driver.id = doc.id;
                    driversArray.push(driver);
                });
                commit("setDrivers", driversArray);
            });
        },
    },
    getters: {
        getDriver(state) {
            return state.driver;
        },
        getDrivers(state) {
            return state.allDrivers;
        }
    },
};

export default drivers;