<template>
  <div>
    <Header></Header>
    <div id="post">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-row p-0">
            <img
              src="../assets/F4/2 - Donington Park/4ed8bab2-51a0-4df3-aae5-9d570abbe4af.jpg"
              alt
              class="img-fluid"
            />
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 mt-3 text-center">
            <h2 class="pt-3">Headline</h2>
          </div>
          <div class="col-12 text-center">
            <p>2 Jan 2020</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 pt-3 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            debitis quod, aliquam, adipisci nostrum harum quo inventore rem
            voluptates sed pariatur consectetur sequi tenetur? Unde, expedita?
            Harum voluptates delectus possimus architecto vel beatae adipisci
            minus ad tempore consequuntur dolore, nemo veritatis, odit nulla
            explicabo earum eaque maiores magnam animi eligendi magni ut, ducimus
            placeat qui. Vitae voluptates praesentium in rem placeat ut qui
            corporis dolor, porro, quo, doloremque labore enim quisquam? Quidem
            quis minus, nihil hic magnam id ad animi officia beatae architecto in
            nesciunt provident sint deserunt iusto iure nam unde autem ut placeat
            totam recusandae. Cumque, sunt cum.
          </div>

          <div class="col-12 pt-3 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            debitis quod, aliquam, adipisci nostrum harum quo inventore rem
            voluptates sed pariatur consectetur sequi tenetur? Unde, expedita?
            Harum voluptates delectus possimus architecto vel beatae adipisci
            minus ad tempore consequuntur dolore, nemo veritatis, odit nulla
            explicabo earum eaque maiores magnam animi eligendi magni ut, ducimus
            placeat qui. Vitae voluptates praesentium in rem placeat ut qui
            corporis dolor, porro, quo, doloremque labore enim quisquam? Quidem
            quis minus, nihil hic magnam id ad animi officia beatae architecto in
            nesciunt provident sint deserunt iusto iure nam unde autem ut placeat
            totam recusandae. Cumque, sunt cum.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "News",
  data() {
    return {
      isActive: null
    };
  },
  methods: {
    filter(value) {
      if (value == "all") {
        this.isActive = "all";
      }
    }
  },
  created() {
    this.isActive = "all";
  }
};
</script>

<style scoped>
.active {
  background-color: #6e6e6d;
  color: white;
}
</style>
