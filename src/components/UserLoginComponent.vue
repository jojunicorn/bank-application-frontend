<template>
  <div class="login-body">
    <button @click="getUsers">click me</button>
    <div class="login-main">  	
      <input class="login-input" type="checkbox" id="chk" aria-hidden="true">

        <div class="signup">
          <label class="login-label" for="chk" aria-hidden="true">Register a new user</label>

          <form class="row g-3" @submit.prevent="registerUser">
            <div class="col-md-6">
              <label for="firstName" class="form-label white">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="registerRequest.firstName">
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label white">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="registerRequest.lastName">
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label white">Email</label>
              <input type="email" class="form-control" id="email" v-model="registerRequest.email">
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label white">Password</label>
              <input type="password" class="form-control" id="password" v-model="registerRequest.password">
            </div>
            <div class="col-md-6">
              <label for="birthdate" class="form-label white">Birthdate</label>
              <input type="date" class="form-control" id="birthdate" v-model="registerRequest.birthDate">
            </div>
            <div class="col-md-6">
              <label for="country" class="form-label white">Country</label>
              <input type="text" class="form-control" id="country" v-model="registerRequest.country">
            </div>
            <div class="col-md-6">
              <label for="streetName" class="form-label white">Street Name</label>
              <input type="text" class="form-control" id="streetName" v-model="registerRequest.streetName">
            </div>
            <div class="col-md-2">
              <label for="houseNumber" class="form-label white">Number</label>
              <input type="number" class="form-control" id="houseNumber" v-model="registerRequest.houseNumber">
            </div>
            <div class="col-md-6">
              <label for="city" class="form-label white">City</label>
              <input type="text" class="form-control" id="city" v-model="registerRequest.city">
            </div>
            <div class="col-md-2">
              <label for="zipCode" class="form-label white">Zip</label>
              <input type="text" class="form-control" id="zipCode" v-model="registerRequest.zipCode">
            </div>
            <div class="col-12">
              <button type="submit" class="login-button">Sign in</button>
            </div>
          </form>
        </div>

        <div class="login">
          <form>
            <label class="login-label" for="chk" aria-hidden="true">Login</label>
            <input class="login-input" type="email" name="email" placeholder="Email" required="">
            <input class="login-input" type="password" name="pswd" placeholder="Password" required="">
            <button class="login-button">Login</button>
          </form>
        </div>
    </div>
  </div>
</template>

<style>
  @import '../assets/userLogin.css';
</style>

<script>
import axios from '../axiosConfig'

export default {
  data() {
  return {
    registerRequest: {
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
      role: "ROLE_EMPLOYEE"
    }
  }  
},
methods:{
  async registerUser(){
    try{
      console.log(this.registerRequest);
      const response = await axios.post('http://localhost:8080/users', this.registerRequest);
        const status = JSON.parse(response.status);
        console.log(response);
        //redirect logic
        if (status == 200) {
          this.$router.push('/home');
        }
    }catch(error){
      console.log(error);
    }
  },
async getUsers(){
    try{
      console.log('clicked')
      const response = await axios.get('http://localhost:8080/users');
      const status = JSON.parse(response.status);
      console.log(response)
        //redirect logic
        if (status == 200) {
        }
    }catch(error){
      console.log(error);
    }
  }
}
}
</script>

