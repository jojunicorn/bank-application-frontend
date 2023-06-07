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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MTI3NTg3LCJleHAiOjE2ODYxMzExODd9.nYNq8GY3iK_T_9naXul0qVM6zQQvN4JKpzRjdIIZV_0UQpIDeEUzX3O14YcaOd5NQeVV6JmYFLGFPjhPxr-ycu0-Xibr8ZD30sGnmY6aRSzpYVc8m5mUxAyXQDreiPeFSRxaKl0iIMxtV1rkUkAcHLTGKJzEtzsowVwnw7hNkh2u420ETfrC9jiGtmZf9SCuIEBjK3AA3oYTzDFPzldPc51WKjSZa_eH2--AfRAc77jtkNY2rlyaYBAO1PII18QDu3uy65Fn5E1vFNV3cGroX3T3PeXM-xHwN8EFf02O_ff4Ny8LF52HZaXfwHRHBXLOZ0bDhh2goDuqvld50Nu9Yw"}`, }, };
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