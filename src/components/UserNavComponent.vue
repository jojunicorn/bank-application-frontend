<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark blue">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><b>Banking Application</b></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <!-- fir customer -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" :href="'/user/' + $route.params.id">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="'/user/' + $route.params.id + '/atm'">ATM</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/accounts/getIbanByCustomerName">Find accounts/Start transaction</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="'/user/' + $route.params.id + '/transactions'">Transactions</a>
            <!-- hardcoded for now-->
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
              aria-expanded="false">
              User
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a class="dropdown-item" :href="'/user/' + $route.params.id + '/profile'">Profile</a>
              </li>
            </ul>
          </li>
          <li><a class="nav-link" @click="logout">Logout</a></li>

          <!-- for employee -->
          <li class="nav-item">
            <a class="nav-link" href="/users">User Management</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/transactions">Transaction Management</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
              aria-expanded="false">
              Account Management
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" :href="'/accounts'">Get all accounts</a></li>
              <li><a class="dropdown-item" :href="'/accountsCreate'">Create accounts</a></li>
              <li><a class="dropdown-item" :href="'/accounts/accountStatus'">Update accounts</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      // Clear the token from local storage or session
      localStorage.removeItem('token')

      // Redirect the user to the login page or any desired route
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>
.blue {
  background-image: url(../assets/background2.jpg);
}
</style>
