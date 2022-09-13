<script>
  import Path from "./Path.svelte"
  import AddStep from "./AddStep.svelte"
  import ConditionsEditor from "./ConditionsEditor.svelte"
  import { getLineDef } from "./svg"
  import { getContext, setContext } from "svelte"

  export let def;

  let parents = getContext("parents") || []
  setContext("parents", [...parents, def])

  let forkRef;

  let observing = false;
  $: {
    if (forkRef && !observing) {
      observing = true
      new ResizeObserver(() => def = def).observe(forkRef)
    }
  }

  function getLine(path, pathIndex, forkRef) {
    let pathEl = forkRef.children[pathIndex + 1]
    if (!pathEl) {
      return 0
    }

    const containerCenterX = forkRef.offsetWidth / 2
    const containerBottom = pathEl.offsetHeight + 28
    let offsetLeft = pathEl.offsetLeft + (pathEl.offsetWidth / 2)

    return `
      ${getLineDef(containerCenterX, -1, offsetLeft, 27)}
      ${getLineDef(
        containerCenterX,
        forkRef.offsetHeight + 1,
        offsetLeft,
        containerBottom
      )}
    `
  }

  function handleAddStep(e) {
    if (e.detail.kind === "fork") {
      def.paths.push({
        kind: "path",
        steps: [{
          kind: "action"
        }]
      })
      def = def
    }

    if (e.detail.kind === "conditions") {
      openEditor()
    }
  }

  let openEditor
  let addStepEl

</script>

<div class="fork hover-target {"" && "hovering"}" bind:this={forkRef}>

  <div class="add-step" bind:this={addStepEl}>
    <AddStep on:select={handleAddStep} kind="branch"/>
  </div>

  {#each def.paths as path}
    <Path def={path} />
  {/each}

  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="2.5" stroke-linecap="round">
    {#if forkRef}
      {#each def.paths as path, pathIndex}
        <path class="path-line" fill="none" stroke="black" d={getLine(path, pathIndex, forkRef)} />
      {/each}
    {/if}
  </svg>

  <ConditionsEditor
    def={def}
    rootEl={addStepEl}
    bind:open={openEditor}
  />
</div>

<style>
  .fork {
    display: flex;
    flex-direction: row;
    padding: 28px 0;
    border-radius: 10px;
    position: relative;
    background-color: white;
    z-index: 1;
    transition: box-shadow .1s;
  }

  .svg-path {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 10px;
    height: 10px;
    overflow: visible;
    box-sizing: border-box;
    stroke-linecap: square;
  }

  .hovering {
    box-shadow: black 0 0 6px -3px;
  }

  .add-step {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    z-index: 5;
  }

  .hovering > .add-step {
    display: block;
  }
</style>
