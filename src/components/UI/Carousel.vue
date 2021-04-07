<template>
  <hooper :settings="hooperSettings" style="height:400px">
    <slide v-for="(fixture,index) in calendar" :key="index">
        <div class="col-12 flex-column flex-center my-2">
            <img
                :src="fixture.circuit.url"
                :alt="fixture.circuit.alt"
                class="img-fluid d-none d-md-block"
            />
            <div class="mask rgba-black-strong"></div>
            <div class="border border-light w-100 text-center text-white pt-3">
                <h5 class="track">{{ fixture.circuit.title }}</h5>
                <p class="date">{{ fixture.date|formatDate }}</p>
            </div>
        </div>
    </slide>
  </hooper>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import moment from "moment";

export default {
  name: 'CalenderCarousel',
  components: {
    Hooper,
    Slide
  },
  props: {
      calendar:{
          type: Array,
          default: () => [],
      }
  },
  data() {
      return {
        hooperSettings: {
          breakpoints: {
            300: {
              itemsToShow: 2.5,
            },
            960: {
              itemsToShow: 3.5,
            },
        }
      },
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>