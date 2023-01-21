<script>
  export let def

  $: if (!def.inputs) {
    def.inputs = {
      value: null
    }
  }
</script>

<input type="text" bind:value={def.inputs.value} />

<style>
  input {
    background-color: rgb(243 243 251);
    border: 1.75px solid rgb(38, 38, 205);
    border-radius: 2px;
  }
</style>
