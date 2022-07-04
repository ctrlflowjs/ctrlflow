<script>
  import { onMount, createEventDispatcher } from "svelte"
  import { getMetadata } from "../editor/actions"

  export let node;

  const dispatch = createEventDispatcher();

  let metadata = { eventDefs: [], actionDefs: [] }

  onMount(async () => {
    metadata = await getMetadata()
  })

  function getNodeDefs() {
    let nodeDefs = node.kind === 'trigger' ? metadata.eventDefs : metadata.actionDefs
    return nodeDefs || []
  }

  function getActionInputs() {
    let nodeDefs = getNodeDefs()
    let def = nodeDefs.find(x => x.type === node.type)
    let keys = Object.keys(def.inputSchema.properties)
    return keys.map(k => ({ inputName: k, inputDef: def.inputSchema.properties[k] }))
  }
</script>

<div class="item-editor-sidebar">
  <button class="close-editor btn" type="button" on:click={() => dispatch('close')}>Close</button>
  <h3>Edit {node.kind === 'trigger' ? 'Trigger' : 'Action'}</h3>
  <div>
    {#if metadata}
      <select bind:value={node.type}>
        <option></option>
        {#each (node.kind === 'trigger' ? metadata.eventDefs : metadata.actionDefs) || [] as option}
          <option value={option.type}>{option.title}</option>
        {/each}
      </select>
    {/if}
  </div>

  {#if node.kind === 'action' && node.type}
    {#each getActionInputs() as { inputName, inputDef }}
      <p>
        <label for="">
          <span>{inputDef.title}</span>
          {#if inputDef.type === 'number'}
            <input type="number" bind:value={node.inputs[inputName]}/>
          {:else}
            <input type="text" bind:value={node.inputs[inputName]}/>
          {/if}
        </label>
      </p>
    {/each}
  {/if}
</div>

<style>
  .item-editor-sidebar {
    min-width: 300px;
    max-width: 700px;
    width: 40%;
    border-left: 1px solid gainsboro;
    z-index: 1;
    background-color: rgb(245, 245, 245);
    padding: 10px;
    box-shadow: 3px 0px 15px -10px;
  }

  .close-editor {
    float: right;
  }

  .btn {
    font-size: 18px;
    font-weight: 300;
    margin-left: 15px;
    border: 1px solid gainsboro;
    padding: 5px 10px 5px 10px;
    border-radius: 2px;
    vertical-align: middle;
    box-shadow: 0px 2px 10px -8px;
    background-color: rgb(250, 250, 250);
  }

  .btn:hover {
    cursor: pointer;
  }

</style>
