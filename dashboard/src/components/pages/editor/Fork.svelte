<script>
  import Path from "./Path.svelte"
  import AddStep from "./AddStep.svelte"
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

  function getLine(pathIndex, forkRef) {
    let pathEl = forkRef.children[pathIndex + 1]
    if (!pathEl) {
      return 0
    }

    const containerCenterX = forkRef.offsetWidth / 2
    const containerBottom = pathEl.offsetHeight + 30

    return `
      M ${containerCenterX} -1 L ${pathEl.offsetLeft + (pathEl.offsetWidth / 2)} 31
      M ${containerCenterX} ${forkRef.offsetHeight + 1} L ${pathEl.offsetLeft + (pathEl.offsetWidth / 2)} ${containerBottom}
    `
  }

  function addPath() {
    def.paths.push({
      kind: "path",
      steps: [{
        kind: "action"
      }]
    })
    def = def
  }

</script>

<div class="fork hover-target {"" && "hovering"}" bind:this={forkRef}>

  <div class="add-step">
    <AddStep on:select={addPath} kind="branch"/>
  </div>

  {#each def.paths as path}
    <Path def={path} />
  {/each}

  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="2.5" stroke-linecap="round">
    {#if forkRef}
      {#each def.paths as _, pathIndex}
        <path fill="none" stroke="black" d={getLine(pathIndex, forkRef)} />
      {/each}
    {/if}
  </svg>
</div>

<style>
  .fork {
    display: flex;
    flex-direction: row;
    padding: 25px 5px;
    border: .5px solid black;
    border-radius: 10px;
    margin: 5px;
    position: relative;
    background-color: #fafafa;
    z-index: 1;
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
  }

  .hovering {
    border: 3px solid lightblue;
    padding: 22.5px 2.5px;
  }

  .add-step {
    position: absolute;
    top: 15px;
    left: calc(50% - 5px);
    display: none;
  }

  .hovering > .add-step {
    display: block;
  }

  .hovering > .svg-path {
    margin-top: -2.5px;
    margin-left: -2.5px;
  }
</style>
