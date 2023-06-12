<template>
    <div class="ml-3 mt-3">
        <h2>Update account absolute limit</h2>
        <div class="form-group">
            <label for="iban">IBAN: </label>
            <input type="text" id="iban" class="form-control col-md-6" v-model="iban" />
        </div>
        <div class="form-group">
            <label for="absoluteLimit">Account Absolute limit: </label>
            <input type="number" id="absoluteLimit" class="form-control col-md-6" v-model="absoluteLimit"
                placeholder="Enter new absolute limit" />
            <button @click="updateAccountAbsoluteLimit" class="btn btn-primary mt-3">Update Absolute Limit</button>
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
        if (this.$eventBus.accountUpdateLimitEvent && this.$eventBus.accountUpdateLimitEvent.iban) {
            this.iban = this.$eventBus.accountUpdateLimitEvent.iban; // Set the iban from the event bus
        }
    },
    data() {
        return {
            iban: '',
            absoluteLimit: '',
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        async updateAccountAbsoluteLimit() {
            const iban = this.iban;
            const absoluteLimit = this.absoluteLimit;

            const requestData = {
                absoluteLimit: absoluteLimit,
            };

            try {
                const response = await axios.put(`/accounts/absoluteLimit/${iban}`, requestData);
                this.successMessage = response.data;
                this.errorMessage = '';
                console.log("Absolute limit updated", response.data);

                setTimeout(() => {
                    // Navigate to another page after 5 seconds
                    this.$router.push('/accounts');
                }, 1000); // Delay in milliseconds (5 seconds)

            } catch (error) {
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data;
                } else {
                    console.error(`Failed to update account absolute limit: `, error);
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