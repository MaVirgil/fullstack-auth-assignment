<script>
  import Navbar from "../../components/Navbar.svelte";

  let health = $state('not fetched...');

  async function handleCheckHealth() {
    const response = await fetch('/api/health');
    const result = await response.json();

    console.log(result);

    health = result.data;
  }
</script>

<Navbar />
<button onclick={handleCheckHealth}>Check health</button>
<h2>Server health: {health}</h2>