<template>
    <div class="ml-3 mt-3">
        <h2>Update account absolute limit</h2>
        <div class="form-group">
            <label for="iban">IBAN: </label>
            <input type="text" id="iban" class="form-control col-md-6" v-model="iban" placeholder="Enter IBAN" />
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

            await axios
                .put(`/accounts/absoluteLimit/${iban}`, requestData)
                .then(response => {
                    this.successMessage = response.data;
                    this.errorMessage = '';
                    console.log("Absolute limit updated", response.data);
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.errorMessage = error.response.data;
                    } else {
                        console.error(`Failed to update account absolute limit: `, error);
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