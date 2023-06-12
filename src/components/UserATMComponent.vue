<template id="atm">
  <div class="container d-flex justify-content-center">
    <img id="atm-machine" src="../assets/atmMachine.jpg" />
  </div>
  <div class="atm-options d-flex flex-column">
    <button class="btn btn-dark" @click="showDeposit = true">Deposit</button>
    <button class="btn btn-dark" @click="showWithdrawal = true">Withdrawal</button>
  </div>
  <div v-if="showDeposit" class="additional-container d-flex flex-column">
    <button type="button" class="btn-close" @click="showDeposit = false"></button>
    <p class="text-center font-weight-bold">DEPOSIT</p>
    <div class="d-flex justify-content-center">
      <p class="mr-5">Amount (&euro;)</p>
      <input type="number" name="depositAmount" id="deposit-amount" v-model="amount" />
    </div>
    <button class="btn btn-success">Confirm</button>
  </div>
  <div v-if="showWithdrawal" class="additional-container d-flex flex-column">
    <button type="button" class="btn-close" @click="showWithdrawal = false"></button>
    <p class="text-center font-weight-bold">WITHDRAWAL</p>
    <div class="d-flex justify-content-center">
      <p class="mr-5">Amount (&euro;)</p>
      <input type="number" name="withdrawalAmount" id="withdrawal-amount" v-model="amount" />
    </div>
    <button class="btn btn-success">Confirm</button>
  </div>
  <p>Amount: {{ amount }}</p>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      showDeposit: false,
      showWithdrawal: false
    }
  },
  methods: {}
}
</script>

<style>
@import '../assets/userATM.css';
</style>
