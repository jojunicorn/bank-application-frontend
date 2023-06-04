<template>
    <div class="ml-3 mt-3">
        <h2>Create a new bank account</h2>
        <form @submit.prevent="createAccount">
            <div class="form-group">
                <label for="userId">Select user without account:</label>
                <input type="text" class="form-control col-md-6" id="userId" v-model="userId" required>
            </div>
            <div class="form-group">
                <label for="accountType">Account Type:</label>
                <select id="accountType" class="form-control col-md-6" v-model="accountType" required>
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Create bank account</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="succesMessage" class="success-message">{{ succesMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userId: '',
            accountType: 'SAVINGS',
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        createAccount() {
            const accountRequest = {
                accountHolder: {
                    id: this.userId,
                },
                accountType: this.accountType,
            };

            axios.post('/accounts', accountRequest)
                .then(response => {
                    this.successMessage = response.data,
                        this.errorMessage = '';
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.errorMessage = error.response.data;
                    } else {
                        this.errorMessage = 'An unexpected error occured.';
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