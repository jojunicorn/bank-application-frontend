<template>
  <section class="d-flex justify-content-center align-items-middle h-100">
      <form @submit.prevent class="card p-3">
        <h1>Create a transaction</h1>
        <label>Account</label>
        <select>
          <option value="CURRENT">put current</option>
          <option value="SAVING">put saviing</option>
        </select>
        <label>Amount <small>*required</small></label>
        <input type="number" step="0.01" min="0" required>
        <label>Account to</label>
        <input type="text" v-model="targetIBAN" disabled/>
      </form>
  </section>
</template>

<script>
export default {
  name: "UserTransactionsComponent",
  data() {
    return {
      targetIBAN: ''
    }
  },
  mounted() {
  if (this.$eventBus.tempIban != null)
  {
    this.targetIBAN = this.$eventBus.tempIban;
  }
}
}

</script>

<style>
@import '../assets/transaction.css';
</style>
