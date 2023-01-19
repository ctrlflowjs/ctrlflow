<script>
  import { getContext } from "svelte";

  export let def

  let metadata = getContext("metadata")
  let parents = [...getContext("parents")]
  let triggers = [...getContext("triggers")]
  let prevSteps = getParentsPreviousSteps(parents.pop(), parents).reverse()
  let action = prevSteps.find(x => x.id === def.settings?.actionId)
  let outputSchema

  $: if (!def.settings) {
    def.settings = {
      actionId: undefined,
      outputName: undefined
    }
  }

  $: if (action?.kind === "trigger") {
    outputSchema = $metadata?.eventDefs.find(x => x.type === action?.type)?.inputSchema
  } else {
    outputSchema = $metadata?.actionDefs.find(x => x.type === action?.type)?.outputSchema
  }

  // when the component is created, it should display the action
  // when the action is modified, it should persist to the workflow

  function getParentsPreviousSteps(step, parents) {
    let parent = parents.pop()
    if (parent.kind === "workflow") {
      return []
    }
    if (parent.kind === "path") {
      const stepIndex = parent.steps.indexOf(step)
      let prevSteps = parent.steps
        .slice(0, stepIndex)
        .filter(x => x.kind === "action")
      return [
        ...getParentsPreviousSteps(parent, parents),
        ...prevSteps
      ]
    }
    return getParentsPreviousSteps(parent, parents)
  }
</script>

<div class="ref-expression">
  <select bind:value={action}>
    <option disabled={true} value={undefined}>Select</option>
    {#if prevSteps?.length}
      <optgroup label="Actions">
        {#each prevSteps as prevAction}
          <option value={prevAction}>{prevAction.type}</option>
        {/each}
      </optgroup>
    {/if}
    <optgroup label="Triggers">
      {#each triggers as trigger}
        <option value={trigger}>{trigger.type}</option>
      {/each}
    </optgroup>
  </select>
  <div>
    Output:
  </div>
  <select bind:value={def.settings.outputName}>
    <option disabled={true} value={undefined}>Select</option>
    {#each Object.keys(outputSchema?.properties ?? {}) as propertyName}
      <option value={propertyName}>{outputSchema.properties[propertyName].title}</option>
    {/each}
  </select>
</div>

<style>
  .ref-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid #ff9120;
    border-radius: 2px;
    flex-wrap: wrap;
    padding: 5px;
    background-color: rgb(253 246 234);
    gap: 7px 7px;
  }
</style>
