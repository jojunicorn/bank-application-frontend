<template>
<div class="main">
    <div class="ml-3 mt-3">
        <h2>Manage Users</h2>
        <button @click="openRegisterPopup" class="btn btn-primary action-btn">Add user</button>
        <div class="form-check no-account-radio">
            <input class="form-check-input" type="checkbox" value="usersWithoutAccount" v-model="noAccountChecked" @change="checkBoxUsersWithoutAccount" id="usersWithoutAccount">
            <label class="form-check-label" for="usersWithoutAccount">
                Users without account
            </label>
        </div>
        <table class="table table-responsive my-3">
            <p id="userError" class="user-error"></p>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>BSN</th>
                    <th>Birthdate</th>
                    <th>Adress</th>
                    <th>Daily Limit</th>
                    <th>Transaction Limit</th>
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
                    <pre><td>{{ user.streetName + ' ' + user.houseNumber + '\n' + user.zipCode + ' ' + user.city + '\n'  + user.country}}</td></pre>
                    <td>{{ user.dailyLimit }}</td>
                    <td>{{ user.transactionLimit }}</td>
                    <td>
                        <button class="btn btn-outline-info" @click="openEditPopup(user)">Edit</button>
                        <button class="btn btn-outline-danger" @click="openDeletePopup(user.id)">Delete</button><br>
                        <!-- add this create account button to users without account only -->
                        <button class="btn btn-outline-info" @click="goToCreateAccountForUser(user)">Create account</button><br>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="modal delete-user" id="deleteUserPopup">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="deleteUserTitle"></h5>
            <button type="button" class="btn-close" @click="closePopup('deleteUserPopup')">X</button>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closePopup('deleteUserPopup')">No</button>
            <button type="button" class="btn btn-primary" @click="deleteUser()">Yes</button>
        </div>
        </div>
    </div>
</div>


<div class="modal user-popup" id="userPopup">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userPopupHeading"></h5>
        <button type="button" class="btn btn-primary" @click="closePopup('userPopup')"><b>X</b></button>
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
              <label for="password" id="lblPassword" class="form-label dark">Password</label>
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
              <input type="date" class="form-control" id="birthdate" :max="minBirthdate" v-model="registerRequest.birthdate" required>
            </div>
            <div class="col-md-6">
              <label for="country" class="form-label dark">Country</label>
              <input type="text" class="form-control" id="country" v-model="registerRequest.country" required>
            </div>
            <div class="col-md-6">
              <label for="streetName" class="form-label dark">Street Name</label>
              <input type="text" class="form-control" id="streetName" v-model="registerRequest.streetName" required>
            </div>
            <div class="col-md-4">
              <label for="houseNumber" class="form-label dark">Number</label>
              <input type="number" class="form-control" id="houseNumber" v-model="registerRequest.houseNumber" required>
            </div>
            <div class="col-md-6">
              <label for="city" class="form-label dark">City</label>
              <input type="text" class="form-control" id="city" v-model="registerRequest.city" required>
            </div>
            <div class="col-md-4">
              <label for="zipCode" class="form-label dark">Zip</label>
              <input type="text" class="form-control" id="zipCode" v-model="registerRequest.zipCode" required>
            </div>
            <div class="col-md-6">
              <label for="city" class="form-label dark">Daily Limit</label>
              <input type="text" class="form-control" id="city" v-model="userResponse.dailyLimit" required>
            </div>
            <div class="col-md-6">
              <label for="zipCode" class="form-label dark">Transaction Limit</label>
              <input type="text" class="form-control" id="zipCode" v-model="userResponse.transactionLimit" required>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closePopup('userPopup')">Close</button>
                <button type="submit" id="btnRegisterSave" class="btn btn-primary">Register</button>
                
            </div>
          </form>
      </div>
    </div>
  </div>
</div>

<div id="feedbackPopup" class="modal error-popup">
    <div class="modal-content">
      <span class="close" @click="closePopup('feedbackPopup')">&times;</span>
      <h2 id="popupHeading">Popup</h2>
      <p id="popupText"></p>
    </div>
</div>

</template>

<script>
import axios from '../axiosConfig';
import registerLogic from '@/assets/registeringLogic.js';


