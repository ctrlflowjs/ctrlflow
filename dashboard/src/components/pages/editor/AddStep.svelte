<script>
  import { createEventDispatcher } from "svelte"

  export let kind;

  const dispatch = createEventDispatcher()
</script>

<div class="add-step-container">
  <div class="add-step">
    <div class="placeholder">
      <div class="placeholder-text">...</div>
    </div>
    <div class="add-step-btns">
      {#if kind === "path"}
        <button type="button" on:click={() => dispatch("select", { kind: "action" })}>⬤</button>
        <button type="button" on:click={() => dispatch("select", { kind: "fork" })}>⅄</button>
        <!-- <button type="button" on:click={() => dispatch("select", { kind: "loop" })}>↻</button> -->
      {:else if kind === "trigger"}
        <button type="button" on:click={() => dispatch("select")}>＋</button>
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

  .add-step-btns button {
    background-color: black;
    border: none;
    color: white;
    border-radius: 100px;
    cursor: pointer;
    width: 25px;
    height: 25px;
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
</style>
