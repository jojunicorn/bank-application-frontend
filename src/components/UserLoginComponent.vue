<template>
  <div class="login-body">
    <h1 class="bank-heading">Banking<br>Application</h1>

    <div class="login-main">
      <input class="login-input" type="checkbox" id="chk" aria-hidden="true" />

      <div class="signup">
        <label class="login-label" for="chk" aria-hidden="true">Login</label>
        <form @submit.prevent="login" id="loginForm">
          <input v-model="email" id="inputEmail" type="email" class="login-input" name="email" placeholder="Email" required/>
          <input v-model="password" type="password" class="login-input" id="inputPassword" name="pswd" placeholder="Password" required/>
          <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>

      <div class="login">
        <label class="login-label register" for="chk" aria-hidden="true">Register</label>

        <form class="row g-3 register-form" @submit.prevent="registerUser">
          <div class="col-md-6">
            <label for="firstName" class="form-label dark">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="registerRequest.firstName"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label dark">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="registerRequest.lastName"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label dark">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="registerRequest.email"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="password" class="form-label dark">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="registerRequest.password"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="bsn" class="form-label dark">BSN Number</label>
            <input
              type="text"
              class="form-control"
              id="bsn"
              v-model="registerRequest.bsn"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="phoneNumber" class="form-label dark">Phone Number</label>
            <input
              type="tel"
              class="form-control"
              id="phoneNumber"
              v-model="registerRequest.phoneNumber"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="birthdate" class="form-label dark">Birthdate</label>
            <input
              type="date"
              class="form-control"
              id="birthdate"
              v-model="registerRequest.birthDate"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="country" class="form-label dark">Country</label>
            <input
              type="text"
              class="form-control"
              id="country"
              v-model="registerRequest.country"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="streetName" class="form-label dark">Street Name</label>
            <input
              type="text"
              class="form-control"
              id="streetName"
              v-model="registerRequest.streetName"
              required
            />
          </div>
          <div class="col-md-2">
            <label for="houseNumber" class="form-label dark">Number</label>
            <input
              type="number"
              class="form-control"
              id="houseNumber"
              v-model="registerRequest.houseNumber"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="city" class="form-label dark">City</label>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model="registerRequest.city"
              required
            />
          </div>
          <div class="col-md-2">
            <label for="zipCode" class="form-label dark">Zip</label>
            <input
              type="text"
              class="form-control"
              id="zipCode"
              v-model="registerRequest.zipCode"
              required
            />
          </div>
          <div class="col-12">
            <button type="submit" class="login-button">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div id="popup" class="modal">
    <div class="modal-content">
      <span class="close" @click="closePopup">&times;</span>
      <h2 id="popupHeading">Popup</h2>
      <p id="popupText"></p>
      <button class="form-control go-to-login" id="goLogin" @click="reloadPage">Go to Login</button>
    </div>
  </div>
</template>

<style>
@import '../assets/userLogin.css';

pre {
  white-space: pre-wrap;
}
.bank-heading{
  font-size: 5em;
  color: white;
  margin-top: -30%;
  margin-left:-10%;
  z-index: 2;
}
.login-main{
  margin-left: 3%
}
</style>

<script>
import axios from '../axiosConfig'
import axiosLogin from 'axios'

export default {
  name: 'userLogin',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',

      loginRequest: {
        email: '',
        password: '',
        errorMessage: '',
        successMessage: ''
      },
      registeringMessage: '',

      registerRequest: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bsn: '',
        phoneNumber: '',
        birthDate: '',
        streetName: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: '',
      }
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

        localStorage.setItem('id', userId)
        console.log(localStorage.getItem('id'))

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
    },
    async registerUser() {
      try {
        //checking entered data
        this.checkRegisterData()
        if (this.registeringMessage === '') {
          //console.log(this.registerRequest);
          const response = await axios.post('/users', this.registerRequest)
          const status = JSON.parse(response.status)
          //console.log(response);
          //redirect logic
          if (status == 201) {
            this.registeringMessage = 'You can log in now.'
            document.getElementById('popupHeading').style.color = 'black'
            document.getElementById('popupHeading').textContent = 'Register Successful!'
            document.getElementById('popupText').textContent = this.registeringMessage
            document.getElementById('popup').style.display = 'block'
            document.getElementById('goLogin').style.display = 'block'
            //this.$router.push('/home');
          } else {
            this.registeringMessage =
              'Something went wrong. Please try again later or contact an employee.'
          }
        } else {
          document.getElementById('popupHeading').textContent = 'Something went wront!'
          document.getElementById('popupHeading').style.color = 'red'
          document.getElementById('popupText').textContent = this.registeringMessage
          document.getElementById('popup').style.display = 'block'
          document.getElementById('goLogin').style.display = 'none'
        }

        this.registeringMessage = ''
      } catch (error) {
        console.log(error)
      }
    },
    closePopup() {
      document.getElementById('popup').style.display = 'none'
      document.getElementById('goLogin').style.display = 'none'
    },
    checkRegisterData() {
      this.passwordCheck()
      this.phoneNumberCheck()
      this.birthdateCheck()
    },
    passwordCheck() {
      var passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      if (!passwordRegex.test(this.registerRequest.password)) {
        this.registeringMessage +=
          'Password must contain: \n-at least 8 characters\n-one uppercase letter\n-one lowercase letter\n-one number\n-one special character \n\n'
      }
    },
    phoneNumberCheck() {
      var phoneNumberRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/
      if (!phoneNumberRegex.test(this.registerRequest.phoneNumber)) {
        this.registeringMessage += 'Phonenumber is not in the correct format.\n'
      }
    },
    birthdateCheck() {
      var today = new Date()
      var birthdateObj = new Date(this.registerRequest.birthDate)

      // Calculate the difference in years
      var age = today.getFullYear() - birthdateObj.getFullYear()

      // Adjust the age based on the current month and day
      if (
        today.getMonth() < birthdateObj.getMonth() ||
        (today.getMonth() === birthdateObj.getMonth() && today.getDate() < birthdateObj.getDate())
      ) {
        age--
      }

      if (age < 18) {
        this.registeringMessage += 'You need to be 18 or older to make an Account. \n'
      }
    },
    addressCheck() {
      if (
        this.registerRequest.country.length < 3 ||
        this.registerRequest.city.length < 3 ||
        this.registerRequest.streetName.length < 2 ||
        this.registerRequest.zipCode.length < 3
      ) {
        this.registeringMessage += 'Make sure to enter a valid address \n'
      }
    },
    bsnCheck() {
      var bsnRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/
      if (!phoneNumberRegex.test(this.registerRequest.bsn)) {
        this.registeringMessage += 'BSN is not in the correct format.\n'
      }
    },
    reloadPage() {
      location.reload()
    },

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

        localStorage.setItem('id', userId)
        console.log(localStorage.getItem('id'))

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
