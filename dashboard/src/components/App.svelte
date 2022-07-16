<script>
import { setContext } from "svelte";

	import Nav from "./Nav.svelte"
	import Router from "./Router.svelte"

	let history = {
		pushState() {}
	}

	setContext('history', history)

</script>

<div class="background">
	<Nav/>
	<div class="main-body">
		<Router />
	</div>
</div>

<style>
	.background {
		background-color: #fafafa;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		font-family: 'Roboto', sans-serif;
		overflow-y: auto;
	}
</style>
