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
import axios from "axios";

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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };
            const iban = this.iban;
            const absoluteLimit = this.absoluteLimit;

            const requestData = {
                absoluteLimit: absoluteLimit,
            };

            await axios
                .put(`https://localhost:8080/accounts/absoluteLimit/${iban}`, requestData, config)
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