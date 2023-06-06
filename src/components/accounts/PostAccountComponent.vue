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
            accountType: 'SAVINGS',
            errorMessage: '',
            successMessage: '',
            userList: [],
        };
    },
    methods: {
        fetchUserList() {
            axios.get('http://localhost:8080/users')
                .then(response => {
                    console.log(response.data);
                    this.userList = response.data;
                })
                .catch(error => {
                    this.errorMessage = 'Failed to fetch user list.';
                    this.successMessage = '';
                });
        },
        createAccount() {
            const accountRequest = {
                accountHolder: {
                    id: this.userId,
                },
                accountType: this.accountType,
            };

            axios.post('http://localhost:8080/accounts', accountRequest)
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
  