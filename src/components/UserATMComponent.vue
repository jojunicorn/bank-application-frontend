<template id="atm">
  <div class="d-flex justify-content-center">
    <div class="card text-center mb-3">
      <div class="card-body">
        <h1 class="card-title">ATM</h1>
        <div class="row card-info">
          <label class="col text-left font-weight-bold">Balance</label>
          <div class="col text-right">
            <label for="balance">0.00</label>
            <label for="currency">&euro;</label>
          </div>
        </div>
        <div class="row card-info">
          <label class="col text-left font-weight-bold">Account holder</label>
          <label class="col text-right" for="name">Alba Placeres</label>
        </div>
        <div class="row card-info">
          <label class="col text-left font-weight-bold">IBAN</label>
          <label class="col text-right" for="iban">31231657543</label>
        </div>
        <div class="amount-input input-group mb-3">
          <span class="input-group-text font-weight-bold">&euro;</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount"
            v-model="amount"
            @input="validateInput"
          />
        </div>
        <div class="row btn-widthdrawal-deposit">
          <button class="btn btn-primary deposit-btn col mr-3" @click="showDeposit = true">
            DEPOSIT
          </button>
          <button class="btn btn-primary withdrawal-btn col" @click="showWithdrawal = true">
            WITHDRAWAL
          </button>
        </div>
      </div>
    </div>
  </div>

  <p>Amount: {{ amount }}</p>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      showDeposit: false,
      showWithdrawal: false
    }
  },
  methods: {
    // prevent user from entering an amount lower than 0
    validateInput(){
      if (this.amount < 0) {
            this.amount = 0;
          }
    }
  }
};
</script>

<style>
@import '../assets/userAtm.css';
</style>
