<script>
  import Node from "./Node.svelte"
  import AddStep from "./AddStep.svelte"

  export let triggers

  function addTrigger(kind, stepIndex) {
    triggers.push({
      kind: "trigger"
    })
    triggers = triggers
  }
</script>

<div class="trigger-set">
  {#each triggers as trigger}
    <Node kind="trigger" def={trigger} />
  {/each}
  <div class="add-trigger">
    <AddStep on:select={addTrigger} kind="trigger"/>
  </div>
</div>

<style>
  .trigger-set {
    display: flex;
    flex-direction: row;
    padding: 5px;
    border: .5px solid black;
    border-radius: 10px;
    margin: 5px;
    position: relative;
  }

  .add-trigger {
    position: absolute;
    right: -45px;
    top: calc(50% - 5px);
  }
</style>
