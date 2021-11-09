<template>
    <div>

            <mdb-col>
                <img v-if="img.url" :src="img.url" :alt="img.alt" class="img-fluid"/>
                <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
            </mdb-col>
            <mdb-col class="pt-2">
                <mdb-btn color="primary" class="ml-0" @click.native="addImage = true">{{ 'New ' + type}}</mdb-btn>
                <mdb-btn color="secondary" @click.native="selectImage = true">{{ 'Select ' + type }}</mdb-btn>
            </mdb-col>
            <helpers-add-image :uploadImage.sync="addImage" :image.sync="img"></helpers-add-image>
            <helpers-select-item :select.sync="selectImage" :item.sync="img" :items.sync="imageList"></helpers-select-item>
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
        image : {
            type: Object,
            default: () => {}
        },
        imageList : {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            addImage: false,
            selectImage: false,
            defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
        }
    },
    computed: {
        img: {
            get() {
                return this.image
            },
            set(newVal) {
                this.$emit('update:image', newVal)
            }
        }
    }
}
</script>