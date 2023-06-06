<template>
    <div class="ml-3 mt-3">
        <ul v-for="account in accounts" :key="account.id" class="list-group text-center" style="width: 50%; align-self: center;">
            <h2>Overview of bank account {{ account.iban }}</h2>
            <li class="list-group-item active">Iban: {{ account.iban }}</li>
            <li class="list-group-item">Name: {{ account.user.firstName }} {{ account.user.lastName }}</li>
            <li class="list-group-item active">Balance: &euro; {{ account.balance }}</li>
        </ul>
        
        <div class="ml-3 mt-3 text-center">
            <button class="btn btn-primary">New Transfer</button>
        </div>
        <p>
            Transaction History
        </p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    mounted() {
        const iban = "NL39INHO0747991918";
        this.fetchMyAccount(iban);
    },
    data() {
        return {
            account: [],
        };
    },
    methods: {
        async fetchMyAccount(iban) {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };

            await axios
                .get(`https://localhost:8080/accounts/${iban}`, config)
                .then(response => {
                    const account = response.data;
                    this.accounts = [account];
                })
                .catch(error => {
                    console.error(`Failed to get account overview`);
                });
        },
    },
};
</script>