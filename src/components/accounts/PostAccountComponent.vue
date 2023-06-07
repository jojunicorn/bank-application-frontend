<template>
    <div class="ml-3 mt-3">
        <h2>Create a new bank account</h2>
        <form @submit.prevent="createAccount">
            <div class="form-group">
                <label for="userId">Select a user: </label>
                <select class="form-control col-md-6" id="userId" v-model="userId" required>
                    <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.firstName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="accountType">Select account type: </label>
                <div class="form-check">
                    <input type="radio" id="current" class="form-check-input" v-model="accountType" value="CURRENT"
                        required>
                    <label for="current" class="form-check-label">Current</label>
                </div>
                <div class="form-check">
                    <input type="radio" id="savings" class="form-check-input" v-model="accountType" value="SAVINGS"
                        required>
                    <label for="savings" class="form-check-label">Savings</label>
                </div>
            </div>
            <div class="form-group">
                <label for="accountStatus">Select account status: </label>
                <div class="form-check">
                    <input type="radio" id="active" class="form-check-input" v-model="accountStatus" value="ACTIVE"
                        required>
                    <label for="active" class="form-check-label">Active</label>
                </div>
                <div class="form-check">
                    <input type="radio" id="inactive" class="form-check-input" v-model="accountStatus" value="INACTIVE"
                        required>
                    <label for="inactive" class="form-check-label">Inactive</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Create bank account</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    created() {
        this.fetchUserList();
    },
    data() {
        return {
            userId: '',
            accountType: 'CURRENT',
            accountStatus: 'ACTIVE',
            errorMessage: '',
            successMessage: '',
            userList: [],
        };
    },
    methods: {
        async fetchUserList() {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            await axios.get('https://localhost:8080/users')
                .then(response => {
                    console.log(response.data);
                    this.userList = response.data;
                })
                .catch(error => {
                    this.errorMessage = 'Failed to fetch user list.';
                    this.successMessage = '';
                });
        },
        async createAccount() {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            const accountRequest = {
                accountHolder: {
                    id: this.userId,
                },
                accountType: this.accountType,
                accountStatus: this.accountStatus,
            };

            await axios.post('https://localhost:8080/accounts', accountRequest)
                .then(response => {
                    this.successMessage = response.data;
                    this.errorMessage = '';
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.errorMessage = error.response.data;
                    } else {
                        this.errorMessage = 'An unexpected error occurred.';
                    }
                    this.successMessage = '';
                });
        },
    },
};
</script>
  
<style scoped>
.error-message {
    color: red;
}

.success-message {
    color: green;
}
</style>
  