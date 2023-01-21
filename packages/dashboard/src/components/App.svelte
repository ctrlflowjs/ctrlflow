<script lang="ts">
	import Nav from "./Nav.svelte"
	import Router from "./routes/Router.svelte"
</script>

<div class="background">
	<Nav/>
	<div class="main-body">
		<Router />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700&family=Source+Code+Pro:wght@300;600;800&display=swap');
	/* @font-face {
		font-family: 'Roboto Flex';
		src: url('http://localhost:3000/RobotoFlex-Regular.ttf');
	} */

	.background {
		background-color: #fafafa;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		font-family: 'Roboto Flex', sans-serif;
		overflow-y: auto;
	}
</style>
