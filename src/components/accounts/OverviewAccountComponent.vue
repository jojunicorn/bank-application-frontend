<template>
    <div class="ml-3 mt-3" v-if="account">
        <h2 class="text-center">Overview of your bank account {{ account.iban }}</h2>
        <hr style="border: solid 1px black">

        <ul v-if="account" class="list-group text-center">
            <li class="list-group-item active">IBAN: {{ account.iban }}</li>
            <li class="list-group-item">Name: {{ account.user.firstName }} {{ account.user.lastName }}</li>
            <li class="list-group-item active">Balance: &euro; {{ account.balance }}</li>
        </ul>

        <div v-else>
            Account not found.
        </div>

        <hr style="border: solid 1px black">
    </div>
    <p class="ml-3 mt-3 text-center">
        Transaction History
        <UserTransactionHistoryComponent></UserTransactionHistoryComponent>
    </p>
</template>

<script>
import axios from '../../axiosConfig';
import UserTransactionHistoryComponent from "@/components/UserTransactionHistoryComponent.vue";
export default {
    components: {
      UserTransactionHistoryComponent,
    },
    created() {
        this.iban = '';
        if (this.$eventBus.accountUpdateEvent && this.$eventBus.accountUpdateEvent.iban) {
            this.iban = this.$eventBus.accountUpdateEvent.iban; // Set the iban from the event bus
        }
    },
    mounted() {
        this.fetchMyAccount(this.iban);
    },
    data() {
        return {
            account: null,
        };
    },
    methods: {
        async fetchMyAccount() {
            try {
                const response = await axios
                    .get(`/accounts/${this.iban}`);

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
