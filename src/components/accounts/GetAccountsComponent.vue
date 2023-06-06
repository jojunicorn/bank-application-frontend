<template>
    <div class="ml-3 mt-3">
        <h2>Get one or more bank accounts</h2>
        <div class="form-group">
            <label for="ibanSearch">Search account by IBAN: </label>
            <input type="text" id="ibanSearch" class="form-control col-md-6" v-model="searchIban"
                placeholder="Enter IBAN" />
            <button @click="fetchAccounts" class="btn btn-primary mt-3">Search</button>
        </div>
        <h2>Bank Accounts</h2>
        <table class="table table-responsive my-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>IBAN</th>
                    <th>Balance</th>
                    <th>Absolute limit</th>
                    <th>Created at</th>
                    <th>Account Type</th>
                    <th>Account Status</th>
                    <th>Account Holder ID</th>
                    <!-- <th>Account Holder Name</th>
                    <th>Account Holder Email</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>{{ account.id }}</td>
                    <td>{{ account.iban }}</td>
                    <td>&euro; {{ account.balance }}</td>
                    <td>{{ account.absoluteLimit }}</td>
                    <td>{{ account.createdAt }}</td>
                    <td>{{ account.accountType }}</td>
                    <td>{{ account.accountStatus }}</td>
                    <td>{{ account.user }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted() {
        this.fetchAccounts();
    },
    data() {
        return {
            accounts: {
                id: '',
                iban: '',
                balance: '',
                absoluteLimit: '',
                createdAt: '',
                accountType: '',
                accountStatus: '',
                user: []
            },
        };
    },
    methods: {
        async fetchAccounts() {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };
            const iban = this.searchIban;

            if (iban) {
                await axios
                    .get(`https://localhost:8080/accounts/${iban}`, config)
                    .then(response => {
                        const account = response.data;
                        this.accounts = [account];
                    })
                    .catch(error => {
                        console.error(`Failed to get account with IBAN ${iban}: `, error);
                    });
            } else {
                await axios
                    .get(`https://localhost:8080/accounts`, config)
                    .then(response => {
                        this.accounts = response.data;
                    })
                    .catch(error => {
                        console.error(`Failed to get accounts: `, error);
                    });
            }
        },
    },
};
</script>

<style scoped></style>