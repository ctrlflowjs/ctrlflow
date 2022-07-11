<script>
  import actions from "./actions"
  import Path from "./Path.svelte"
  import Triggers from "./Triggers.svelte"
  import { createEventDispatcher, getContext } from "svelte"

  export let workflowId

  let workflow

  actions.getWorkflow(workflowId).then(w => workflow = w)

  let history = getContext('history')

  let workflowJSON
  $: {
    workflowJSON = JSON.stringify(workflow || null, null, 2)
  }

  async function saveWorkflow() {
    let newWorkflow = {
      ...workflow,
      lastModifiedAt: (new Date()).toLocaleString(),
    }
    if (workflow.id) {
      workflow = await actions.updateWorkflow(workflow.id, newWorkflow)
    } else {
      workflow = await actions.createWorkflow(newWorkflow)
    }
  }

  function close() {
    history.pushState('/')
  }
</script>

{#if workflow}
  <div class="workflow-editor">
    <div class="workflow-view-panel">
      <div class="workflow-view-container">
        <p style="float: right;">
          <button class="close-workflow btn" type="button" on:click={close}>Close</button>
          <button type="button" class="action-editor-save-btn btn" on:click={saveWorkflow}>Save</button>
        </p>
        <input class="title-input" type="text" bind:value={workflow.title} placeholder="Title"/>
        <div class="node-flow">
          <div class="section-headers">Triggers</div>
          <Triggers triggers={workflow.triggers} />
          <div class="section-headers">Workflow</div>
          <Path def={workflow.path} />
        </div>
      </div>
    </div>
  </div>
  <div id="action-editor-portal"></div>

  <div class="json-viewer">
    <code>
      <div><button type="button" on:click={() => workflow = workflow}>Refresh</button></div>
      {workflowJSON}
    </code>
  </div>
{/if}

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
    padding-top: 10px;
  }

  .section-headers {
    font-size: 24px;
    font-weight: 300;
    text-align: left;
    width: 100px;
    margin: 10px;
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

  .json-viewer {
    white-space: pre;
    background-color: white;
    color: gray;
    margin-top: 20px;
  }
</style>
