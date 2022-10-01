<script lang="ts">
  import actions from "./editor/actions"
  import navManager from "../../utils/NavManager"

  let metadata: any
  let events: any[] = []
  let activeSection: string = "workflow-runs"

  $: {
    actions.getAllEvents().then(e => events = e)
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
      class="section-name"
      class:section-active={activeSection === 'workflow-runs'}
      on:click={() => activeSection = 'workflow-runs'}
    >
      Workflow Runs
    </h2>
    <h2
      class="section-name"
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
          <th>Ran At</th>
          <th>Status</th>
          <th>Trigger</th>
        </tr>
        {#each [{}] as workflow}
          <tr class="section-row" height="40px">
            <td>{workflow.title}</td>
            <td>{workflow.lastModifiedAt}</td>
            <td>{workflow.lastModifiedAt}</td>
            <td>{workflow.lastModifiedAt}</td>
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
    font-family: 'Roboto', 'sans-serif';
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
    min-height: 30vh;
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
