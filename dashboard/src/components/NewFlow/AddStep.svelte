<script>
  import { createEventDispatcher } from "svelte"

  export let kind;

  const dispatch = createEventDispatcher()
</script>

<div class="add-step-container">
  <div class="add-step">
    <div class="placeholder"></div>
    <div class="add-step-btns">
      {#if kind === "path"}
        <button type="button" on:click={() => dispatch("select", { kind: "node" })}>⬤</button>
        <button type="button" on:click={() => dispatch("select", { kind: "fork" })}>⅄</button>
        <!-- <button type="button" on:click={() => dispatch("select", { kind: "loop" })}>↻</button> -->
      {:else}
        <button type="button" on:click={() => dispatch("select")}>ᛣ</button>
      {/if}
    </div>
  </div>
</div>

<style>
  .add-step-container {
    position: relative;
    width: 10px;
  }

  .add-step {
    position: absolute;
    width: 100px;
    height: 30px;
    top: -15px;
    left: -45px;
    z-index: 5
  }

  .add-step:hover .placeholder {
    display: none;
  }

  .add-step:not(:hover) .add-step-btns {
    display: none;
  }

  .placeholder {
    font-weight: 700;
  }
</style>
