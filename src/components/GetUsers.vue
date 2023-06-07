<template>
<div class="main">
    <div class="ml-3 mt-3">
        <h2>Manage Users</h2>
        <button @click="openUserPopup" class="btn btn-primary action-btn">Add user</button>
        <button id="userFilter" @click="getUsersWithoutAccount" class="btn btn-outline-primary action-btn">Users Without Account</button>
        <button @click="getUsers" class="btn btn-outline-primary action-btn">All users</button>
        <table class="table table-responsive my-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>BSN</th>
                    <th>Birthdate</th>
                    <th>Street Name</th>
                    <th>House Number</th>
                    <th>Zip Code</th>
                    <th>City</th>
                    <th>Country</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userResponse" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phoneNumber }}</td>
                    <td>{{ user.bsn }}</td>
                    <td>{{ user.birthdate }}</td>
                    <td>{{ user.streetName }}</td>
                    <td>{{ user.houseNumber }}</td>
                    <td>{{ user.zipCode }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.country }}</td>
                    <td>
                        <button class="btn btn-outline-info">Edit</button>
                        <button class="btn btn-outline-danger">Delete</button><br>
                        <!-- add this create account button to users without account only -->
                        <button class="btn btn-outline-info">Create account</button><br>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


<div class="modal user-popup" id="userPopup">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userPopupHeading"></h5>
        <button type="button" class="btn btn-primary" @click="closePopup"><b>X</b></button>
      </div>
      <div class="modal-body">
        <form class="row g-3 register-form" @submit.prevent="registerUser">
            <div class="col-md-6">
              <label for="firstName" class="form-label dark">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="registerRequest.firstName" required>
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label dark">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="registerRequest.lastName" required>
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label dark">Email</label>
              <input type="email" class="form-control" id="email" v-model="registerRequest.email" required>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label dark">Password</label>
              <input type="password" class="form-control" id="password" v-model="registerRequest.password" required>
            </div>
            <div class="col-md-6">
              <label for="bsn" class="form-label dark">BSN Number</label>
              <input type="text" class="form-control" id="bsn" v-model="registerRequest.bsn" required>
            </div>
            <div class="col-md-6">
              <label for="phoneNumber" class="form-label dark">Phone Number</label>
              <input type="tel" class="form-control" id="phoneNumber" v-model="registerRequest.phoneNumber" required>
            </div>
            <div class="col-md-6">
              <label for="birthdate" class="form-label dark">Birthdate</label>
              <input type="date" class="form-control" id="birthdate" v-model="registerRequest.birthDate" required>
            </div>
            <div class="col-md-6">
              <label for="country" class="form-label dark">Country</label>
              <input type="text" class="form-control" id="country" v-model="registerRequest.country" required>
            </div>
            <div class="col-md-6">
              <label for="streetName" class="form-label dark">Street Name</label>
              <input type="text" class="form-control" id="streetName" v-model="registerRequest.streetName" required>
            </div>
            <div class="col-md-2">
              <label for="houseNumber" class="form-label dark">Number</label>
              <input type="number" class="form-control" id="houseNumber" v-model="registerRequest.houseNumber" required>
            </div>
            <div class="col-md-6">
              <label for="city" class="form-label dark">City</label>
              <input type="text" class="form-control" id="city" v-model="registerRequest.city" required>
            </div>
            <div class="col-md-2">
              <label for="zipCode" class="form-label dark">Zip</label>
              <input type="text" class="form-control" id="zipCode" v-model="registerRequest.zipCode" required>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closePopup">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
      </div>
    </div>
  </div>
</div>

<div id="popup" class="modal error-popup">
    <div class="modal-content">
      <span class="close" @click="closeErrorPopup">&times;</span>
      <h2 id="popupHeading">Popup</h2>
      <p id="popupText"></p>
    </div>
</div>

</template>

