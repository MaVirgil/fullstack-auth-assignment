<script>
  import Form from "../../../components/Form.svelte";

  const { onSubmit, disabled = false } = $props();  
  let email = $state(undefined);
  let password = $state(undefined);
</script>

<Form onSubmit={onSubmit} {disabled}>
  <div class="input-container">
    <label for="email-input">Email</label>
    <input
      id="email-input"
      type="email"
      name="email"
      required
      placeholder="email@example.org"
      bind:value={email}
    />
  </div>
  <div class="input-container">
    <label for="password-input">Password</label>
    <input
      id="password-input"
      type="password"
      name="password"
      required
      placeholder="password..."
      bind:value={password}
    />
  </div>
  <button>Submit</button>
</Form>

<style>
  label {
    text-align: start;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
</style>