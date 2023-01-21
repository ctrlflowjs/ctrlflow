<script>
  import { getContext, setContext, onDestroy } from "svelte"

  import Node from "./Node.svelte"
  import Fork from "./Fork.svelte"
  import AddStep from "./AddStep.svelte"
  import { getLineDef, strokeWidth } from "./svg"
  import nodeIdService from "./services/NodeIdService"

  export let def

  let parents = getContext("parents")
  let rootEl
  let pathDef = ''
  let resizeObserver = new ResizeObserver(() => {
    pathDef = getLineDef(0, 1, 0, rootEl?.offsetHeight -2)
  });

  onDestroy(() => {
    resizeObserver.disconnect()
  })

  setContext("parents", [...parents, def])

  $: if (rootEl) {
    resizeObserver.observe(rootEl)
  }

  function addStep(kind, stepIndex) {
    if (kind === "action") {
      def.steps.splice(stepIndex, 0, {
        id: nodeIdService.nextId(),
        kind: "action"
      })
    } else if (kind === "fork") {
      let followingSteps = def.steps.splice(stepIndex)
      const newStep = {
        kind,
        paths: [
          {
            id: nodeIdService.nextId(),
            kind: "path",
            steps: followingSteps
          },
          {
            id: nodeIdService.nextId(),
            kind: "path",
            steps: [{
              id: nodeIdService.nextId(),
              kind: "action"
            }]
          }
        ]
      }
      def.steps.push(newStep)
    }

    def = def
  }

  function removeStep(stepIndex) {
    def.steps.splice(stepIndex, 1)
    def = def
  }
</script>

<div class="path hover-target {"" && "hovering"}" bind:this={rootEl}>
  <div class="add-step">
    <AddStep on:select={(e) => addStep(e.detail.kind, 0)} kind="path" />
  </div>

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

  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width={strokeWidth} stroke-linecap="round">
    <path fill="none" stroke="black" d={pathDef} />
  </svg>
</div>

<style>
  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0;
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
    /* box-shadow: black 0 0 6px -3px; */
  }

  .add-step {
    display: none;
  }

  .hovering > .add-step {
    display: block;
  }
</style>