<script>
import axios from '../axiosConfig';
export default {
    mounted() {
        this.getUsers();
    },
    data() {
        return {
            registeringMessage: '',

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
                role: "ROLE_USER"
                }
        };
    },
    methods: {
        async getUsers() {
            await axios.get('/users')
                .then(response => {
                    console.log(response.data);
                    this.userResponse = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        
        },
        async getUsersWithoutAccount() {
            await axios.get('/users?hasAccount=false')
                .then(response => {
                    console.log(response.data);
                    this.userResponse = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async registerUser(){
            try{
            //checking entered data
            this.checkRegisterData();
            if(this.registeringMessage === ''){
                
                //console.log(this.registerRequest);
                const response = await axios.post('/users', this.registerRequest);
                const status = JSON.parse(response.status);
                //console.log(response);
                //redirect logic
                if (status == 201) {
                this.registeringMessage = "";
                document.getElementById('popupHeading').style.color = "black";
                document.getElementById('popupHeading').textContent = "Register Successful!";
                document.getElementById('popupText').textContent = this.registeringMessage;
                document.getElementById('popup').style.display = 'block';
                //this.$router.push('/home');
                }else{
                this.registeringMessage = "Something went wrong. Please try again later or contact an employee."
                }
            }else{
                document.getElementById('popupHeading').textContent = "Something went wront!";
                document.getElementById('popupHeading').style.color = "red";
                document.getElementById('popupText').textContent = this.registeringMessage;
                document.getElementById('popup').style.display = 'block';
            }

            this.registeringMessage = '';
            
            }catch(error){
            console.log(error);
            }
        },
        openUserPopup(){
            document.getElementById('userPopupHeading').textContent = "Register a new User";
            document.getElementById('userPopup').style.display = 'block';
        },
        // openEditUserPopup(id){
        //     document.getElementById('userPopupHeading').textContent = "Edit User # "+id;
        //     document.getElementById('userPopup').style.display = 'block';
        // },
        closePopup() {
            document.getElementById('userPopup').style.display = 'none';
        },
        closeErrorPopup(){
            document.getElementById('popup').style.display = 'none';
        },

        checkRegisterData(){
            this.passwordCheck();
            this.phoneNumberCheck();
            this.birthdateCheck()
        },
        passwordCheck(){
            var passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            if(!passwordRegex.test(this.registerRequest.password)){
            this.registeringMessage += "Password must contain: \n-at least 8 characters\n-one uppercase letter\n-one lowercase letter\n-one number\n-one special character \n\n"
            }
        },
        phoneNumberCheck(){
            var phoneNumberRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/;
            if(!phoneNumberRegex.test(this.registerRequest.phoneNumber)){
            this.registeringMessage += "Phonenumber is not in the correct format.\n"
            }
        },
        birthdateCheck(){
            var today = new Date();
            var birthdateObj = new Date(this.registerRequest.birthDate);

            // Calculate the difference in years
            var age = today.getFullYear() - birthdateObj.getFullYear();

            // Adjust the age based on the current month and day
            if (today.getMonth() < birthdateObj.getMonth() ||
                (today.getMonth() === birthdateObj.getMonth() && today.getDate() < birthdateObj.getDate())) {
            age--;
            }

            if(age<18){
            this.registeringMessage += "You need to be 18 or older to make an Account. \n"
            }
        },
        addressCheck(){
            if(this.registerRequest.country.length < 3 || this.registerRequest.city.length < 3 || this.registerRequest.streetName.length < 2 || this.registerRequest.zipCode.length < 3){
            this.registeringMessage += "Make sure to enter a valid address \n"
            }
        },
        bsnCheck(){
            var bsnRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/;
            if(!phoneNumberRegex.test(this.registerRequest.bsn)){
            this.registeringMessage += "BSN is not in the correct format.\n"
            }
        },
    },
};
</script>

<style scoped>
.main{
    margin: 2%;
}
.user-popup{
    display: none;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the last value (0.5) to control the darkness */
    z-index: 2; /* Adjust the z-index to ensure the overlay appears on top of other elements */
}
.error-popup {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}
.table{
    width: 100%;
}
.action-btn{
    margin-left:1%;
}
</style>