<script>
  import Node from "./Node.svelte"
  import Fork from "./Fork.svelte"
  import AddStep from "./AddStep.svelte"
  import { getContext, setContext, onDestroy } from "svelte"

  export let def

  let parents = getContext("parents")
  setContext("parents", [...parents, def])

  function addStep(kind, stepIndex) {
    if (kind === "action") {
      def.steps.splice(stepIndex, 0, { kind: "action" })
    } else if (kind === "fork") {
      let followingSteps = def.steps.splice(stepIndex)
      const newStep = {
        kind,
        paths: [
          {
            kind: "path",
            steps: followingSteps
          },
          {
            kind: "path",
            steps: [{ kind: "action" }]
          }
        ]
      }
      def.steps.push(newStep)
    }

    def = def
  }

  let rootEl
  let altPathEl
  let pathDef = ''
  let altPathDef = ''

  let resizeObserver = new ResizeObserver(() => {
    pathDef = `M 0 1 v ${rootEl?.offsetHeight -3}`
    if (altPathEl) {
      altPathDef = `M 0 1 L ${altPathEl.offsetLeft} 50`
    } else {
      altPathDef = ''
    }
  });
  $: if (rootEl) {
    resizeObserver.observe(rootEl)
  }
  onDestroy(() => {
    resizeObserver.disconnect()
  })

  function removeStep(stepIndex) {
    def.steps.splice(stepIndex, 1)
    def = def
  }

  function addCondition() {
    def.condition = {
      kind: "condition",
      expression: null,
      altPath: {
        kind: "path",
        steps: [
          {
            kind: "action"
          }
        ]
      }
    }
    def = def
  }
</script>

<div class="path-condition-wrapper">
  <div class="path hover-target {"" && "hovering"}" bind:this={rootEl}>
    <div class="add-step">
      <AddStep on:select={(e) => addStep(e.detail.kind, 0)} kind="path" />
    </div>

    <!-- <div>
      <button
        type="button"
        class="add-condition"
        on:click={addCondition}
      >+ IF</button>
    </div> -->

    {#each def.steps as step, stepIndex}
      {#if step.kind === "action"}
        <Node def={step} on:remove={() => removeStep(stepIndex)}/>
      {:else if step.kind === "fork"}
        <Fork def={step} />
      {/if}
      <div class="add-step">
        <AddStep on:select={(e) => addStep(e.detail.kind, stepIndex + 1)} kind="path"/>
      </div>
    {/each}

    <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="2.5" stroke-linecap="round">
      <path fill="none" stroke="black" d={pathDef} />
      {#if def.condition}
        <path fill="none" stroke="black" d={altPathDef} />
      {/if}
    </svg>
  </div>

  {#if def.condition}
    <div style="margin-top: 50px;" bind:this={altPathEl}>
      <svelte:self def={def.condition.altPath} />
    </div>
  {/if}
</div>

<style>
  .path-condition-wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
    margin: 0 2px;
    padding-top: 20px;
    border-radius: 10px;
    position: relative;
    background-color: #fafafa;
    z-index: 1;
    min-width: 50px;
    transition: box-shadow .1s;
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

  .hovering {
    box-shadow: black 0 0 6px -3px;
  }

  .add-step {
    display: none;
  }

  .hovering > .add-step {
    display: block;
  }

  .add-condition {
    position: absolute;
    top: 5px;
    left: 5px;
  }
</style>
