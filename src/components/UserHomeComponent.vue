<template>
    <h1>Welcome {{ userResponse.firstName }} {{ userResponse.lastName }}</h1><br><br><br><br>

    <p>Here I would display the accounts where if you click on them you have more detail and the options to perform transactions<br>
      If user has no accounts yet message that no accounts have been created yet.
    </p>
  </template>
  
  <script>
  import axios from '../axiosConfig';
  
  export default {
    
    created() {
      // needs to be specified in login
      const currentUser = this.getUser();
      console.log(currentUser);
    },
    mounted() {
      const userId = this.$route.params.id;
      console.log(userId); // Output the value of the 'id' parameter
    },
    data() {
      return {
        userResponse: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          birthDate: '',
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
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  