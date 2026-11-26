<script>
  import Navbar from '../../components/Navbar.svelte';
  import LoginForm from './components/LoginForm.svelte';
  import { auth } from '../../stores/authStore.js';

  let loginLoading = $state(false);
  let authErrors = $state([]);

  async function handleLoginFormSubmit(formData) {
    loginLoading = true;
    const emailInput = formData.get('email');
    const passwordInput = formData.get('password');
    
    const error = await auth.login(emailInput, passwordInput);

    if (error) {
      authErrors = error;
      loginLoading = false;
      return;
    }

    console.log('logged in as:', $auth.user);

    loginLoading = false;
  }
</script>

<Navbar />
<h1>Log in page</h1>
<h2>Auth loading: {$auth.loading}</h2>
<div class="login-form-container">
  <LoginForm onSubmit={handleLoginFormSubmit} disabled={loginLoading}/>
</div>

<style>
  .login-form-container {
    width: 270px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
  }
</style>
