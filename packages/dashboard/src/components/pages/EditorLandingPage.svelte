<script lang="ts">
  import actions from "./editor/actions"
  import navManager from "../../utils/NavManager";

  let selectedWorkflow: any
  let metadata: any[]
  let workflows: any[] = []

  $: {
    if (!selectedWorkflow) {
      actions.getAllWorkflows().then(wf => workflows = wf)
    }
  }

  $: {
    if (!metadata) {
      actions.getMetadata().then(m => metadata = m)
    }
  }

  function createWorkflow() {
    navManager.setUrl('/workflow/')
  }

  function openWorkflow(workflowId: string) {
    navManager.setUrl(`/workflow/?workflow-id=${workflowId}`)
  }
</script>

<div class="content-area">
  <h2 class="section-name section-active">
    Workflows
    <span class="btn" on:click={createWorkflow}>
      New +
    </span>
  </h2>
  <div class="section-container">
    <table class="section-table">
      <tr height="60px" class="section-header">
        <th>Title</th>
        <!-- <th>Type</th> -->
        <th>Last Modified</th>
      </tr>
      {#each workflows as workflow}
        <tr class="section-row" height="40px" on:click={() => openWorkflow(workflow.id)}>
          <td>{workflow.title}</td>
          <!-- <td>{workflow.type}</td> -->
          <td>{workflow.lastModifiedAt}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>

<style>
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

	.content-area {
		padding: 35px 50px 35px 50px;
		max-width: 1100px;
		margin-right: auto;
		margin-left: auto;
    margin-top: 20px;
	}

  .section-name {
    font-family: 'Roboto Flex', 'sans-serif';
    font-weight: 300;
    font-size: 30px;
    display: inline-block;
    margin: 5px 12px;
    cursor: pointer;
  }

  .section-name.section-active {
    font-weight: 500;
  }

  .section-container {
    width: 100%;
    max-height: 475px;
    min-height: 30vh;
    overflow-y: scroll;
    background-color: rgb(250, 250, 250);
    box-shadow: 0px 2px 13px -2px #00000040;
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

  .section-header th {
    font-weight: 500;
  }

  .section-row {
    max-height: 20px;
    font-weight: 300;
  }

  .section-row:hover {
    cursor: pointer;
    background-color: rgb(239, 239, 239);
  }

  .section-row > *:first-child, .section-header > *:first-child {
    padding-left: 15px;
  }
</style>
