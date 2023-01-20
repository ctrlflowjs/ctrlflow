<script lang="ts">
  import actions from "../../editor/actions"

  let metadata: any
  let events: any[] = []
  let workflowRuns: any[] = []
  let activeSection: string = "workflow-runs"
  let pageSize: number = 10
  let nextPageToken: number = 0
  let lastActiveSection = activeSection

  $: {
    if (activeSection !== lastActiveSection) {
      lastActiveSection = activeSection
      pageSize = 10
      nextPageToken = 0
    }
  }

  $: {
    if (activeSection === "events") {
      actions.getAllEvents(nextPageToken.toString(), pageSize)
        .then(e => events = e)
    }
  }

  $: {
    if (activeSection === "workflow-runs") {
      actions.getAllWorkflowRuns(nextPageToken.toString(), pageSize)
        .then(wr => workflowRuns = wr)
    }
  }

  $: {
    if (!metadata) {
      actions.getMetadata().then(m => metadata = m)
    }
  }
</script>

<div class="content-area">
  <div>
    <h2
      class="section-name section-name-workflow-runs"
      class:section-active={activeSection === 'workflow-runs'}
      on:click={() => activeSection = 'workflow-runs'}
    >
      Workflow Runs
    </h2>
    <h2
      class="section-name section-name-events"
      class:section-active={activeSection === 'events'}
      on:click={() => activeSection = 'events'}
    >
      Events
    </h2>
  </div>

  {#if activeSection === 'workflow-runs'}
    <div class="section-container">
      <table class="section-table">
        <tr height="60px" class="section-header">
          <th>Workflow</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Trigger</th>
        </tr>
        {#each workflowRuns as workflowRun}
          <tr class="section-row" height="40px">
            <td>{workflowRun.workflow.title}</td>
            <td>{workflowRun.createdAt}</td>
            <td>{workflowRun.status}</td>
            <td>{workflowRun.trigger.title}</td>
          </tr>
        {/each}
      </table>
    </div>
  {:else if activeSection === 'events'}
    <div class="section-container">
      <table class="section-table">
        <tr height="60px" class="section-header">
          <th>Event</th>
          <th>Occured At</th>
          <!-- <th>Workflows Triggered</th> -->
        </tr>
        {#each events as event}
          <tr class="section-row" height="40px">
            <td>{event.type}</td>
            <td>{event.createdAt}</td>
            <!-- <td>{event.lastModifiedAt}</td> -->
          </tr>
        {/each}
      </table>
    </div>
  {/if}
  <div>
    <button
      on:click={() => nextPageToken = nextPageToken - pageSize}
      disabled={nextPageToken <= 0}
    >
      Previous Page
    </button>
    <button on:click={() => nextPageToken = nextPageToken + pageSize}>Next Page</button>
    <select bind:value={pageSize}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>
</div>

<style>
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

  .section-name-workflow-runs {
    width: 193px;
    text-align: center;
  }

  .section-name-events {
    width: 81px;
    text-align: center;
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
