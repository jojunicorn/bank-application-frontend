<template>
  <div class="main">
    <h1>Welcome {{ userResponse.firstName }} {{ userResponse.lastName }}</h1><br><br><br><br>
  </div>
</template>
  
<script>
  import axios from '../axiosConfig';
  
  export default {
    
    created() {
      // needs to be specified in login
      const currentUser = this.getUser();
    },
    mounted() {
      const userId = this.$route.params.id;
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
      };
    },
    methods: {
      async getUser() {
        try {
          console.log('clicked');
          // Test code until login with current logged in user is implemented
          const userId = this.$route.params.id;
          const response = await axios.get(`http://localhost:8080/users/${userId}`);
          const data = response.data;
  
          this.userResponse = data; // Assign the response data to userResponse
  
          // Do further processing or handle the response as needed
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>
  
<style>
  .main{
    margin: 2%
  }
</style>
  