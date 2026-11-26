<script>
  import Navbar from '../../components/Navbar.svelte';
  import LoginForm from './components/LoginForm.svelte';

  function handleLoginFormSubmit(formData) {
    const emailInput = formData.get('email');
    const passwordInput = formData.get('password');

    console.log(`Logging in with email: ${emailInput} and password: ${passwordInput}`);
  }
</script>

<Navbar />
<h1>Log in page</h1>
<div class="login-form">
  <LoginForm onSubmit={handleLoginFormSubmit}/>
</div>
