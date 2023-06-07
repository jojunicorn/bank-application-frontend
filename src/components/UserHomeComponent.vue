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
<<<<<<< HEAD
          const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MTE3OTMzLCJleHAiOjE2ODYxMjE1MzN9.LmWUyLbhNoag0MH6vmi3nTano0zZn1AUKoyVv088Wq67BS3Jecflu-DLUThYJ4jl3jwLFAANxlEFe3HlflNMbEeVyRwwF1wvYjx4y6oeyw7H8X9TvACsXe3GLliY_McMBwTXrjfdWPuXiXPidQMm70yZiOIgPO21B63d901byWjxLfZbqPuw_nFqwVYfNtzV1nFRGj6Sn8V8uAOtxGCmmmqsI9ACb-u6xBJ6thtBRoY3qaMbUrZVzAu2to11zhnBRMcThFcrnfM5rzOHhOFv3UGC0z2Bu_6WpA8gSldzHKs1wejCudh9y8RGI-d5V2ysThmJM-hRtEJ35hOB_ISrJg"}`, }, };

          const response = await axios.get(`https://localhost:8080/users/${userId}`, config);
=======
          const response = await axios.get(`https://localhost:8080/users/${userId}`);
>>>>>>> master
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
  