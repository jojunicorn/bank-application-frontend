<template>
    <div class="ml-3 mt-3">
        <h2>My bank accounts</h2>

        <ul v-if="loading">
            <li>Loading...</li>
        </ul>
        <ul v-else-if="accounts.length >= 0">
            <li v-for="account in accounts" :key="account.id">
                Type: {{ account.accountType }} | Account IBAN: {{ account.iban }} | Balance: &euro; {{ account.balance }} | Absolute limit: &euro; {{ account.absoluteLimit
                }} |
                Created At: {{ account.createdAt }} | Status: {{ account.accountStatus }}
                |
                Total Balance: &euro; {{ account.totalBalance }}
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
        async fetchAccounts(userId) {
            await axios
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