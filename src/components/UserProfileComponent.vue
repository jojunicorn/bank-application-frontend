<template>
    <p>User data Overview</p>

    <table class="table table-dark table-sm user-info">
        <tr>
            <td> First Name </td>
            <td> {{ userResponse.firstName }}</td>
        </tr>
        <tr>
            <td> Last Name </td>
            <td> {{ userResponse.lastName }}</td>
        </tr>
        <tr> 
            <td> Email</td> 
            <td> {{ userResponse.email }}</td>
        </tr>
        <tr>
            <td> Birthdate </td>
            <td> {{ userResponse.birthDate }}</td>
        </tr>
        ...
    </table>
    
    
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
<style scoped>
    .user-info{
        width: 50%;
        margin: 5%
    }

</style>
