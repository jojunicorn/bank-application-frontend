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
        async updateAccountStatus() {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };
            const iban = this.iban;
            const accountStatus = this.accountStatus;

            const requestData = {
                accountStatus: accountStatus,
            };

            await axios
                .put(`https://localhost:8080/accounts/accountStatus/${iban}`, requestData, config)
                .then(response => {
                    console.log("Status updated", response.data);
                })
                .catch(error => {
                    console.error(`Failed to update account status: `, error);
                });
        },
    },
};
</script>