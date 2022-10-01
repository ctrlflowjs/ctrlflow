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
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300;1,400;1,700&family=Source+Code+Pro:wght@300;600;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@100;300;400;500&display=swap');

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
    /* font-weight: 400;
    font-family: 'Lato', sans-serif; */
    /* font-size: 28px; */
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
    /* font-style: italic;
    font-variant-ligatures: common-ligatures; */
  }

  .nav-items {
    display: inline-block;
    font-family: 'Roboto', sans-serif;
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
