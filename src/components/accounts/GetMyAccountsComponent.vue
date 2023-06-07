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
import axios from '../../axiosConfig';
export default {
    mounted() {
        const userId = localStorage.getItem('id');
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
                .get(`/accounts/myAccounts/${userId}`)
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