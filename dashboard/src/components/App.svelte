<script>
	import Nav from "./Nav.svelte"
	import WorkflowLookup from "./pages/WorkflowLookup.svelte";
</script>

<div class="background">
	<Nav/>
	<div class="editor-area">
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

	.editor-area {
		padding: 95px 50px 35px 50px;
		max-width: 1100px;
		margin-right: auto;
		margin-left: auto;
	}
</style>
