<script lang="ts">
	import WorkflowLookup from "./pages/WorkflowLookup.svelte";
  import WorkflowEditor from "./pages/editor/Workflow.svelte";
  import historyContext from "../components/context/history"
  import { onMount } from "svelte";
  import type { ComponentType } from "svelte";

  const history = historyContext.get()

  // function routeRegex(urlTemplate) {
  //   let pathRegex = location.pathname
  //     .trim()
  //     .split("/")
  //     .filter(Boolean)
  //     .map((segment) => segment[0] === ':' ? '([^\\/]+)' : segment)
  //     .join('\\/*') // slash regex
  //
  //   return new RegExp(`^${pathRegex}$`)
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
  let component: ComponentType|null = null

  onMount(loadPage)

  function loadPage() {
    [component, props] = getRoutedComponent(window.location)
  }

  function getRoutedComponent(location: Location): [ComponentType, {}] {
    const path = location.pathname.trim().split("/").filter(Boolean).join("/").toLowerCase()
    const queryParams = new URLSearchParams(location.search)

    if (path === "workflow") {
      const workflowId = queryParams.get("workflow-id")
      return [WorkflowEditor, { workflowId }]
    }

    return [WorkflowLookup, {}]
  }
</script>

<svelte:window on:popstate={loadPage} />

<svelte:component this={component} {...props} />
