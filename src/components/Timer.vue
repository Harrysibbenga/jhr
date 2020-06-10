<template>
  <div>
    <div v-if="currentTime" class="timer bg-dark text-white">
      <div class="d-flex justify-content-around">
        <div class="align-self-center">
          <span>
            <img src="../assets/satellite-dish-solid.png" width="20px" height="20px" />
          </span>
        </div>
        <div class="align-self-center text-center">
          <span>{{day}}&nbsp;</span>
          <span>{{month}}</span>,
          <span>{{year}}</span>
          <p>
            Event live
            <span v-if="days">{{ days }} :</span>
            <span v-if="hours">{{ hours | formatTime }} :</span>
            <span>{{ minutes | formatTime }} :{{ seconds | formatTime }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="!currentTime">Stay tuned for the next event!</div>
  </div>
</template>

<script>
export default {
  props: {
    deadline: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      currentTime: Date.parse(this.deadline) - Date.parse(new Date()),
      day: "",
      month: "",
      year: "",
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    };
  },
  mounted() {
    setInterval(() => {
      this.countdown();
      this.setDate();
    }, 500);
  },
  computed: {
    seconds() {
      return Math.floor((this.currentTime / 1000) % 60);
    },
    minutes() {
      return Math.floor((this.currentTime / 1000 / 60) % 60);
    },
    hours() {
      return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);
    },
    days() {
      return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
    }
  },
  filters: {
    formatTime(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }
  },
  methods: {
    countdown() {
      this.currentTime = Date.parse(this.deadline) - Date.parse(new Date());
      if (this.currentTime > 0) {
        setTimeout(this.countdown, this.speed);
      } else {
        this.currentTime = null;
      }
    },
    setDate() {
      let d = new Date(this.deadline);
      this.day = d.getDate();
      this.month = this.months[d.getMonth()];
      this.year = d.getFullYear();
    }
  }
};
</script>

<style lang="css">
.timer {
  width: 320px;
}
</style>