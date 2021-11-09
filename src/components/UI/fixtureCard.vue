<template>
  <mdb-card>
    <mdb-card-image :src="fixture.head.url" :alt="fixture.head.alt" class="mx-auto cust-dim"></mdb-card-image>
    <mdb-card-body>
      <mdb-card-title class="h6">{{ fixture.latest.circuit.title }}</mdb-card-title>
      <mdb-card-text>{{ fixture.latest.displayDate }}</mdb-card-text>
    </mdb-card-body>
    <div class="row position-relative">
      <div class="col-12">
        <ui-timer :deadline="fixture.latest.date" :race="fixture.type.toUpperCase()"/>
      </div>
    </div>
     <mdb-card-image :src="fixture.latest.circuit.url" :alt="fixture.latest.circuit.alt"></mdb-card-image>
    <mdb-card-footer color="bg-white" class="lighten-3 p-0 text-center">
      <router-link class="btn btn-danger" :to="'/' + fixture.type" color="primary">view full calendar</router-link>
    </mdb-card-footer>
  </mdb-card>
</template>

<script>
	import { mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbCardFooter} from 'mdbvue';
	export default {
		name: 'CardPage',
		components: {
			mdbCard,
			mdbCardImage,
			mdbCardBody,
			mdbCardTitle,
			mdbCardText,
      mdbCardFooter
		},
    props: {
      fixture: {
        type: Object,
        default: () => ({})
      }
    }
	}
</script>

<style>
  .cust-dim img.img-fluid {
    width: 100% !important;
  }
</style>