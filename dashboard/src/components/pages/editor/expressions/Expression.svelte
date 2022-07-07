<script>
  import expressions from "./expressions"
  import ExpressionSelector from "./ExpressionSelector.svelte"

  export let def
  $: {
    if (def?.type !== expression?.type) {
      expression = expressions.categories[0].expressions.find(x => x.type === def.type)
    }
  }

  let expression

  let self
  let openSelector

  function receiveSelection(e) {
    // TODO mutate existing value
    expression = e.detail
    def.type = e.detail.type
  }
</script>

<div
  bind:this={self}
  class="expression-root"
>
  {#if expression}
    <svelte:component this={expression.component} def={def} />
  {:else}
    <div class="empty-expression" on:click={openSelector}>
    </div>
  {/if}
  <ExpressionSelector
    rootEl={self}
    bind:open={openSelector}
    on:selection={receiveSelection}
  />
</div>

<style>
  .empty-expression {
    background-color: white;
    display: block;
    min-width: 70px;
    min-height: 24px;
    border: 1px solid black;
    border-radius: 3px;
  }

  .expression-root {
    position: relative;
  }
</style>
