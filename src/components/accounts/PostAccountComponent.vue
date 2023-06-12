<template>
    <div class="ml-3 mt-3">
        <h2>Create a new bank account</h2>
        <form @submit.prevent="createAccount">
            <div class="form-group">
                <label for="userId">Select a user: </label>
                <select class="form-control col-md-6" id="userId" v-model="userId" required>
                    <option v-for="user in userList" :key="user.id" :value="user.id" :selected="user.id === userId">{{
                        user.firstName }}
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
import axios from '../../axiosConfig';
export default {
    created() {
        this.userId = '';
        this.fetchUserList();
        if (this.$eventBus.userAccountEvent != null) {
            this.userId = this.$eventBus.userAccountEvent.id;
        }
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
            try {
                const response = await axios.get('/users?skip=1');
                this.userList = response.data;
            } catch (error) {
                this.errorMessage = 'Failed to fetch user list.';
                this.successMessage = '';
            }
        },
        async createAccount() {
            const accountRequest = {
                accountHolder: {
                    id: this.userId,
                },
                accountType: this.accountType,
                accountStatus: this.accountStatus,
            };

            try {
                const response = await axios.post('/accounts', accountRequest);
                this.successMessage = response.data;
                this.errorMessage = '';

                setTimeout(() => {
                    // Navigate to the account overview page after 5 seconds
                    this.$router.push('/accounts');
                }, 1000); // Delay in milliseconds (5 seconds)
            } catch (error) {
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data;
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                }
                this.successMessage = '';
            }

            this.$eventBus.userAccountEvent = null;
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
  