<script>
  import Expression from "../Expression.svelte"

  export let def

  $: if (!def.inputs) {
    def.inputs = {
      firstCondition: { kind: "expression" },
      secondCondition: { kind: "expression" }
    }
  }

  $: if (!def.settings) {
    def.settings = {
      conditionGroupType: "and"
    }
  }
</script>

<div class="and-or-expression">
  <div>
    <Expression def={def.inputs.firstCondition}/>
  </div>
  <select bind:value={def.settings.conditionGroupType}>
    <option value="and">AND</option>
    <option value="or">OR</option>
  </select>
  <div>
    <Expression def={def.inputs.secondCondition}/>
  </div>
</div>

<style>
  .and-or-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid rgb(129, 70, 255);
    flex-wrap: wrap;
    padding: 7px;
    background-color: rgb(243 237 255);
    gap: 7px 7px;
    border-radius: 2px;
  }
</style>
