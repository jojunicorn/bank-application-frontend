<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="login" id="loginForm">
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input v-model="email" id="inputEmail" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="inputPassword" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async login() {
      const loginRequest = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await axios.post(`/login`, loginRequest)

        const token = response.data.token
        const userId = response.data.userId

        // Save the token in local storage or session
        localStorage.setItem('token', token)
        console.log(localStorage.getItem('token'))

        // Redirect the user to the userHome route with the user ID as a parameter
        this.$router.push({ name: 'userHome', params: { id: userId } })

        this.successMessage = 'Login successful'
        this.errorMessage = ''
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data
        } else {
          this.errorMessage = 'An unexpected error occurred.'
        }
        this.successMessage = ''
      }
    }
  }
}
</script>

<style></style>
