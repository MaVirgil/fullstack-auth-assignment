<script>
  import { Router, Route, Link } from 'svelte-routing';
  import ProtectedRoute from './components/ProtectedRoute.svelte';
  import LoginPage from "./pages/loginPage/LoginPage.svelte";
  import HealthCheckPage from './pages/healthCheck/HealthCheckPage.svelte';
</script>

<Router>
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/test'>Test</Link>
    <Link to='/protected'>Protected</Link>
  </nav>
  <div>
    <Route path="/">
      <LoginPage />
    </Route>
    <Route path="/test">
      <HealthCheckPage />
    </Route>
    <ProtectedRoute path="/protected" allow={false}>
      <h2>Protected route!</h2>
    </ProtectedRoute>

  </div>
</Router>