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
import axios from '../axiosConfig'

export default {
  created() {
    // needs to be specified in login
    this.getUser()
  },
  mounted() { const userId = localStorage.getItem('id') },
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
        // Access userId from $route.params object
        const response = await axios.get(`/users/${userId}`)
        console.log(response)

        const data = response.data
        console.log(data)

        this.userResponse = data // Assign the response data to userResponse
        // Do further processing or handle the response as needed
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style scoped>
.main {
  margin: 2%;
}
</style>
