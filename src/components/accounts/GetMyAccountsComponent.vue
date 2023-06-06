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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDYwNTI3LCJleHAiOjE2ODYwNjQxMjd9.dVg5KDEWn3usn3HAM1poMOTg_9yg3fvIxpjR9Nw4xZc92at6JHWlABwoYiDtTeB3AxXqYekkHor60mLd3REC4U5MMWKXHH4Oz3CY81pyCpWZ_aengKO6CSAzMY8lzhyyK7B0eWDlqLMDu_qp1qe45dW-cjax9tWEyaq1QGRzYRSEyQyVV86GFv3eed-hd7zEoCMejPM0oD5XKC8wEHWaxEGOJpfTcGue5bloxHMaUtla87XQuLVD3-gSfsHSOwsBMEiL5wMUZ_gXx1k6mufWUxGjXdGVpTgk6daQfTBBHwEXjc0RU8lPyyb1u6zw6wO127h6z3yJAl-ryetXnxj6UA"}`, }, };

            await axios
                .get(`https://localhost:8080/accounts/myAccounts/${userId}`, config)
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