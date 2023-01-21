<script>
  import NodeEditor from "./NodeEditor.svelte"
  import { getContext, setContext } from "svelte"
  import actions from "./actions"
  import { pickColor } from "./colors"

  export let def
  export let kind

  let parents = getContext("parents") || []
  let self
  let openEditor
  let displayName
  let nodeTypeDefs

  setContext("parents", [...parents, def])

  actions.getMetadata().then(m => {
    if (kind === "trigger") {
      nodeTypeDefs = m.eventDefs
    } else {
      nodeTypeDefs = m.actionDefs
    }
    setDisplayName(def?.type)
  })

  function setDisplayName(actionType) {
    let actionDef = nodeTypeDefs?.find(a => a.type === actionType)
    displayName = actionDef?.title || "?"
  }
</script>

<div
  class="node hover-target {"" && "hovering"}"
  style="background-color: {pickColor(displayName)}"
  on:click={openEditor}
  bind:this={self}
>
  <div class="node-name">{displayName}</div>

  <NodeEditor
    def={def}
    rootEl={self}
    bind:open={openEditor}
    on:change-type={(e) => setDisplayName(e.detail)}
    on:remove
  />
</div>

<style>

  .node {
    background-color: black;
    padding: 50px;
    border-radius: 1000px;
    color: white;
    margin: 15px;
    position: relative;
    cursor: pointer;
    box-shadow: black 0px 1px 6px -3px;
    filter: brightness(1.1)
  }

  .node-name {
    background-color: #f9f9f9;
    padding: 0 7px;
    position: absolute;
    color: black;
    font-size: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: black 0px 1px 7px -4px;
  }

  .svg-path {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: -10;
    width: 10px;
    overflow: visible;
  }

  .hovering {
    border: 3px solid lightblue;
    padding: 47px;
  }
</style>
