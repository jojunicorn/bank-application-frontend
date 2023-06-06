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
            const config = { headers: { Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYW5rQGluaG9sbGFuZC5jb20iLCJhdXRoIjpbIlJPTEVfRU1QTE9ZRUUiXSwiaWF0IjoxNjg2MDg5MDg3LCJleHAiOjE2ODYxNzU0ODd9.he4QEJ4QEWr8u4QSUaNXwVh19hpyDGuXM8bG_8DkkwkxE-9c0YRyNwJyDcUdl2OyQmovLNhxbnO7Z92AHPk429Yx9_QzaII6hXKi4k367VzKqwp2HqgBLogGZ1LpeHAobGYQ9gAQdixGvaNQwvwbTQ68XljS5B2vmvsgGKp0niYSdJWolxWeHVVcanthTKzcHP8chM0gkcf-zUo1EfAF6jU2McapM6bRHqFwU6TiQEhhMNmii-MIcugohApyPZVdmWHV4Fe5cAu5Hwn_MT0x0ahVI_1zLTlcbt3rKgoJkw7chkl7c7q5BiwrVn3R1znsgKR2-SvpiZFEG3__PSAFXw"}`, }, };
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