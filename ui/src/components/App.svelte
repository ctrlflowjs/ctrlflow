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
		background-color: rgb(248 248 248 / 1);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -999999;
	}

	.editor-area {
		position: fixed;
		top: 0;
		left: 300px;
		bottom: 0;
		right: 0;
		padding: 30px;
		overflow-y: scroll;
	}
</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap" rel="stylesheet">
