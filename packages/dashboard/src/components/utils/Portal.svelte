<!-- Taken from https://github.com/romkor/svelte-portal/blob/a650e7b762344a1bb0ad9e218660ed1ee66e3f90/src/Portal.svelte -->
<script context="module">
  import { tick } from "svelte";

  export function portal(originEl, target = "body") {
    let el = originEl.children[0]
    let targetEl;
    async function update(newTarget) {
      target = newTarget;
      if (typeof target === "string") {
        targetEl = document.querySelector(target);
        if (targetEl === null) {
          await tick();
          targetEl = document.querySelector(target);
        }
        if (targetEl === null) {
          throw new Error(
            `No element found matching css selector: "${target}"`
          );
        }
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      } else {
        throw new TypeError(
          `Unknown portal target type: ${
            target === null ? "null" : typeof target
          }. Allowed types: string (CSS selector) or HTMLElement.`
        );
      }
      targetEl.appendChild(el);
      el.hidden = false;
    }

    function destroy() {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }

    let absOriginDim = getDimensions(originEl)
    el.setAttribute("style", `
      position: absolute;
      left: ${absOriginDim.offsetLeft}px;
      top: ${absOriginDim.offsetTop}px;
      width: ${originEl.offsetParent.offsetWidth}px;
      height: ${originEl.offsetParent.offsetHeight}px;
    `)

    update(target);
    return {
      update,
      destroy,
    };
  }

  function getDimensions(el) {
    let { offsetTop, offsetLeft } = el
    if (el.offsetParent) {
      let parentDimensions = getDimensions(el.offsetParent)
      offsetTop += parentDimensions.offsetTop
      offsetLeft += parentDimensions.offsetLeft
    }
    return { offsetTop, offsetLeft }
  }
</script>

<script>
  export let target = "body";
</script>

<div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
  <div use:portal={target}>
    <div hidden>
      <slot />
    </div>
  </div>
</div>
