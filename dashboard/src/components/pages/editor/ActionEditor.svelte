<script context="module">
  let closeOthers = () => null
</script>

<script>
  import { onMount, createEventDispatcher } from "svelte"
  import actions from "./actions"
  import Expression from "./expressions/Expression.svelte"

  export let def
  export let rootEl

  const dispatch = createEventDispatcher()
  $: {
    if (def?.type) {
      dispatch("change-type", def.type)
    }
  }

  let metadata
  onMount(async () => {
    def.inputs = def.inputs || {}
    metadata = await actions.getMetadata()
  })

  let actionType
  $: {
    actionType = metadata?.actionDefs.find(d => d.type === def.type)
    setInputs()
  }

  function setInputs() {
    if (!actionType?.inputSchema.properties) {
      return;
    }

    const inputs = {}
    for (let key in actionType?.inputSchema.properties || []) {
      inputs[key] = def.inputs[key] || {
        kind: "expression"
      }
    }
    def.inputs = inputs
  }

  let showEditor = false
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
    if (showEditor && e.target.isConnected && !rootEl.contains(e.target) || e.target === closeBtn) {
      close()
    }
  }

  $: actionInputs = Object.keys(actionType?.inputSchema.properties || {})
  $: actionInputDefs = actionInputs.map(k => ({ inputName: k, inputDef: actionType.inputSchema.properties[k] }))

</script>

<svelte:window on:click={handleGlobalClick} />

{#if showEditor}
  <div
    class="action-editor"
  >
    <div class="actions">
      <button bind:this={closeBtn} type="button">Close</button>
    </div>
    <!-- <div>
      <label>
        <div>Module</div>
        <select>
          <option>Google Sheets</option>
          <option>Trello</option>
          <option>Mailchimp</option>
        </select>
      </label>
    </div> -->
    <div>
      <label>
        <div class="section-header">Action</div>
        <select bind:value={def.type}>
          <option value={undefined}>Select</option>
          {#if metadata}
            {#each metadata.actionDefs as actionDef}
              <option value={actionDef.type}>{actionDef.title}</option>
            {/each}
          {/if}
        </select>
      </label>
    </div>
    {#if def.type}
      <hr />
      <div class="inputs-section">
        <div class="section-header">Inputs</div>
        <div class="inputs-area">
          {#if actionType}
            {#each actionInputDefs as { inputName, inputDef }}
              <div class="input">
                <div class="input-label">{inputDef.title || inputName}</div>
                <div>
                  <div class="input-value">
                    <Expression def={def.inputs[inputName]} />
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .action-editor {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: calc(100% + 30px);
    background-color: #f5f5f5;
    border: .5px solid black;
    min-width: 300px;
    max-width: 500px;
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
