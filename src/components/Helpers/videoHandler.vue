<template>
    <div>

            <mdb-col>
                <video 
                    width="100%"
                    height="100%"
                    autoplay
                    controls="controls"
                    muted 
                    v-if="vid.url"
                >
                    <source :src="vid.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video> 
                <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
            </mdb-col>
            <mdb-col class="pt-2">
                <mdb-btn color="primary" class="ml-0" @click.native="addVideo = true">Add</mdb-btn>
                <mdb-btn color="secondary" @click.native="selectVideo = true">Select</mdb-btn>
            </mdb-col>
            <helpers-add-video :uploadVideo.sync="addVideo" :video.sync="vid"></helpers-add-video>
            <helpers-select-video :select.sync="selectVideo" :item.sync="vid" :items.sync="videoList"></helpers-select-video>
    </div>
</template>

<script>
import {mdbCol, mdbBtn} from "mdbvue"

export default {
    components: {
        mdbCol,
        mdbBtn
    },
    props: {
        video : {
            type: Object,
            default: () => {}
        },
        videoList : {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            addVideo: false,
            selectVideo: false,
            defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
        }
    },
    computed: {
        vid: {
            get() {
                return this.video
            },
            set(newVal) {
                this.$emit('update:video', newVal)
            }
        }
    }
}
</script>