<template>
  <div class="main">
    <h1>Welcome {{ userResponse.firstName }} {{ userResponse.lastName }}</h1>
    <br /><br /><br /><br />

    <p>
      Here I would display the accounts where if you click on them you have more detail and the
      options to perform transactions<br />
      If user has no accounts yet message that no accounts have been created yet. <br />
      Also display the rest daily limit and the general transactionlimit
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import axiosConfig from '../axiosConfig'

export default {
  created() {
    // needs to be specified in login
    const currentUser = this.getUser()
  },
  mounted() {
    const userId = this.$route.params.id
  },
  data() {
    return {
      userResponse: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bsn: '',
        phoneNumber: '',
        birthdate: '',
        streetName: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: '',
        role: ''
      }
    }
  },
  methods: {
    async getUser() {
      try {
        console.log('clicked')
        // Test code until login with current logged in user is implemented
        const userId = this.$route.params.id
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        const response = await axios.get(`http://localhost:8080/users/${userId}`)
        const data = response.data

        this.userResponse = data // Assign the response data to userResponse

        // Do further processing or handle the response as needed
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.main {
  margin: 2%;
}
</style>
