<script>
  import Node from "./Node.svelte"
  import Fork from "./Fork.svelte"
  import AddStep from "./AddStep.svelte"

  export let def

  function addStep(kind, stepIndex) {
    if (kind === "node") {
      const newStep = {
        kind
      }
      def.steps.splice(stepIndex, 0, newStep)
    } else if (kind === "fork") {
      let followingSteps = def.steps.splice(stepIndex)
      const newStep = {
        kind,
        paths: [
          {
            steps: followingSteps
          },
          {
            steps: []
          }
        ]
      }
      def.steps.push(newStep)
    }

    def = def
  }

</script>

<div class="path">
  <!-- {#if !def.steps.length}
    <div class="add-node-btn"><span>+</span></div>
  {/if} -->

  <AddStep on:select={(e) => addStep(e.detail.kind, 0)} kind="path" />

  {#each def.steps as step, stepIndex}
    {#if step.kind === "node"}
      <Node def={step} />
    {:else if step.kind === "fork"}
      <Fork def={step} />
    {/if}
    <AddStep on:select={(e) => addStep(e.detail.kind, stepIndex + 1)} kind="path"/>
  {/each}

  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="5" stroke-linecap="round">
    <path fill="none" stroke="black" d="M 0 2 v 6" />
  </svg>
</div>

<style>
  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5px;
    border: .5px solid black;
    border-radius: 10px;
    margin: 5px;
    position: relative;
  }

  .svg-path {
    position: absolute;
    left: 50%;
    top: 0;
    z-index: -10;
    width: 10px;
    overflow: visible;
  }

  .add-node-btn {
    background-color: white;
    border: 2px solid black;
    border-radius: 1000px;
    color: black;
    margin: 15px;
    font-weight: 400;
    width: 60px;
    height: 60px;
    font-size: 60px;
    position: relative;
    cursor: pointer;
  }

  .add-node-btn > span {
    position: absolute;
    top: -16px;
    left: 11px;
  }
</style>
