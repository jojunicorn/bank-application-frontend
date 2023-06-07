<template>
    <div class="ml-3 mt-3">
        <h2 class="text-center">My bank accounts</h2>

        <ul v-if="loading">
            <li>Loading...</li>
        </ul>
        <ul v-else-if="accounts.length >= 0" class="inline-list">
            <li v-for="account in accounts" :key="account.id">
                <div class="container limits">
                    <div class="row">
                        <div class="card limit">
                            <div class="card-body">
                                <h4 class="card-title text-center"> Account IBAN: <a
                                        :href="`/accounts/myAccount/${account.iban}`">{{ account.iban }}</a></h4>
                                <h5 class="card-title"> Account Type: {{ account.accountType }}</h5>
                                <h5 class="card-subtitle"> Account Balance: &euro; {{ account.balance }}</h5>
                                <p class="card-text"> Absolute limit: &euro; {{ account.absoluteLimit }}</p>
                                <p class="card-text"> Created at: {{ account.createdAt }}</p>
                                <p class="card-text"> Account status: {{ account.accountStatus }}</p>
                                <p class="card-text"> Total Balance: &euro; {{ account.totalBalance }}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };

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

<style scoped>
.main {
    margin: 2%
}

.limit {
    margin: 5%;
    text-align-last: center;
    background-color: purple;
    width: auto;
}

.inline-list {
    display: inline-flex;
    list-style: none;
    flex-flow: row;
    padding-left: 350px;
}

.inline-list li {
    flex: 1 0 50%;
    /* Adjust this value to control the width of each li element */
    padding-left: 50px;
}
</style>