export default {
    mounted() {
        this.getUsers();
    },
    data() {
        return {
            temporaryIdSave: null,
            feedbackMessage: '',
            noAccountChecked: false,

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
                dailyLimit: '',
                transactionLimit: '', 
                role: ''
            },
            registerRequest: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
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
    computed: {
        minBirthdate() {
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return minDate.toISOString().slice(0, 10); // Format as yyyy-MM-dd
        },
    },
    methods: {
        async getUsers() {
            await axios.get('/users?skip=1')
                .then(response => {
                    console.log(response.data);
                    this.userResponse = response.data;
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById('userError').textContent = "unable to get users"
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
                    document.getElementById('userError').textContent = "unable to get users"
                });

        },
        async registerUser(){
            try{
                if(this.temporaryIdSave != null){
                    this.editUser()
                }else{
                    //checking entered data
                    this.checkRegisterData();
                    if(this.feedbackMessage === ''){
                        const response = await axios.post('/users/register', this.registerRequest);
                        const status = JSON.parse(response.status);
                        //redirect logic
                        if (status == 200) {
                        this.feedbackMessage = "";
                        this.openFeedbackPopup("black", "Register Successful!")
                        }else{
                        this.feedbackMessage = "Something went wrong. Please try again later or contact an employee."
                        }
                    }else{
                        this.openFeedbackPopup("red", "Something went wrong!")
                    }

                    this.feedbackMessage = '';
                    this.closePopup('userPopup');
                    this.userResponse = '';
                    this.getUsers();
                }
            }catch(error){
            console.log(error);
            }
        },
        async editUser(){
            await axios.put(`/users/updateInformation/${this.temporaryIdSave}`, this.registerRequest)
                .then(response => {
                    this.feedbackMessage = response.data;
                    this.openFeedbackPopup("black", "Updated!");
                })
                .catch(error => {
                    console.log(error);
                    this.feedbackMessage = error;
                    this.openFeedbackPopup("black", "Error")
                });
                this.updateDailyLimit();
                this.updateTransactionLimit();
                
            this.temporaryIdSave = null;
            this.closePopup('userPopup');
            this.userResponse = '';
            this.registerRequest = '';
            this.getUsers();

        },
        async deleteUser(){
            await axios.delete(`/users/${this.temporaryIdSave}`)
                .then(response => {
                    console.log(response);
                    this.feedbackMessage = response.data;
                    this.openFeedbackPopup("black", "Success!")

                })
                .catch(error => {
                    this.feedbackMessage = error;
                    this.openFeedbackPopup("red", "Error")
                });
            this.closePopup('deleteUserPopup')
            this.feedbackMessage = '';
            this.temporaryIdSave = null;
            this.getUsers();
        },
        async updateDailyLimit(){
            console.log(this.temporaryIdSave, ' ', this.userResponse.dailyLimit);

            await axios.put(`/users/${this.temporaryIdSave}/dailyLimit?dailyLimit=${this.userResponse.dailyLimit}`)
                .then(response => {
                    //information updated successfully
                })
                .catch(error => {
                    console.log(error);
                    this.feedbackMessage = error;
                    this.openFeedbackPopup("black", "Error")
                });
        },
        async updateTransactionLimit(){
            await axios.put(`/users/${this.temporaryIdSave}/transactionLimit?transactionLimit=${this.userResponse.transactionLimit}`)
                .then(response => {
                    //information updated successfully
                })
                .catch(error => {
                    console.log(error);
                    this.feedbackMessage = error;
                    this.openFeedbackPopup("black", "Error")
                });
        },
        goToCreateAccountForUser(user){
            //eventBus.$emit('userEvent', user);
            this.$eventBus.userAccountEvent = user;
            this.$router.push({ name: 'createAccount' })
        },
        checkBoxUsersWithoutAccount(){
            if (this.noAccountChecked) {
                this.getUsersWithoutAccount();
                console.log('Here');
                } else {
                this.getUsers();
            }
            
        },
        openFeedbackPopup(color, heading){
            document.getElementById('popupHeading').style.color = color;
            document.getElementById('popupHeading').textContent = heading;
            document.getElementById('popupText').textContent = this.feedbackMessage;
            document.getElementById('feedbackPopup').style.display = 'block';
        },
        //open popup for registering
        openRegisterPopup(){
            document.getElementById('btnRegisterSave').textContent = 'Register'
            document.getElementById('userPopupHeading').textContent = "Register a new User";
            document.getElementById('userPopup').style.display = 'block';
            document.getElementById('password').style.display = 'block';
            document.getElementById('lblPassword').style.display = 'block';
            document.getElementById('password').setAttribute('required');
        },


        //open popup for editing
        openEditPopup(user){
            this.temporaryIdSave = user.id;
            console.log(this.temporaryIdSave);
            document.getElementById('btnRegisterSave').textContent = 'Save Changes'
            document.getElementById('userPopupHeading').textContent = "Edit User #" + user.id;
            document.getElementById('userPopup').style.display = 'block';
            document.getElementById('password').style.display = 'none';
            document.getElementById('lblPassword').style.display = 'none';
            document.getElementById('password').removeAttribute('required');

            this.registerRequest.firstName = user.firstName;
            this.registerRequest.lastName = user.lastName;
            this.registerRequest.email = user.email;
            this.registerRequest.password = '';
            this.registerRequest.phoneNumber = user.phoneNumber;
            this.registerRequest.bsn = user.bsn;
            this.registerRequest.birthdate = user.birthdate;
            this.registerRequest.streetName = user.streetName;
            this.registerRequest.houseNumber = user.houseNumber; 
            this.registerRequest.zipCode = user.zipCode;
            this.registerRequest.city = user.city;
            this.registerRequest.country = user.country;

            this.userResponse.dailyLimit = user.dailyLimit;
            this.userResponse.transactionLimit = user.transactionLimit;
        },

        openDeletePopup(id){
            document.getElementById('deleteUserTitle').textContent = 'Are you sure you want to delete user #' + id +'?';
            document.getElementById('deleteUserPopup').style.display = 'block';
            this.temporaryIdSave = id;
        },

        closePopup(popupname) {
            document.getElementById(popupname).style.display = 'none';
            this.temporaryIdSave = null
            this.feedbackMessage = "";
        },


        checkRegisterData() {
            this.feedbackMessage += registerLogic.passwordCheck(this.registerRequest.password, this.feedbackMessage)
            this.feedbackMessage += registerLogic.phoneNumberCheck(this.registerRequest.phoneNumber, this.feedbackMessage)
            this.feedbackMessage += registerLogic.birthdateCheck(this.registerRequest.birthdate, this.feedbackMessage)
            this.feedbackMessage += registerLogic.addressCheck(this.registerRequest.country, this.registerRequest.city, this.registerRequest.streetName, this.registerRequest.zipCode, this.feedbackMessage)
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
.delete-user{
    display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
}
.table{
    width: 100%;
}
.action-btn{
    margin-left:1%;
}
.no-account-radio{
    margin-top: 2%
}
.user-error{
    color: red;
}
</style>