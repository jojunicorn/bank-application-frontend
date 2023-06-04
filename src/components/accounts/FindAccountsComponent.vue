<template>
    <div class="ml-3 mt-3">
        <h2>Find a IBAN based on name</h2>
        <div class="form-group">
            <label for="nameSearch">Search IBAN by customer name: </label>
            <input type="text" id="nameSearch" class="form-control col-md-6" v-model="searchFirstName" placeholder="Enter customer's first name" />
            <button @click="searchAccounts" class="btn btn-primary mt-3">Search</button>
        </div>

        <h2>Results</h2>
        <table class="table table-responsive my-3">
            <thead>
                <tr>
                    <th>IBAN</th>
                    <th>Customer's name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>{{ account.iban }}</td>
                    <td>{{ account.accountHolder.firstName }}</td>
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
            searchFirstName: '',
            accounts: [],
        };
    },
    methods: {
        searchAccounts() {
            const firstName = this.searchFirstName;

            axios
                .get(`/accounts/getIbanByCustomerName?firstName=${firstName}`)
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