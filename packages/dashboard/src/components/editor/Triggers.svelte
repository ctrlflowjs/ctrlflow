<script>
  import Node from "./Node.svelte"
  import AddStep from "./AddStep.svelte"
  import nodeIdService from "./services/NodeIdService";

  export let triggers

  function addTrigger() {
    triggers.push({
      id: nodeIdService.nextId(),
      kind: "trigger"
    })
    triggers = triggers
  }
</script>

<div class="trigger-set hover-target {"" && "hovering"}">
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
    position: relative;
  }

  .add-trigger {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    display: none;
  }

  .hovering {
    /* border: 3px solid lightblue;
    padding: 2.5px 2.5px; */
  }

  .hovering > .add-trigger {
    display: block;
  }
</style>
