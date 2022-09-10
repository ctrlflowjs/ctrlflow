<!-- Taken from https://github.com/romkor/svelte-portal/blob/a650e7b762344a1bb0ad9e218660ed1ee66e3f90/src/Portal.svelte -->
<script context="module"  lang="ts">
  import { tick } from "svelte";

  export function portal(originEl: HTMLElement, target: string|HTMLElement|null = "body") {
    let el: HTMLElement = originEl.children[0] as HTMLElement
    let targetEl: Element|null
    async function update(newTarget: string|HTMLElement|null) {
      target = newTarget
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
        )
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
    const offsetParent = originEl.offsetParent as HTMLElement
    el.setAttribute("style", `
      position: absolute;
      left: ${absOriginDim.offsetLeft}px;
      top: ${absOriginDim.offsetTop}px;
      width: ${offsetParent.offsetWidth}px;
      height: ${offsetParent.offsetHeight}px;
    `)

    update(target);
    return {
      update,
      destroy,
    };
  }

  function getDimensions(el: HTMLElement) {
    let { offsetTop, offsetLeft } = el
    const offsetParent = el.offsetParent as HTMLElement|null
    if (offsetParent) {
      let parentDimensions = getDimensions(offsetParent)
      offsetTop += parentDimensions.offsetTop
      offsetLeft += parentDimensions.offsetLeft
    }
    return { offsetTop, offsetLeft }
  }
</script>

<script lang="ts">
  export let target = "body";
</script>

<div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
  <div use:portal={target}>
    <div hidden>
      <slot />
    </div>
  </div>
</div>
