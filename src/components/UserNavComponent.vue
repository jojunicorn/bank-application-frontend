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
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" :href="'/user/' + userId">Home</a>
          </li> -->
          <li class="nav-item">
            <router-link :to="'/dashboard'" class="nav-link" active-class="active" exact>Home</router-link>
          </li>
          <li class="nav-item" v-if="role === 'ROLE_CUSTOMER' || role === 'ROLE_EMPLOYEE'">
            <router-link :to="'/atm'" class="nav-link" active-class="active" exact>ATM</router-link>
          </li>

          <li class="nav-item" v-if="role === 'ROLE_CUSTOMER' || role === 'ROLE_EMPLOYEE'">
            <router-link :to="'/accounts/getIbanByCustomerName'" class="nav-link" active-class="active" exact>New
              Transaction</router-link>
          </li>

          <li class="nav-item">
            <router-link :to="'/user/profile'" class="nav-link" active-class="active" exact>Profile</router-link>
          </li>

          <!-- for employee -->
          <li class="nav-item" v-if="role === 'ROLE_EMPLOYEE'">
            <router-link :to="'/users'" class="nav-link" active-class="active" exact>User Management</router-link>
          </li>
          <li class="nav-item" v-if="role === 'ROLE_EMPLOYEE'">
            <router-link :to="'/accounts'" class="nav-link" active-class="active" exact>Accounts Management</router-link>
          </li>

          <li><a class="nav-link" @click="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ['role'],
  data() {
    return {
      userId: localStorage.getItem('id')
    }
  },
  computed: {
    role() {
      return this.$props.role || localStorage.getItem('role')
    }
  },
  methods: {
    logout() {
      // Clear the token from local storage or session
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('role')

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
