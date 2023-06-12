<template>
  <section class="d-flex justify-content-center align-items-middle h-100">
    <form @submit.prevent class="card p-3">
      <h1>Create a transaction</h1>
      <label>Account</label>
      <select v-model="selectedAccount">
        <option v-for="account in accounts" :key="account.id" :value="account.iban">
          {{ account.iban }}
        </option>
      </select>
      <label>Amount <small>*required</small></label>
      <input type="number" step="0.01" min="0" required />
      <label>Account to</label>
      <input type="text" v-model="targetIBAN" disabled />
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
      userId: null,
      targetIBAN: ''
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
    }
  }
}
</script>

<style>
@import '../assets/transaction.css';
</style>
