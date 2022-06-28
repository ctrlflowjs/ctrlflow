<script>
  import { createEventDispatcher } from "svelte"
import { prevent_default } from "svelte/internal";

  let self;

  const dispatch = createEventDispatcher()

  function handleExternalClick(event) {
    if (self && event.target !== self && !self.contains(event.target)) {
      // dispatch("close")
    }
  }
</script>

<div
  bind:this={self}
  class="action-editor">
  woooooo
  <button on:click={(e) => (e.stopPropagation(), dispatch("close"))} type="button">Close</button>
</div>

<svelte:window on:click={handleExternalClick}/>

<style>
  .action-editor {
    position: absolute;
    top: -100px;
    left: 100px;
    background-color: #f5f5f5;
    border: .5px solid black;
    width: 300px;
    height: 300px;
    z-index: 15;
    border-radius: 4px;
    cursor: default;
    color: black;
  }
</style>
