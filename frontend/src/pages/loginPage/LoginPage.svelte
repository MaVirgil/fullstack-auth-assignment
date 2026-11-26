<script>
  import Navbar from '../../components/Navbar.svelte';
  import LoginForm from './components/LoginForm.svelte';
  import authFetch from '../../util/authFetch.js';

  let loading = $state(false);
  let authErrors = $state([]);

  async function handleLoginFormSubmit(formData) {
    console.log('running login function...');
    loading = true;
    const emailInput = formData.get('email');
    const passwordInput = formData.get('password');
    
    const result = await authFetch.login(emailInput, passwordInput);

    if (result.error) {
      authErrors = result.error;
      loading = false;
      return;
    }

    console.log('logged in...');
    loading = false;
  }
</script>

<Navbar />
<h1>Log in page</h1>
<div class="login-form-container">
  <LoginForm onSubmit={handleLoginFormSubmit} disabled={loading}/>
</div>

<style>
  .login-form-container {
    width: 270px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
  }
</style>
