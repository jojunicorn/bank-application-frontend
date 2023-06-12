<template>
  <section class="d-flex justify-content-center align-items-middle h-100">
    <form @submit.prevent="commitTransfer" class="card p-3">
      <h1>Create a transaction</h1>
      <label>Account</label>
      <select v-model="selectedAccount">
        <option v-for="account in accounts" :key="account.id" :value="account.iban">
          {{ account.iban }} ({{account.accountType}})
        </option>
      </select>
      <span>Balance: &euro; {{selectedAccount?.balance}}</span>
      <label class="my-2">Amount <small>*required</small></label>
      <input type="number" step="0.01" min="0" required />
      <label class="my-2">Account to</label>
      <input type="text" v-model="targetIBAN" disabled />
      <button class="btn btn-primary my-3">Transfer</button>
      <div v-if="errorHappened">{{error}}</div>
    </form>
  </section>
</template>

<script>
import axios from '../axiosConfig'

export default {
  name: 'UserTransactionsComponent',
  data() {
    return {
      accounts: [],
      selectedAccount: null,
      userId: null,
      targetIBAN: '',
      error: '',
      errorHappened: false,
      success: '',
      successHappened: false,
    }
  },
  mounted() {
    if (this.$eventBus.tempIban != null) {
      this.targetIBAN = this.$eventBus.tempIban
    }

    this.userId = localStorage.getItem('id')
    this.GetAccounts()
  },
  methods: {
    async GetAccounts() {
      await axios.get('/accounts/myAccounts/' + this.userId).then((response) => {
        this.accounts = response.data
      })
    },
    commitTransfer() {
      this.errorHappened = false;
      this.successHappened = false;

      this.$eventBus.tempIban = this.targetIBAN
      axios.post('/transactions', {
        fromIban: this.selectedAccount.iban,
        toIban: this.targetIBAN,
        amount: this.amount
      }).then((response) => {
        this.success = "Transfer successful!"
        this.successHappened = true
      }).catch((error) => {
        this.error = error.response.data.message
        this.errorHappened = true
      })
    }
  }
}
</script>

<style>
@import '../assets/transaction.css';
</style>
