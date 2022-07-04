<script>
  import ActionEditor from "./ActionEditor.svelte"

  export let def

  let showEditor = false

  function setShowEditor(show) {
    showEditor = show
  }
</script>

<div class="node" on:click={(e) => { e.stopPropagation(), setShowEditor(true) }}>
  <svg class="svg-path" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" stroke-width="5" stroke-linecap="round">
    <path fill="none" stroke="black" d="M 0 -48 v 98" />
  </svg>

  {#if showEditor}
    <ActionEditor
      def={def}
      on:close={() => setShowEditor(false)}
    />
  {/if}
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

  .svg-path {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: -10;
    width: 10px;
    overflow: visible;
  }

</style>
