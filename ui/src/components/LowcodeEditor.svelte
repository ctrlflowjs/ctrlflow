<script>
  import cx from "classnames";

  let active = false;
  let editor;
</script>

<div
  class={cx("editor-root", { active })}
  bind:this={editor}
  on:fullscreenchange={() => {
    if (!document.fullscreenElement) {
      active = false;
    }
  }}
>
  <div
    class={cx("panel", { active })}
    on:click={() => {
      editor.requestFullscreen();
      active = true
    }}
  />
  <iframe
    src="http://localhost:5678/workflow"
    width="100%"
    height="100%"
    title="editor"
    class={cx({ active })}
  />
</div>

<style>
  iframe {
    border: 1px solid lightgray;
  }

  iframe:not(.active) {
    pointer-events: none;
  }

  .editor-root {
    position: relative;
    height: 250px;
    width: 500px;
  }

  .panel:not(.active) {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    cursor: pointer;
  }
</style>
