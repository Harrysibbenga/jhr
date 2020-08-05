<template>
  <div>
    <Header></Header>
    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-4 p-5 order-md-1 text-center">
          <h3 class="mx-5">Calendar</h3>
          <div class="d-flex flex-column px-5 pt-1">
            <div v-for="(fixture,index) in fixtures" :key="index">
              <p class="date">{{ fixture.date|formatDate }}</p>
              <h5 class="track">{{fixture.circuit.title}}</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8 bg-white p-md-5 order-md-0">
          <div class="p-5">
            <h3 class="pb-4">BRDC British F3 Championship:</h3>
            <p
              class="mt-3"
            >The BRDC British F3 Championship returns in 2019 with 24 races across eight events, seven of which remain co-headliners with British GT. Each weekend features a 30-minute qualifying session and three 20-minute races, with the grid for race one set by qualifying order, race two by a true-reverse grid, and race three from the fastest laps from the first two contests.</p>
            <p
              class="mt-3"
            >Points are scored from 35 for a win, to one for 20th position for races one and three, while in the reverse grid race two, points are scored from 20 for a win to one for 15th place. In addition, points in this race are also awarded for positions gained, providing an opportunity for talented drivers to make a real difference.</p>
            <p
              class="mt-3"
            >The Championship races with the Tatuus F4-016 car, which is powered by a 230bhp Cosworth engine. An improved aerodynamic set-up includes a highly adjustable front-wing and two-piece rear-wing, and an F1-style front splitter and rear diffuser.</p>
            <p
              class="mt-3"
            >The car features a six-speed sequential gearbox with paddle shift provided by Sadev and is fitted with a limited-slip differential. Drivers race on Pirelli tyres, with brakes provided by AP Racing. The twin wishbone suspension with two-way adjustable dampers and adjustable front and rear anti-roll bars provides drivers with plenty of scope for set-up changes.</p>
            <p
              class="mt-3"
            >BRDC F3 has a media partnership with world-leading motorsport publication Autosport, providing unrivalled media coverage not only of race weekends, but also with regular news features and updates. Championship graduates include 2019 Formula 1 World Championship drivers Lando Norris and George Russell, and 2018 FIA Formula 3 European Championship race-winners Dan Ticktum and Enaam Ahmed.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    fixtures() {
      return this.$store.getters["formula3/getFixtures"];
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    }
  }
};
</script>