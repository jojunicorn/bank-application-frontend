<template>
    <div class="ml-3 mt-3">
        <h2>Get one or more bank accounts</h2>
        <div class="form-group">
            <label for="ibanSearch">Search account by IBAN: </label>
            <input type="text" id="ibanSeach" class="form-control col-md-6" v-model="searchIban" placeholder="Enter IBAN" />
            <button @click="searchAccounts" class="btn btn-primary mt-3">Search</button>
        </div>

        <h2>Results</h2>
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
                    <th>Account Holder Name</th>
                    <th>Account Holder Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>{{ account.id }}</td>
                    <td>{{ account.iban }}</td>
                    <td>{{ account.balance }}</td>
                    <td>{{ account.absoluteLimit }}</td>
                    <td>{{ account.createdAt }}</td>
                    <td>{{ account.accountType }}</td>
                    <td>{{ account.accountStatus }}</td>
                    <td>{{ account.accountHolder.id }}</td>
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
            accounts: [],
        };
    },
    // mounted() {
    //     this.fetchAccounts();
    // },
    methods: {
        fetchAccounts() {
            const iban = this.searchIban;

            if (iban) {
                axios
                    .get(`/accounts/${iban}`)
                    .then(response => {
                        const account = response.data;
                        this.accounts = [account];
                    })
                    .catch(error => {
                        console.error(`Failed to get account with IBAN ${iban}: `, error);
                    });
            } else {
                axios
                    .get(`/accounts`)
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