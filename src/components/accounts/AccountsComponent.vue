<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>IBAN</th>
                    <th>Balance</th>
                    <th>Absolute limit</th>
                    <th>Created at</th>
                    <th>Account Type</th>
                    <th>Account Status</th>
                    <th>Account Holder</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id"></tr>
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
    mounted() {
        this.fetchAccounts();
    },
    methods: {
        fetchAccounts() {
            axios
                .get('/accounts')
                .then(response => {
                    this.accounts = response.data;
                })
                .catch(error => {
                    console.error('Failed to get accounts: ', error);
                });
        },
    },
};
</script>

<style scoped>

</style>