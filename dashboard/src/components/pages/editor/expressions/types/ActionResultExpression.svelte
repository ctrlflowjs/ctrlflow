<script>
  export let def
  $: {
    if (!def.settings) {
      def.settings = {
        actionId: null,
        outputName: null
      }
    }
  }

  let action
  let outputName
</script>

<div class="logic-if-else-expression">
  <div class="if-section section">
    <select bind:value={def.settings.actionId}>
      <option value={undefined}>Select Action</option>
    </select>
    <div>
      Output:
    </div>
    <select bind:value={def.settings.outputName}>
      <option value={undefined}>Select</option>
    </select>
  </div>
</div>

<style>
  .logic-if-else-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid #ff9120;
    border-radius: 2px;
    flex-wrap: wrap;
    padding: 5px;
    background-color: rgb(253 246 234);
    gap: 7px 7px;
  }

  .section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 7px 7px;
  }
</style>
