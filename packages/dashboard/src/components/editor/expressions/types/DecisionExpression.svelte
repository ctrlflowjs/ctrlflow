<script>
  import Expression from "../Expression.svelte"

  export let def

  $: if (!def.inputs) {
    def.inputs = {
      condition: { kind: "expression" },
      trueValue: { kind: "expression" },
      falseValue: { kind: "expression" }
    }
  }
</script>

<div class="decision-expression">
  <div>
    <div>If</div>
    <div>
      <Expression def={def.inputs.condition}/>
    </div>
  </div>
  <div>
    <div>Then</div>
    <div>
      <Expression def={def.inputs.trueValue}/>
    </div>
  </div>
  <div>
    <div>Else</div>
    <div>
      <Expression def={def.inputs.falseValue}/>
    </div>
  </div>
</div>

<style>
  .decision-expression {
    display: flex;
    flex-direction: row;
    border: 1.75px solid rgb(129, 70, 255);
    flex-wrap: wrap;
    padding: 7px;
    background-color: rgb(243 237 255);
    gap: 7px 7px;
    border-radius: 2px;
  }

  .decision-expression > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 7px 7px;
  }
</style>
