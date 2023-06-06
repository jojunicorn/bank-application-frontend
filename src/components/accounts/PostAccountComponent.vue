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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };
            await axios.get('https://localhost:8080/users', config)
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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };

            const accountRequest = {
                accountHolder: {
                    id: this.userId,
                },
                accountType: this.accountType,
                accountStatus: this.accountStatus,
            };

            await axios.post('https://localhost:8080/accounts', accountRequest, config)
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
  