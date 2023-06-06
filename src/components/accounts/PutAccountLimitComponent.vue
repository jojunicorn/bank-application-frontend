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
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            iban: '',
            absoluteLimit: '',
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
                .put(`http://localhost:8080/accounts/absoluteLimit/${iban}`, requestData)
                .then(response => {
                    console.log("Absolute limit updated", response.data);
                })
                .catch(error => {
                    console.error(`Failed to update account absolute limit: `, error);
                });
        },
    },
};
</script>