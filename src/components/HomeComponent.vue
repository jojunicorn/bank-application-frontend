<template>
  <div class="body">
    <h1 class="main-heading">Bank</h1>
    <a href="/userLogin"
      ><button type="button" class="btn btn-secondary btn-lg login-button">
        Customer Login
      </button></a
    >
    <!-- <a href="/employeeLogin"
      ><button type="button" class="btn btn-secondary btn-lg login-button">
        Employee Login
      </button></a
    >
    <router-link to="/login" class="nav-link" active-class="active">Login</router-link> -->
  </div>
</template>

<style scoped>
.main-heading {
  margin: 5%;
  font-size: 10em;
  color: rgb(199, 237, 251);
}
.login-button {
  margin: 5%;
  margin-top: 10%;
  height: 10rem;
  width: 40%;
  background-color: rgba(15, 15, 34, 0.4);
}
</style>
