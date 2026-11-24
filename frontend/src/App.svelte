<script>
  console.log('running...');

  let healthCheck = $state('not fetched...');

  async function handleFetchHealth() {
    const response = await fetch('/api/health');
    const result = await response.json();
    console.log(result);
    healthCheck = result.data;
  }
</script>

<h1>Home Page</h1>
<button onclick={handleFetchHealth}>Fetch health</button>
<h2>Health: {healthCheck}</h2>