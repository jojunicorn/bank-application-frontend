<template>
    <div class="ml-3 mt-3">
        <h2>Update account status</h2>
        <div class="form-group">
            <label for="iban">IBAN: </label>
            <input type="text" id="iban" class="form-control col-md-6" v-model="iban" />
        </div>
        <div class="form-group">
            <label for="status">Account Status: </label>
            <select id="status" class="form-control col-md-6" v-model="accountStatus">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
            <button @click="updateAccountStatus" class="btn btn-primary mt-3">Update Status</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>

<script>
import axios from '../../axiosConfig';

export default {
    created() {
        this.iban = '';
        if (this.$eventBus.accountUpdateEvent && this.$eventBus.accountUpdateEvent.iban) {
            this.iban = this.$eventBus.accountUpdateEvent.iban; // Set the iban from the event bus
        }
    },
    data() {
        return {
            iban: '',
            accountStatus: 'ACTIVE',
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        async updateAccountStatus() {
            const iban = this.iban;
            const accountStatus = this.accountStatus;

            const requestData = {
                accountStatus: accountStatus,
            };

            try {
                const response = await axios.put(`/accounts/accountStatus/${iban}`, requestData);
                this.successMessage = response.data;
                this.errorMessage = '';
                console.log("Status updated", response.data);

                setTimeout(() => {
                    // Navigate to another page after 5 seconds
                    this.$router.push('/accounts');
                }, 1000); // Delay in milliseconds (5 seconds)

            } catch (error) {
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data;
                } else {
                    console.error(`Failed to update account status: `, error);
                }
                this.successMessage = '';
            }
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