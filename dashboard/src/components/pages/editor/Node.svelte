<script>
  import ActionEditor from "./ActionEditor.svelte"

  export let def
  $: {
    displayName = def?.type
  }

  let self
  let openEditor

  let displayName

</script>

<div
  class="node"
  on:click={openEditor}
  bind:this={self}
>
  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="5" stroke-linecap="round">
    <path fill="none" stroke="black" d="M 0 -48 v 98" />
  </svg>

  <div class="node-name">{displayName}</div>

  <ActionEditor
    def={def}
    rootEl={self}
    bind:open={openEditor}
    on:change-type={(e) => displayName = e.detail}
  />
</div>

<style>

  .node {
    background-color: black;
    padding: 30px;
    border-radius: 1000px;
    color: white;
    margin: 15px;
    position: relative;
    cursor: pointer;
  }

  .node-name {
    background-color: white;
    padding: 0 10px;
    border: 1.75px solid black;
    position: absolute;
    color: black;
    font-size: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10000px;
  }

  .svg-path {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: -10;
    width: 10px;
    overflow: visible;
  }

</style>
