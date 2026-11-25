<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  const { to } = $props();

  onMount(() => {
    console.log('redirecting...');
    navigate(to, { replace: true });
  });

</script>