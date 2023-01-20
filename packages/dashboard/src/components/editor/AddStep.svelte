<script>
  import { createEventDispatcher } from "svelte"
    import nodeIdService from "./services/NodeIdService";

  export let kind;

  const dispatch = createEventDispatcher()

  function emitSelection(kind) {
    let value
    if (kind) {
      value = {
        kind,
        id: nodeIdService.nextId()
      }
    }
    dispatch("select", value)
  }
</script>

<div class="add-step-container">
  <div class="add-step">
    <div class="placeholder">
      <div class="placeholder-text">...</div>
    </div>
    <div class="add-step-btns">
      {#if kind === "path"}
        <button type="button" on:click={() => emitSelection("action")}>+</button>
        <button type="button" on:click={() => emitSelection("fork")}>⅄</button>
        <!-- <button type="button" on:click={() => emitSelection("loop")}>↻</button> -->
      {:else if kind === "trigger"}
        <button type="button" on:click={() => emitSelection()}>+</button>
      {:else}
        <button type="button" on:click={() => emitSelection("conditions")}>
          <span class="fork-route">⇄</span>
        </button>
        <button type="button" on:click={() => emitSelection("fork")}>⅄</button>
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    white-space: nowrap;
  }

  .add-step-btns button {
    background-color: black;
    border: none;
    color: white;
    border-radius: 100px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    font-size: 20px;
    line-height: 10px;
  }

  .add-step:hover .placeholder {
    display: none;
  }

  .add-step:not(:hover) .add-step-btns {
    display: none;
  }

  .placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    background-color: black;
    padding: 2px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
  }

  .placeholder-text {
    line-height: 9px;
    text-align: center;
  }

  .fork-route {
    transform: scale(1.1) translate(0px, -1px);
    display: inline-block;
  }
</style>
