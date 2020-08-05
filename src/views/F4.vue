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
            <h3 class="pb-4">F4 British Championship:</h3>
            <p
              class="mt-3"
            >The F4 British Championship continues the rich heritage of junior single-seater racing in the United Kingdom, helping young drivers develop the skills and abilities that they’ll need to progress to the highest levels of motorsport.</p>
            <p
              class="mt-3"
            >Run to FIA Formula 4 regulations, the series has support from the FIA, and features cars boasting the latest safety standards in a cost-controlled environment where anyone can succeed – not just those with the biggest budgets.</p>
            <p
              class="mt-3"
            >It is the only championship in the UK which is open to 15-year olds, and has strict engineering standards, with control tyres issued to teams. Data is available to drivers and shared each weekend, with development overseen by the MSA.</p>
            <p
              class="mt-3"
            >The championship winner is invited to the FIA prize-giving ceremony and MSA night of champions, while the top seven drivers score FIA Super License points – an important step as they hope to progress to a career in Formula 1.</p>
            <p
              class="mt-3"
            >Races are run on the popular BTCC package, with live television coverage in the UK and free online streaming. The programs are available on demand for 28 days after each broadcast, and the total UK TV audience is a staggering 17.2 million.</p>
            <p
              class="mt-3"
            >Some 385,000 fans pack the circuits across the country, while the official British F4 podcast received 118,000 downloads in 2016 alone. The official Facebook page has 16,000 likes, and Twitter 9,000 followers.</p>
            <p
              class="mt-3"
            >Each weekend features two 45-minute test sessions, one 20-minute qualifying period, and three 20-minute races; a total of 170 minutes of track time</p>
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
      return this.$store.getters["formula4/getFixtures"];
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