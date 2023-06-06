<template>
    <div class="ml-3 mt-3">
        <h2>Find a IBAN based on name</h2>
        <div class="form-group">
            <label for="nameSearch">Search IBAN by customer name: </label>
            <input type="text" id="nameSearch" class="form-control col-md-6" v-model="searchFirstName"
                placeholder="Enter customer's first name" />
            <button @click="searchAccounts" class="btn btn-primary mt-3">Search</button>
        </div>

        <h2>Results</h2>
        <table class="table table-responsive my-3">
            <thead>
                <tr>
                    <th>IBAN</th>
                    <th>Customer's name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>{{ account.iban }}</td>
                    <td>{{ account.user }}</td>
                    <td><button>Create Transaction</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            firstName: '',
            accounts: [],
        };
    },
    methods: {
        async searchAccounts() {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };
            const firstName = this.searchFirstName;

            await axios
                .get(`https://localhost:8080/accounts/getIbanByCustomerName?firstName=${firstName}`, config)
                .then(response => {
                    this.accounts = response.data;
                })
                .catch(error => {
                    console.error(`Failed to find IBAN by customer name: `, error);
                });
        },
    },
};
</script>

<style scoped></style>