<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import type { ComponentType } from "svelte"
  import HomePage from "./HomePage.svelte"
  import Workflow from "../editor/Workflow.svelte"
  import MonitorPage from "./monitor/MonitorPage.svelte"
  import navManager from "../../services/NavManager"
    import EditWorkflowPage from "./workflow/EditWorkflowPage.svelte";

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

  let props = {}
  let component: ComponentType

  navManager.onUrlChange(() => {
    loadPage()
  }, onDestroy)

  onMount(loadPage)

  function loadPage() {
    [component, props] = getRoutedComponent(window.location)
  }

  function getRoutedComponent(location: Location): [ComponentType, {}] {
    const path = location.pathname.trim().split("/").filter(Boolean).join("/").toLowerCase()
    const queryParams = new URLSearchParams(location.search)

    if (path === "workflow") {
      const workflowId = queryParams.get("workflow-id")
      return [EditWorkflowPage, { workflowId }]
    }

    if (path === "monitor") {
      return [MonitorPage, {}]
    }

    return [HomePage, {}]
  }
</script>

<svelte:window on:popstate={loadPage} />

<svelte:component this={component} {...props} />
