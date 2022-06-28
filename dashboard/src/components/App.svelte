<script>
	import Nav from "./Nav.svelte"
	import WorkflowLookup from "./pages/WorkflowLookup.svelte";
</script>

<div class="background">
	<Nav/>
	<div class="main-body">
		<WorkflowLookup/>
	</div>
</div>

<style>
	.background {
		background-color: rgb(245, 245, 245);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		font-family: 'Roboto', sans-serif;
		overflow-y: auto;
	}

	.main-body {
		height: calc(100vh - 60px);
	}
</style>
