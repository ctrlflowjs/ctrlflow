<script>
  import { createEventDispatcher, onMount } from "svelte"
  import { getMetadata } from "./actions"
  import Expression from "./Expression.svelte"

  export let def

  let self

  const dispatch = createEventDispatcher()

  let rendered = false

  let metadata
  let actionType

  $: {
    actionType = metadata?.actionDefs.find(d => d.type === def.actionType)
  }

  onMount(() => {
    rendered = true

    getMetadata().then((m) => metadata = m)

    return () => {
      rendered = false
    }
  })

  function handleExternalClick(event) {
    if (rendered && event.target !== self && !self.contains(event.target)) {
      dispatch("close")
    }
  }

  function getNodeDefs() {
    let nodeDefs = def.kind === 'trigger' ? metadata.eventDefs : metadata.actionDefs
    return nodeDefs || []
  }

  function getActionInputs() {
    let keys = Object.keys(actionType.inputSchema.properties)
    return keys.map(k => ({ inputName: k, inputDef: actionType.inputSchema.properties[k] }))
  }
</script>

<div
  bind:this={self}
  class="action-editor"
>
  <div class="actions">
    <button on:click={(e) => (e.stopPropagation(), dispatch("close"))} type="button">Close</button>
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
  {#if true}
    <div>
      <label>
        <div>Action</div>
        <select bind:value={def.action}>
          {#if metadata}
            {#each metadata.actionDefs as actionDef}
              <option value={actionDef.type}>{actionDef.title}</option>
            {/each}
          {/if}
        </select>
      </label>
    </div>
  {:else}
    <div>
    </div>
  {/if}
  <hr />
  <div class="inputs-section">
    <div class="inputs-header">Inputs</div>
    <div class="inputs-area">
      {#if actionType}
        {#each getActionInputs() as { inputName, inputDef }}
          <div class="input">
            <div class="input-label">{inputName}</div>
            <div>
              <div class="input-value">
                <Expression def={inputDef} />
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<svelte:window on:click={handleExternalClick}/>

<style>
  .action-editor {
    position: absolute;
    top: -100px;
    left: 100px;
    background-color: #f5f5f5;
    border: .5px solid black;
    min-width: 400px;
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

  .inputs-section {
  }

  .inputs-header {
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

  .input-value {
    background-color: white;
    display: block;
    width: 100px;
    min-height: 24px;
    border: 1px solid black;
  }
</style>
