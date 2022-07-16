<script>
  import { getContext } from "svelte";

  export let def
  $: {
    if (!def.settings) {
      def.settings = {
        actionId: null,
        outputName: null
      }
    }
  }

  let parents = [...getContext("parents")]
  let prevSteps = getParentsPreviousSteps(parents.pop(), parents).reverse()

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
  <select bind:value={def.settings.actionId}>
    <option value={undefined}>Select Action</option>
    {#each prevSteps as prevAction}
      <option value={prevAction}>{prevAction.type}</option>
    {/each}
  </select>
  <div>
    Output:
  </div>
  <select bind:value={def.settings.outputName}>
    <option value={undefined}>Select</option>
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
