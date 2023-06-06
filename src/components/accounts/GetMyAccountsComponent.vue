<template>
    <div class="ml-3 mt-3">
        <h2>My bank accounts</h2>

        <ul v-if="loading">
            <li>Loading...</li>
        </ul>
        <ul v-else-if="accounts.length >= 0">
            <li v-for="account in accounts" :key="account.id">
                Account IBAN: {{ account.iban }} | Balance: &euro;  {{ account.balance }} | Absolute limit: {{ account.absoluteLimit
                }} |
                Created At: {{ account.createdAt }} | Type: {{ account.accountType }} | Status: {{ account.accountStatus }}
                |
                Total Balance: {{ account.totalBalance }}
            </li>
        </ul>
        <p v-else>No accounts found.</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted() {
        //replace with logged in user
        const userId = 2;
        this.fetchAccounts(userId);
    },
    data() {
        return {
            accounts: [],
            loading: true,
        };
    },
    methods: {
        fetchAccounts(userId) {
            axios
                .get(`http://localhost:8080/accounts/myAccounts/${userId}`)
                .then(response => {
                    this.accounts = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error(`Failed to get my accounts for user with id ${userId}: `, error);
                    this.loading = false;
                });
        },
    },
};
</script>

<style scoped></style>