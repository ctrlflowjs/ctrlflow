<script>
	import LowcodeEditor from './LowcodeEditor.svelte';

	export let name;

	let editorHovered = false;
</script>

<svelte:window
	on:touchmove={e => {
		console.log('wheel', editorHovered)
		if (editorHovered) {
			e.preventDefault();
		}
	}}
/>

<main>
	<h1>Helldddo {name}!!!!!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svee tutorial</a> to learn how to build Svelte apps.</p>
	<LowcodeEditor/>
	<LowcodeEditor/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
