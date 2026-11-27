<script>
  import { Route } from 'svelte-routing'
  import Redirect from './Redirect.svelte';
  import { auth } from '../stores/authStore.js';

  const { path, children } = $props();
</script>

<Route path={path}>
  {#if $auth.loading}
    <h2>Loading</h2> <!-- TODO: replace with spinner -->
  {:else if !$auth.user}
    <Redirect to='/'/>
  {:else}
    {@render children()}
  {/if}
</Route>
