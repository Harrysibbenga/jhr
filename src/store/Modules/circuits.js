import {
    circuitsCollection
} from "../../../firebase"

const circuits = {
    namespaced: true,
    state: {
        circuit: '',
        circuits: [],
    },
    mutations: {
        setCircuit(state, val) {
            state.circuit = val;
        },
        setCircuits(state, val) {
            state.circuits = val;
        }
    },
    actions: {
        setCircuit({
            commit
        }, id) {
            circuitsCollection
                .doc(id)
                .get()
                .then(doc => {
                    let circuit = doc.data();
                    commit("setCircuit", circuit)
                })
        },
        setCircuits({
            commit
        }) {
            circuitsCollection.orderBy("title", "desc").onSnapshot((querySnapshot) => {
                let circuitsArray = [];

                querySnapshot.forEach((doc) => {
                    let circuit = doc.data();
                    circuit.id = doc.id;
                    circuitsArray.push(circuit);
                });
                commit("setCircuits", circuitsArray);
            });
        }
    },
    getters: {
        getCircuit(state) {
            return state.circuit
        },
        getCircuits(state) {
            return state.circuits
        }
    }
}

export default circuits