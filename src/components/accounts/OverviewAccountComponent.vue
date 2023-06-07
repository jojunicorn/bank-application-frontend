<template>
    <div class="ml-3 mt-3" v-if="account">
        <h2 class="text-center">Overview of your bank account {{ account.iban }}</h2>
        <hr style="border: solid 1px black">

        <ul v-if="account" class="list-group text-center">
            <li class="list-group-item active">Iban: {{ account.iban }}</li>
            <li class="list-group-item">Name: {{ account.user.firstName }} {{ account.user.lastName }}</li>
            <li class="list-group-item active">Balance: &euro; {{ account.balance }}</li>
        </ul>

        <div v-else>
            Account not found.
        </div>

        <hr style="border: solid 1px black">
    </div>

    <div class="ml-3 mt-3 text-center">
        <button class="btn btn-primary">New Transfer</button>
    </div>

    <p class="ml-3 mt-3 text-center">
        Transaction History
        <!-- add alba's part -->
    </p>
</template>

<script>
import axios from "axios";
export default {
    mounted() {
        const iban = this.$route.params.iban;
        this.fetchMyAccount(iban);
    },
    data() {
        return {
            account: null,
        };
    },
    methods: {
        async fetchMyAccount(iban) {
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            try {
                const response = await axios
                    .get(`https://localhost:8080/accounts/${iban}`);

                const account = response.data;
                this.account = account;

            } catch (error) {
                console.error(`Failed to get account overview`, error);
            }
        },
    },
};
</script>

<style scoped>
.list-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 0 auto;
}

.list-group-item {
    height: 50px;
    /* Adjust the height as needed */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.list-group-item.active {
    height: 50px;
    /* Adjust the height as needed */
    background-color: purple;
    color: #fff;
}
</style>