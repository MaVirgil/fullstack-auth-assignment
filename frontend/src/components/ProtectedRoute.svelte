<script>
  import { Route } from 'svelte-routing'
  import Redirect from './Redirect.svelte';
  const { path, children, allow = true } = $props();
</script>

<Route path={path}>
  {#if !allow}
    <Redirect to='/'/>
  {:else}
    {@render children()}
  {/if}
</Route>
