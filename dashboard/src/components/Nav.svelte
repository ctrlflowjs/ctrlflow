<script>
  import { getContext } from "svelte";

  let history = getContext('history')
</script>

<nav class="nav-bar">
  <div class="nav-banner" on:click={() => history.pushState('/')}>
    <span class="brand-segment-lowcode">lowcode</span><span class="brand-segment-devkit">DevKit</span>
  </div>
  <div class="nav-items">
    <div class="nav-item nav-active">
      Editor
    </div>
    <div class="nav-item">
      Activity
    </div>
  </div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@100;300;400;500&display=swap');

  .nav-bar {
    width: 100%;
    height: 60px;
    background-color: rgb(36, 36, 36);
    box-shadow: 0 -10px 15px;
    display: flex;
    align-items: center;
    color: white;
  }

  .nav-banner {
    display: inline-block;
    margin-left: 45px;
    margin-right: 160px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }

  .brand-segment-lowcode {
    font-weight: 300;
    font-family: 'Roboto Mono', monospace;
  }

  .brand-segment-devkit {
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    color: rgb(234, 136, 0);
    font-size: 25px;
  }

  .nav-items {
    display: inline-block;
    font-family: 'Roboto', sans-serif;
  }

  .nav-item {
    display: inline-block;
    margin-right: 30px;
    font-size: 18px;
    font-weight: 300;
  }

  .nav-active {
    font-size: 22px;
    margin-right: 45px;
    font-weight: 400;
  }
</style>
