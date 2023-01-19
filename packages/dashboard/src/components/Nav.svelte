<script lang="ts">
  import { onDestroy } from "svelte";
  import navManager from "../utils/NavManager"

  let activeNavItem: string

  navManager.onUrlChange(onUrlChange, onDestroy)

  function onUrlChange() {
    if (location.pathname.includes('monitor')) {
      activeNavItem = 'Monitor'
    } else {
      activeNavItem = 'Author'
    }
  }
</script>

<nav class="nav-bar">
  <div class="nav-banner" on:click={() => navManager.setUrl('/')}>
    <span class="brand-segment-ctrl">ctrl</span><span class="brand-segment-plus">+</span><span class="brand-segment-flow">flow</span>
  </div>
  <div class="nav-items">
    <div
      class="nav-item"
      class:nav-active={activeNavItem === 'Author'}
      on:click={() => navManager.setUrl('/')}
    >
      Author
    </div>
    <div
      class="nav-item"
      class:nav-active={activeNavItem === 'Monitor'}
      on:click={() => navManager.setUrl('/monitor')}
    >
      Monitor
    </div>
  </div>
</nav>

<style>
  .nav-bar {
    width: 100%;
    height: 60px;
    background-color: black;
    box-shadow: 0 -10px 15px;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 5vw;
  }

  .nav-banner {
    display: inline-block;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }

  .brand-segment-ctrl {
    /* font-weight: 800; */
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
    /* color: rgb(234, 136, 0); */
  }

  .brand-segment-plus {
    font-weight: 400;
    font-family: 'Source Code Pro', monospace;
    margin-left: -2px;
    margin-right: -2px;
    font-size: 20px;
    transform: translateY(-1px);
    display: inline-block;
  }

  .brand-segment-flow {
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
  }

  .nav-items {
    display: inline-block;
    font-family: 'Roboto Flex', sans-serif;
    margin-left: 80px;
  }

  .nav-item {
    display: inline-block;
    margin-right: 30px;
    font-size: 22px;
    font-weight: 300;
    cursor: pointer;
  }

  .nav-active {
    font-weight: 500;
  }
</style>
