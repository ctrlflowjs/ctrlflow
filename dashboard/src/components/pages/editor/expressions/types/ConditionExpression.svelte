<script>
  import Expression from "../Expression.svelte"

  export let def
  $: {
    if (!def.inputs) {
      def.inputs = {
        firstValue: { kind: "expression" },
        secondValue: { kind: "expression" }
      }
    }
    if (!def.settings) {
      def.settings = {
        conditionType: "=="
      }
    }
  }
</script>

<div class="condition-expression">
  <div>
    <Expression def={def.inputs.firstValue}/>
  </div>
  <select bind:value={def.settings.conditionType}>
    <option value="==">Equals</option>
    <option value="<">Is Less Than</option>
    <option value=">">Is Greater Than</option>
  </select>
  <div>
    <Expression def={def.inputs.secondValue}/>
  </div>
</div>

<style>
  .condition-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid rgb(129, 70, 255);
    flex-wrap: wrap;
    padding: 7px;
    background-color: rgb(243 237 255);
    gap: 7px 7px;
    border-radius: 2px;
  }

  .section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 7px 7px;
  }
</style>
