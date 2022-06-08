<script>
  import LowcodeEditor from "../molecules/LowcodeEditor.svelte";
  import { getMetadata, getAllWorkflows } from "../molecules/actions";

  let selectedWorkflow;
  let metadata;
  let workflows = []

  $: {
    if (!selectedWorkflow) {
      getAllWorkflows().then(wf => workflows = wf)
    }
  }

  $: {
    if (!metadata) {
      getMetadata().then(m => {console.log(m), metadata = m})
    }
  }
</script>

{#if selectedWorkflow}
  <button class="close-workflow" type="button" on:click={() => selectedWorkflow = null}>❌</button>
  <LowcodeEditor workflow={selectedWorkflow}/>
{:else}
  <h2 class="section-name">
    Workflows
    <span class="create-workflow" on:click={() => selectedWorkflow = {}}>
      New +
    </span>
  </h2>
  <div class="section-container">
    <table class="section-table">
      <tr height="60px" class="section-header">
        <th>Title</th>
        <th>Type</th>
        <th>Last Modified</th>
      </tr>
      {#each workflows as workflow}
        <tr class="section-row" height="40px" on:click={() => selectedWorkflow = workflow}>
          <td>{workflow.title}</td>
          <td>{workflow.type}</td>
          <td>{workflow.lastModifiedAt}</td>
        </tr>
      {/each}
    </table>
  </div>

  <h2 class="section-name">
    Components
  </h2>
  <div class="components-section">
    <div class="component-col">
      <div class="component-col-header">Events</div>
      {#each metadata?.eventDefs || [] as event}
        <div class="component-col-row">{event.title}</div>
      {/each}
    </div>
    <div class="component-col">
      <div class="component-col-header">Actions</div>
      {#each metadata?.actionDefs || [] as action}
        <div class="component-col-row">{action.title}</div>
      {/each}
    </div>
    <div class="component-col">
      <div class="component-col-header">Templates</div>
      {#each metadata?.workflowDefs || [] as workflow}
        <div class="component-col-row">{workflow.title}</div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .section-name {
    font-family: 'Roboto', 'sans-serif';
    font-weight: 400;
    font-size: 40px;
    margin-left: 10px;
  }

  .create-workflow {
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

  .section-container {
    width: 100%;
    min-height: 300px;
    border: 1px solid gainsboro;
    border-radius: 2px;
    background-color: rgb(250, 250, 250);
    box-shadow: 0px 3px 20px -12px;
    padding: 0 15px 15px 15px;
    margin-bottom: 30px;
  }

  .section-table {
    width: 100%;
    border-collapse: collapse;
  }

  .section-header {
    text-align: left;
    padding-bottom: 10px;
  }

  .section-row {
    max-height: 20px;
  }

  .section-row:hover {
    cursor: pointer;
    background-color: rgb(229, 227, 227);
  }

  .create-workflow:hover {
    cursor: pointer;
  }

  .close-workflow {
    float: right;
  }

  .components-section {
    display: flex;
  }

  .component-col {
    width: calc(100% / 3);
    padding: 20px;
    border: 1px solid gainsboro;
    border-radius: 2px;
    background-color: rgb(250, 250, 250);
    box-shadow: 0px 3px 20px -12px;
  }

  .component-col:not(:last-child) {
    margin-right: 15px;
  }

  .component-col-header {
    font-size: 20px;
    font-weight: 500;
  }

  .component-col-row {
    margin-top: 10px;
  }

  .section-row > *:first-child, .section-header > *:first-child {
    padding-left: 15px;
  }
</style>
