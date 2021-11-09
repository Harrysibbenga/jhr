<template>
  <div id="calendar" class="bg-dark">
    <div class="container-fluid bg-dark padding">
      <div class="row">
        <div v-for="(item, index) in fixtureList" :key="index" class="col-12 col-md-6 col-lg-3 pt-5">
          <ui-fixture-card :fixture="item"></ui-fixture-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { cloneDeep } from "lodash"
import UiFixtureCard from "@/components/UI/fixtureCard";

export default {
  name: "Calendar",
  components: {
    UiFixtureCard,
  },
  computed: {
    f4uae() {
       const f4uae = {
        latest: this.getLatestFixture(this.$store.getters["f4uae/getFixtures"]),
        head: this.$store.getters['f4uaePg/getContent'].head,
        type: 'f4uae'
      } 
      return f4uae
    },
    f4brit() {
      const f4brit = {
        latest: this.getLatestFixture(this.$store.getters["f4brit/getFixtures"]),
        head: this.$store.getters['f4britPg/getContent'].head,
        type: 'f4brit'
      } 
      return f4brit
    },
    gb4() {
      const gb4 = {
        latest: this.getLatestFixture(this.$store.getters["gb4/getFixtures"]),
        head: this.$store.getters['gb4Pg/getContent'].head,
        type: 'gb4'
      } 
      return gb4
    },
    gb3() {
      const gb3 = {
        latest: this.getLatestFixture(this.$store.getters["gb3/getFixtures"]),
        head: this.$store.getters['gb3Pg/getContent'].head,
        type: 'gb3'
      } 
      return gb3
    },
    fixtureList() {
      return [this.gb3, this.gb4, this.f4brit, this.f4uae]
    }
  },
  methods: {
    getLatestFixture(fixtures) {
      const now = moment().format()
      const copy = cloneDeep(fixtures)
      let events = copy.filter(item => now <= moment(item.date).format())
      if (events.length <= 0) {
        return events = fixtures[-1]
      }
      console.log(events)
      return events[0]
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

<style scoped lang="scss">
a {
  font-size: 1.2rem;
  padding: 1rem 0;
  font-weight: 700;
}

a:hover,
.router-link-active {
  color: red !important;
}

.track {
  text-decoration: underline;
  font-size: 1rem;
}
.date {
  font-size: 1rem;
  font-weight: 400;
}
// .border.border-light.w-100.text-center {
//   z-index: 2;
// }
@media screen and (max-width: 767px) {
  .border {
    border: none !important;
  }
}
.padding {
  padding: 5rem;
}
</style>
