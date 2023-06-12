<template>
  <div class="main">
    <h1>Welcome {{ userResponse.firstName }} {{ userResponse.lastName }}</h1>
  </div>
</template>

<script>
import axios from '../axiosConfig'

export default {
  mounted() {
    this.userId = localStorage.getItem('id')
    this.getUser()
  },
  data() {
    return {
      userId: '',
      userResponse: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
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
        const response = await axios.get(`/users/${this.userId}`)
        const data = response.data
        this.userResponse = data
        localStorage.setItem('role', data.role) //eg. ROLE_EMPLOYEE
        this.$emit('role-updated', data.role)
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
