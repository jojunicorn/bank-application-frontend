<template>
    <div class="ml-3 mt-3">
        <h2>Update account status</h2>
        <div class="form-group">
            <label for="iban">IBAN: </label>
            <input type="text" id="iban" class="form-control col-md-6" v-model="iban" placeholder="Enter IBAN" />
        </div>
        <div class="form-group">
            <label for="status">Account Status: </label>
            <select id="status" class="form-control col-md-6" v-model="accountStatus">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
            <button @click="updateAccountStatus" class="btn btn-primary mt-3">Update Status</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            iban: '',
            accountStatus: 'ACTIVE',
        };
    },
    methods: {
        updateAccountStatus() {
            const iban = this.iban;
            const accountStatus = this.accountStatus;

            const requestData = {
                accountStatus: accountStatus,
            };

            axios
                .put(`accounts/accountStatus/${iban}`, requestData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(`Failed to update account status: `, error);
                });
        },
    },
};
</script>