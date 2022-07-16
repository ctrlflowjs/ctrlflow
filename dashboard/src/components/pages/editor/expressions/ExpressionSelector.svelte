<script context="module">
  let closeOthers = () => null
</script>

<script>
  import { createEventDispatcher } from "svelte"
  import expressions from "./expressions"

  export let rootEl

  const dispatch = createEventDispatcher()

  function selectExpression(expression) {
    dispatch('selection', expression)
    close()
  }

  let show = false
  export const open = () => {
    if (!show) {
      closeOthers()
      closeOthers = close
      show = true
    }
  }
  export const close = () => {
    if (show) {
      show = false
    }
  }

  function handleGlobalClick({ target }) {
    if (show && !rootEl.contains(target)) {
      close()
    }
  }
</script>

<svelte:window on:click={handleGlobalClick} />

{#if show}
  <div class="expression-selector">
    {#each expressions.categories as expressionCategory}
      <div class="category">
        <div class="category-header">{expressionCategory.title}</div>
        <div class="category-values">
          {#each expressionCategory.expressions as expression}
            <div on:click={() => selectExpression(expression)}>
              {expression.title}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .expression-selector {
    position: absolute;
    top: calc(100% + 10px);
    left: calc(50%);
    transform: translateX(-50%);
    background-color: #fafafa;
    border: .5px solid black;
    min-width: 400px;
    z-index: 15;
    border-radius: 4px;
    cursor: default;
    color: black;
    text-align: initial;
    padding: 15px;
    box-shadow: 0px 3px 10px -10px;
  }

  .category {
    margin-bottom: 20px;
  }

  .category-header {
    padding: 5px;
    font-size: 20px;
  }

  .category-values {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .category-values > div {
    margin-right: 10px;
    margin-top: 10px;
    background-color: lightgrey;
    border: 1.2px solid lightgrey;
    padding: 3px 10px;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: content-box;
  }

  .category-values > div:hover {
    border: 1.2px solid gray;
  }
</style>
