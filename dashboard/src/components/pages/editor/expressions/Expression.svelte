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

  function remove() {
    def.type = undefined
    def.inputs = {}
  }
</script>

<div
  bind:this={self}
  class="expression-root hover-target {"" && "hovering"}"
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

  {#if expression}
    <div class="remove-btn">
      <button type="button" on:click={remove}>Remove</button>
    </div>
  {/if}
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

  .remove-btn {
    position: absolute;
    top: 0;
    transform: translate(-50%, -100%);
    left: 50%;
    display: none;
  }

  .hovering > .remove-btn {
    display: block;
  }
</style>
