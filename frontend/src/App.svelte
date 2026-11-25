<script>
  import { Router, Route } from 'svelte-routing';
  import ProtectedRoute from './components/ProtectedRoute.svelte';
  import LoginPage from "./pages/loginPage/LoginPage.svelte";
  import HealthCheckPage from './pages/healthCheck/HealthCheckPage.svelte';
</script>

<Router>
  <Route path="/">
    <LoginPage />
  </Route>
  <Route path="/test">
    <HealthCheckPage />
  </Route>
  <ProtectedRoute path="/protected" allow={false}>
    <h2>Protected route!</h2>
  </ProtectedRoute>
</Router>