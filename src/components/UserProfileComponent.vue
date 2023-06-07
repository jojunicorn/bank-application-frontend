<template>
  <div class="main">
    <h1 class="heading">Profile Data Overview</h1>

    <form @submit.prevent="saveNewUserInformation">
      <table class="table table-dark table-sm user-info">
          <tr>
              <td> First Name </td>
              <td> <input type="text" id="firstNameInput" class="user-data" v-model="userResponse.firstName" disabled required/></td>
          </tr>
          <tr>
              <td> Last Name </td>
              <td> <input type="text" id="lastNameInput" class="user-data" v-model="userResponse.lastName" disabled required/></td>
          </tr>
          <tr> 
              <td> Email</td> 
              <td> <input type="email" id="emailInput" class="user-data" v-model="userResponse.email" disabled required/></td>
          </tr>
          <tr>
              <td> Birthdate </td>
              <td> <input type="date" id="birthdateInput" class="user-data" v-model="userResponse.birthdate" disabled required/></td>
          </tr>
          <tr>
              <td> Phone Number </td>
              <td> <input type="text" id="phoneNumberInput" class="user-data" v-model="userResponse.phoneNumber" disabled required/></td>
          </tr>
          <tr>
              <td> BSN </td>
              <td> <input type="text" id="bsnInput" class="user-data" v-model="userResponse.bsn" disabled/></td>
          </tr>
          <tr>
              <td> Street Name </td>
              <td> <input type="text" id="streetInput" class="user-data" v-model="userResponse.streetName" disabled/></td>
          </tr>
          <tr>
              <td> House Number </td>
              <td> <input type="number" id="houseNumberInput" class="user-data" v-model="userResponse.houseNumber" disabled/></td>
          </tr>
          <tr>
              <td> Zip Code </td>
              <td> <input type="text" id="zipCodeInput" class="user-data" v-model="userResponse.zipCode" disabled/></td>
          </tr>
          <tr>
              <td> City </td>
              <td> <input type="text" id="cityInput" class="user-data" v-model="userResponse.city" disabled/></td>
          </tr>
          <tr>
              <td> Country </td>
              <td> <input type="text" id="countryInput" class="user-data" v-model="userResponse.country" disabled/></td>
          </tr>
      </table>
      <div class="action-buttons">
        <button type="button" class="btn btn-secondary" @click="editDataButton">Edit Data</button>
        <input type="submit" id="saveButton" class="btn btn-info save-button" value="Save" />
      </div>
    </form>
  </div>

  <div id="popup" class="modal">
    <div class="modal-content">
      <span class="close" @click="closePopup">&times;</span>
      <h2 id="popupHeading">Popup</h2>
      <p id="popupText"></p>
    </div>
  </div>
    
</template>

<script>
import axios from '../axiosConfig';

export default {
  
  created() {
    // needs to be specified in login
    const currentUser = this.getUser();
    console.log(console.log(currentUser.birthdate));
  },
  mounted() {
    const userId = localStorage.getItem('id')
    console.log(userId); // Output the value of the 'id' parameter
  },
  data() {
    return {
      userResponse: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        bsn: '',
        birthdate: '',
        streetName: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: '', 
        role: ''
      },
      userRequest: {
        firstName: '',
        lastName: '',
        email: '',
        //placeholder pw
        password: 'None1!00',
        phoneNumber: '',
        bsn: '',
        birthdate: '',
        streetName: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: '', 
      }
    };
  },
  methods: {
    async getUser() {
      try {
        console.log('clicked');
        // Test code until login with current logged in user is implemented
        const response = await axios.get(`/users/${userId}`);
        const data = response.data;

        this.userResponse = data; // Assign the response data to userResponse

        // Do further processing or handle the response as needed
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async saveNewUserInformation(){
      try {
        this.userRequest.firstName = this.userResponse.firstName;
        this.userRequest.lastName = this.userResponse.lastName;
        this.userRequest.email = this.userResponse.email;
        this.userRequest.bsn = this.userResponse.bsn;
        this.userRequest.phoneNumber = this.userResponse.phoneNumber;
        this.userRequest.birthdate = this.userResponse.birthdate;
        this.userRequest.streetName = this.userResponse.streetName;
        this.userRequest.houseNumber = this.userResponse.houseNumber;
        this.userRequest.zipCode = this.userResponse.zipCode;
        this.userRequest.city = this.userResponse.city;
        this.userRequest.country = this.userResponse.country;

        const response = await axios.put(`/users/updateInformation/${this.userResponse.id}`, this.userRequest);
        const status = response.status;
        
        if (status === 201) {
          // Success: Information updated
          console.log("Information updated successfully");
        } else {
          // Popup error message
          const errormessage = response.data;
          console.log("Failed to update information");
          document.getElementById('popupHeading').style.color = "red";
          document.getElementById('popupHeading').textContent = "Error!";
          document.getElementById('popupText').textContent = errormessage;
          document.getElementById('popup').style.display = 'block';
        }
      } catch (error) {
        // Handle request error
        console.log("Unexpected server error", error);
          // Popup error message
        const errormessage = error.response.data;
        console.log("Failed to update information");
        document.getElementById('popupHeading').style.color = "red";
        document.getElementById('popupHeading').textContent = "Error!";
        document.getElementById('popupText').textContent = errormessage;
        document.getElementById('popup').style.display = 'block';
      }
    },
    closePopup() {
      location.reload();

      document.getElementById('popup').style.display = 'none';
      document.getElementById('goLogin').style.display = 'none';
    },
    editDataButton(){
      document.getElementById('firstNameInput').disabled = false;
      document.getElementById('lastNameInput').disabled = false;
      document.getElementById('emailInput').disabled = false;
      document.getElementById('bsnInput').disabled = false;
      document.getElementById('phoneNumberInput').disabled = false;
      document.getElementById('birthdateInput').disabled = false;
      document.getElementById('streetInput').disabled = false;
      document.getElementById('houseNumberInput').disabled = false;
      document.getElementById('zipCodeInput').disabled = false;
      document.getElementById('cityInput').disabled = false;
      document.getElementById('countryInput').disabled = false;
      document.getElementById('saveButton').style.display = 'inline';
    }
  }
};
</script>
<style scoped>
.main{
  margin-left: 2%;
}
.user-info{
    width: 50%;
    margin: 5%
}
.user-data{
  background-color: rgb(43, 43, 53);
  color: white;
  width: 80%
}
.save-button{
  margin: 1%;
  display: none
}
.action-buttons{
  margin-left: 5%;
  margin-top: -3%;
}


/* Popup style*/
.modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
}
  
.modal-content {
	background-color: #fff;
	margin: 10% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}
  
.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
	cursor: pointer;
}
  
.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
</style>
