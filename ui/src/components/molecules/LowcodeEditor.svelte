<script>
  import { flip } from "svelte/animate"
  import { onMount } from "svelte"
  import { getMetadata } from "./actions"

  let trigger = {}
  let actions = []
  let editingItem;
  let triggerDefinitions = []
  let actionDefinitions = []

  onMount(async () => {
    let { events, actions } = await getMetadata()
    triggerDefinitions = events
    actionDefinitions = actions
  })

  function addAction() {
    actions.push({

    })
    actions = actions
  }

  function removeAction(action) {
    let actionIndex = actions.indexOf(action)
    actions.splice(actionIndex, 1)
    actions = actions
  }

  function moveAction(action, moveCount) {
    let actionIndex = actions.indexOf(action)
    actions.splice(actionIndex, 1)
    actions.splice(actionIndex + moveCount, 0, action)
    actions = actions
  }

  function editItem(item) {
    editingItem = item
  }
</script>

<h3>Trigger</h3>
<div class="trigger">
  <select bind:value={trigger.type}>
    <option></option>
    {#each triggerDefinitions as option}
      <option value={option}>{option.displayName}</option>
    {/each}
  </select>
</div>
<h3>Actions</h3>
{#each actions as action (action)}
  <p class="action-node" animate:flip>
    <select bind:value={action.type}>
      <option></option>
      {#each actionDefinitions as option}
        <option value={option}>{option.displayName}</option>
      {/each}
    </select>
    <button type="button" disabled={actions.indexOf(action) === 0} on:click={() => moveAction(action, -1)}>⬆️</button>
    <button type="button" disabled={actions.indexOf(action) === actions.length - 1} on:click={() => moveAction(action, 1)}>⬇️</button>
    <button type="button" disabled={!action.type} on:click={() => editItem(action)}>
      ✏️
    </button>
    <button type="button" on:click={() => removeAction(action)}>
      🗑️
    </button>
  </p>
{/each}
<div>
  <button type="button" on:click={addAction}>➕ Add Action</button>
</div>
{#if editingItem}
  <div class="item-editor-sidebar">
    <button
      type="button"
      on:click={() => editingItem = null}
      style="float: right"
    >
      ❌
    </button>
    <h2>{editingItem.type.displayName}</h2>
    {#each Object.values(editingItem.type.inputSchema.properties) as inputField}
      <p>
        <label>
          <span>{inputField.title}</span>
          <input type="text"/>
        </label>
      </p>
    {/each}
  </div>
{/if}

<style>
  .item-editor-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    min-width: 300px;
    max-width: 700px;
    width: 40%;
    border: 1px solid black;
    z-index: 1;
    background-color: #fdfdfd;
    padding: 10px;
  }
</style>
