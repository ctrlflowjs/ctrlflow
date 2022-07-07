<script>
  export let def
  $: {
    if (!def.inputs) {
      def.inputs = {
        value: null
      }
    }
  }
</script>

<input type="number" bind:value={def.inputs.value} />

<style>
  input {
    background-color: rgb(255 255 236);
    border: 1.75px solid rgb(194, 194, 19);
    border-radius: 2px;
  }
</style>
