<script>
  import Form from "../../../components/Form.svelte";

  const { onSubmit } = $props();  
  let email = $state(undefined);
  let password = $state(undefined);
</script>

<Form onSubmit={onSubmit}>
  <label for="email-input">Email</label>
  <input
    id="email-input"
    type="email"
    name="email"
    required
    placeholder="email@example.org"
    bind:value={email}
  />
  <label for="password-input">Password</label>
  <input
    id="password-input"
    type="password"
    name="password"
    required
    placeholder="password..."
    bind:value={password}
  />
  <button>Submit</button>
</Form>