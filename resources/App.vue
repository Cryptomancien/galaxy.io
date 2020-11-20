<template>
	<!-- 
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
   -->

   <input type="search">

	<div>
		<div v-for="sc in smart_contracts">
			<div>
				{{ sc.title }}
			</div>
			<div>
				{{ sc.description }}
			</div>
		</div>
	</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data() {
  	return {
  		smart_contracts: [
  			{
  				title: 'hello',
  				description: 'tototoot'
  			}
  		]
  	}
  }
}
</script>
