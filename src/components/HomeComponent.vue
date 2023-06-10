<template>
  <div class="body">
    <h1 class="main-heading">Bank</h1>
    <router-link to="/userLogin"
      ><button type="button" class="btn btn-secondary btn-lg login-button">
        Customer Login
      </button></router-link
    >
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
