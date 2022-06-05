<script>
  import LowcodeEditor from "../molecules/LowcodeEditor.svelte";
  import { getAllWorkflows } from "../molecules/actions";

  let selectedWorkflow;
  let workflows = []

  $: {
    if (!selectedWorkflow) {
      getAllWorkflows().then(wf => workflows = wf)
    }
  }
</script>

{#if selectedWorkflow}
  <button class="close-workflow" type="button" on:click={() => selectedWorkflow = null}>❌</button>
  <LowcodeEditor workflow={selectedWorkflow}/>
{:else}
  <p>
    <button class="create-workflow" type="button" on:click={() => selectedWorkflow = {}}>
      ➕ New Workflow
    </button>
  </p>
  <h2>Workflows</h2>
  <div>
    {#each workflows as workflow}
      <div class="workflow-item">
        <span class="workflow-name">{workflow.name}</span>
        <button type="button" on:click={() => selectedWorkflow = workflow}>
          ✏️
        </button>
      </div>
    {/each}
  </div>
{/if}

<style>
  .workflow-name {
    width: 100px;
    display: inline-block;
  }

  .close-workflow {
    float: right;
  }
</style>
