<script>
	import WorkflowLookup from "./pages/WorkflowLookup.svelte";
  import WorkflowEditor from "./pages/editor/Workflow.svelte";
  import { getContext, onMount } from "svelte";

  let history = getContext('history')

  // const urlSlashRegex = '\\/*'
  // function route(urlTemplate) {
  //   let regexStr = '^' + urlSlashRegex
  //   for (let segment of location.pathname.trim().split("/").filter(Boolean)) {
  //     if (segment.startsWith(':')) {
  //       regexStr += '([^\\/]+)'
  //     } else {
  //       regexStr += segment
  //     }
  //     regexStr += urlSlashRegex
  //   }
  // }

  // route.add(
  //   'workflow/:workflowId/actions/:actionId',
  //   (workflowId, actionId) => [WorkflowEditor, { workflowId, actionId }]
  // )

  history.pushState = function(url) {
    window.history.pushState({}, 'lowcodeDevKit', url)
    loadPage()
  }
  history.back = window.history.back

  let props = {}
  let component = null

  onMount(() => loadPage())

  function getComponentFromRoute(location) {
    const path = location.pathname.trim().split("/").filter(Boolean).join("/").toLowerCase()
    const queryParams = new URLSearchParams(location.search)
    if (path === "workflow" && queryParams.get("workflow-id")) {
      const workflowId = queryParams.get("workflow-id")
      return [WorkflowEditor, { workflowId }]
    }

    return [WorkflowLookup, {}]
  }

  function loadPage() {
    [component, props] = getComponentFromRoute(window.location)
  }
</script>

<svelte:window on:popstate={loadPage} />

<svelte:component this={component} {...props} />
