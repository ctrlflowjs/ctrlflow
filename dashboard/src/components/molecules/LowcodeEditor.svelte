<script>
  import { flip } from "svelte/animate"
  import NodeEditor from "./NodeEditor.svelte"
  import { onMount, createEventDispatcher } from "svelte"
  import { getMetadata, createWorkflow, updateWorkflow } from "./actions"

  export let workflow;

  const dispatch = createEventDispatcher();

  let title;
  let trigger = { 'kind': 'trigger' }
  let actions = []
  let editingNode;

  $: {
    if (workflow?.nodes) {
      trigger =  { ...workflow.nodes[0] }
      // actions = workflow.nodes.slice(1).map(node => ({ ...node }))
    }
  }

  function addAction() {
    actions.push({
      kind: 'action',
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
    editingNode = item
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


<div class="workflow-editor">
  <div class="workflow-view-panel">
    <div class="workflow-view-container">
      <p style="float: right;">
        <button class="close-workflow btn" type="button" on:click={() => dispatch('close')}>Close</button>
        <button type="button" class="action-editor-save-btn btn" on:click={saveWorkflow}>Save</button>
      </p>
      <input class="title-input" type="text" bind:value={title} placeholder="Title"/>
      <div class="node-flow">
        <div class="node empty trigger" on:click={() => editingNode = trigger}>
          Add Trigger +
        </div>
        {#each actions as action}
          <div class="node action" on:click={() => editingNode = action}>
            Action
          </div>
        {/each}
        <div class="node empty action" on:click={addAction}>
          Add Action +
        </div>
      </div>
    </div>
  </div>
  {#if editingNode}
    <NodeEditor node={editingNode} on:close={() => editingNode = null}/>
  {/if}
</div>

<style>
  .workflow-editor {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    height: 100%
  }

  .workflow-view-panel {
    padding-top: 35px;
    min-width: 700px;
    flex-grow: 5;
  }

  .workflow-view-container {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .title-input {
    border: none;
    outline: none;
		background-color: rgb(245, 245, 245);
    font-size: 36px;
    width: 700px;
    font-weight: 300;
  }

  .node-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
  }

  .node {
    min-width: 200px;
    padding: 10px 5px 10px 5px;
    border: 1px solid gainsboro;
    text-align: center;
    margin-bottom: 30px;
    cursor: pointer;
    box-shadow: 0px 3px 10px -10px;
    background-color: #8ebfe7;
    position: relative;
  }

  .node.empty {
    box-shadow: none;
    border: 1.5px dashed;
  }

  .node.trigger.empty {
		background-color: #e8eee7;
    border-color: #90b684;
  }

  .node.action.empty {
		background-color: #e7e9ee;
    border-color: #63658f;
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
