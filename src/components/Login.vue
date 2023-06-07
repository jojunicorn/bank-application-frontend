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
        accountHolder: this.email,
        password: this.password
      }

      try {
        const response = await axios.post(`https://localhost:8080/login`, loginRequest)

        this.successMessage = response.data
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
