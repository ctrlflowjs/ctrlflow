<script>
  import { flip } from "svelte/animate"
  import { onMount } from "svelte"
  import { getMetadata, createWorkflow, updateWorkflow } from "./actions"

  export let workflow;

  let title;
  let trigger = {}
  let actions = []
  let editingItem;
  let triggerDefinitions = []
  let actionDefinitions = []

  $: {
    if (workflow?.nodes) {
      trigger =  { ...workflow.nodes[0] }
      actions = workflow.nodes.slice(1).map(node => ({ ...node }))
    }
  }

  onMount(async () => {
    const metadata = await getMetadata()
    triggerDefinitions = metadata.eventDefs
    actionDefinitions = metadata.actionDefs
  })

  function addAction() {
    actions.push({
      inputs: {}
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

  function getType(name, kind) {
    types = kind === 'event' ? triggerDefinitions : actionDefinitions
    return types.find(t => t.type === name)
  }

  function getActionInputs(name) {
    let def = actionDefinitions.find(x => x.type === name)
    let keys = Object.keys(def.inputSchema.properties)
    return keys.map(k => ({ inputName: k, inputDef: def.inputSchema.properties[k] }))
  }

  async function saveWorkflow() {
    let newWorkflow = { ...workflow, title, lastModifiedAt: (new Date()).toLocaleString(), nodes: [] }
    let nodeId = 0
    newWorkflow.nodes[0] = {
      id: ++nodeId,
      kind: 'event-trigger',
      type: trigger.type
    }
    for (let action of actions) {
      newWorkflow.nodes.push({
        id: ++nodeId,
        kind: 'action',
        type: action.type,
        inputs: { ...action.inputs }
      })
    }
    if (workflow.id) {
      workflow = await updateWorkflow(workflow.id, newWorkflow)
    } else {
      workflow = await createWorkflow(newWorkflow)
    }
  }
</script>


<p>
  <button type="button" class="action-editor-save-btn" on:click={saveWorkflow}>💾 Save</button>
</p>
<h4>Title</h4>
<input type="text" bind:value={title}/>
<h3>Trigger</h3>
<div class="trigger">
  <select bind:value={trigger.type}>
    <option></option>
    {#each triggerDefinitions as option}
      <option value={option.type}>{option.displayName}</option>
    {/each}
  </select>
</div>
<h3>Actions</h3>
{#each actions as action (action)}
  <p class="action-node" animate:flip>
    <select bind:value={action.type}>
      <option></option>
      {#each actionDefinitions as option}
        <option value={option.type}>{option.displayName}</option>
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
    <h2>{getType(editingItem.type).displayName}</h2>
    {#each getActionInputs(editingItem.type) as { inputName, inputDef }}
      <p>
        <label>
          <span>{inputDef.title}</span>
          {#if inputDef.type === 'number'}
            <input type="number" bind:value={editingItem.inputs[inputName]}/>
          {:else}
            <input type="text" bind:value={editingItem.inputs[inputName]}/>
          {/if}
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
