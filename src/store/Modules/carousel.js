import {
    carouselCollection
} from "../../../firebase"

const carousel = {
    namespaced: true,
    state: {
        images: []
    },
    mutations: {
        setImages(state, val) {
            state.images = val
        }
    },
    actions: {
        setImages({
            commit
        }) {
            carouselCollection.orderBy("createdOn").onSnapshot((querySnapshot) => {
                let imgArray = [];

                querySnapshot.forEach((doc) => {
                    let img = doc.data();
                    img.id = doc.id;
                    imgArray.push(img);
                });
                commit("setImages", imgArray);
            });
        }
    },
    getters: {
        getImages(state) {
            return state.images
        }
    }
}

export default carousel;