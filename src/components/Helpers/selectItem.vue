<template>
    <div>
    <mdb-modal
      top
      position="top"
      fullHeight
      direction="top"
      :show="select"
      @close="closeSelect"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 p-0" v-for="(item, index) in items" :key="index">
              <div class="custom-control custom-radio custom-control-inline">
                <img :src="item.url" :alt="item.alt" class="img-fluid" />
                <input
                  type="radio"
                  name="circuits"
                  class="custom-control-input"
                  :id="item.id"
                  @click="selected(item)"
                />
                <label class="custom-control-label" :for="item.id">{{ item.title }}</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="closeSelect">Close</mdb-btn>
        <mdb-btn color="primary" @click="confirmSelect">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </div>
</template>

<script>
import {
  mdbBtn,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        items: {
            type: Array,
            default: () => []
        },
        select: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            object: {}
        }
    },
    methods: {
        selected(item) {
            this.object = item
        },
        confirmSelect() {
            this.$emit('update:item', this.object)
            this.$emit('update:select', false)
            this.item = '';
        },
        closeSelect() {
            this.object = '',
            this.$emit('update:select', false)
        }
    },
    components: {
        mdbBtn,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
        mdbModal,
  }
}
</script>