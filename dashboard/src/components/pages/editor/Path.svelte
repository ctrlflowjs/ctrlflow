<script>
  import Node from "./Node.svelte"
  import Fork from "./Fork.svelte"
  import AddStep from "./AddStep.svelte"
  import { getContext, setContext, onDestroy } from "svelte"

  export let def

  let parents = getContext("parents") || []
  setContext("parents", [...parents, def])

  function addStep(kind, stepIndex) {
    if (kind === "action") {
      def.steps.splice(stepIndex, 0, { kind })
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

  let rootEl
  let pathDef = ''

  let resizeObserver = new ResizeObserver(() => pathDef = `M 0 1 v ${rootEl?.offsetHeight -3}`);
  $: if (rootEl) {
    resizeObserver.observe(rootEl)
  }
  onDestroy(() => {
    resizeObserver.disconnect()
  })

</script>

<div class="path" bind:this={rootEl}>
  {#if !def.steps.length}
    <div
      class="add-node-btn"
      on:click={() => addStep('action', 0)}
    ><span>+</span>
    </div>
  {:else}
    <AddStep on:select={(e) => addStep(e.detail.kind, 0)} kind="path" />
  {/if}

  {#each def.steps as step, stepIndex}
    {#if step.kind === "action"}
      <Node def={step} />
    {:else if step.kind === "fork"}
      <Fork def={step} />
    {/if}
    <AddStep on:select={(e) => addStep(e.detail.kind, stepIndex + 1)} kind="path"/>
  {/each}

  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="5" stroke-linecap="round">
    <path fill="none" stroke="black" d={pathDef} />
  </svg>
</div>

<style>
  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5px;
    padding-top: 20px;
    border: .5px solid black;
    border-radius: 10px;
    margin: 5px;
    position: relative;
    background-color: whitesmoke;
    z-index: 1;
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
