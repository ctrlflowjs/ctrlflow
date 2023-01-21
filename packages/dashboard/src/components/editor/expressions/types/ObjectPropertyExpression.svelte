<script>
  export let def

  $: if (!def.inputs) {
    def.inputs = {
      path: []
    }
  }
</script>

<div>
  {#each def.inputs.path as pathItem}
    <div>🠖 {pathItem.title}</div>
  {/each}
  <!-- + -->
</div>

<style>
  .condition-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid rgb(129, 70, 255);
    flex-wrap: wrap;
    padding: 7px;
    background-color: rgb(243 237 255);
    gap: 7px 7px;
    border-radius: 2px;
  }

  .section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 7px 7px;
  }
</style>
