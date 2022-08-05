<script context="module">
  let closeOthers = () => null
</script>

<script>
  import { onMount, createEventDispatcher } from "svelte"
  import Portal from "../../utils/Portal.svelte"
  import Expression from "./expressions/Expression.svelte"

  export let def
  export let rootEl

  const dispatch = createEventDispatcher()
  $: {
    if (def?.type) {
      dispatch("change-type", def.type)
    }
  }

  let showEditor = false
  let editorEl
  export const open = () => {
    if (!showEditor) {
      closeOthers()
      closeOthers = close
      showEditor = true
    }
  }
  export const close = () => {
    if (showEditor) {
      showEditor = false
    }
  }

  let closeBtn
  function handleGlobalClick(e) {
    if (
      showEditor
      && e.target.isConnected
      && !rootEl.contains(e.target)
      && !editorEl.contains(e.target)
      || e.target === closeBtn) {
      close()
    }
  }
</script>

<svelte:window on:click={handleGlobalClick} />

{#if showEditor}
  <Portal target="#action-editor-portal">
    <div class="action-editor" bind:this={editorEl}>
      <div class="actions">
        <button bind:this={closeBtn} type="button">Close</button>
      </div>
      <div class="inputs-section">
        <div class="section-header">Conditions</div>
        <div class="inputs-area">
            {#each def.paths as path, pathIndex}
              <div class="input">
                <div class="input-label">Path {pathIndex + 1}</div>
                <div>
                  <div class="input-value">
                    {#if path.condition}
                      Runs When <Expression def={path.condition.expression} />
                    {:else}
                      <span>Runs Always</span>
                      <a
                        href="#fake"
                        on:click|preventDefault={() => path.condition = { expression: {} }}
                      >
                        (Add Condition)
                    </a>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
        </div>
      </div>
    </div>
  </Portal>
{/if}

<style>
  .action-editor {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 30px);
    background-color: #fafafa;
    border: .5px solid black;
    min-width: 300px;
    max-width: 700px;
    width: max-content;
    z-index: 15;
    border-radius: 4px;
    cursor: default;
    color: black;
    text-align: initial;
    padding: 15px;
    box-shadow: 0px 3px 10px -10px;
  }

  .actions {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .section-header {
    font-size: 20px;
    font-weight: 700;
  }

  .inputs-area {
    display: table;
  }

  .input {
    display: table-row;
  }

  .input > div {
    display: table-cell;
    vertical-align: top;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .input-label {
    padding-right: 10px;
    font-weight: 700;
  }

  select {
    padding: 3px 7px;
    border-radius: 2px;
  }
</style>
