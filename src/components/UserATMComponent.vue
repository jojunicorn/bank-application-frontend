<template id="atm">
  <div class="d-flex justify-content-center">
    <div class="card text-center mb-3">
      <div class="card-body">
        <h1 class="card-title">ATM</h1>
        <div class="row card-info">
          <label class="col text-left font-weight-bold">Balance</label>
          <div class="col text-right">
            <label for="balance">{{ currentAccount?.balance }}</label>
            <label for="currency">&euro;</label>
          </div>
        </div>
        <div class="row card-info">
          <label class="col text-left font-weight-bold">IBAN</label>
          <label class="col text-right" for="iban">{{ currentAccount.iban }}</label>
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
          <button class="btn btn-primary deposit-btn col mr-3" @click="makeDeposit">
            DEPOSIT
          </button>
          <button class="btn btn-primary withdrawal-btn col" @click="makeWithdrawl">
            WITHDRAWAL
          </button>
        </div>
      </div>
    </div>
  </div>
  <p id="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>

<script>
import axios from '../axiosConfig';

export default {
  mounted() {
    const userId = localStorage.getItem('id');
    this.getCurrentAccount(userId);
    console.log(this.currentAccount)
  },
  data() {
  
    return {
      amount: 0,
      showDeposit: false,
      showWithdrawal: false,
      accounts: [],
      currentAccount: '',
      errorMessage: '',

      transactionRequest: {
        fromIban: '',
        toIban: '',
        amount: '',
        description: '',
      }
    }
  },
  methods: {
    async getCurrentAccount(userId) {
      try {
        const response = await axios.get(`/accounts/myAccounts/${userId}`);
        this.accounts = response.data;
        console.log(this.accounts);
        
        this.accounts.forEach(element => {
          console.log(element)
          if (element.accountType === 'CURRENT') {
            this.currentAccount = element;
          }
        });
      } catch (error) {
        console.error(`Failed to get my accounts for user with id ${userId}: `, error);
      }
    },
    async makeDeposit(){
      try{
        if(this.amount < 0){
          console.log("error")
        }else{
          this.transactionRequest.amount = this.amount
          this.transactionRequest.toIban = this.currentAccount.iban
          this.transactionRequest.description = "ATM Deposit"
          console.log(this.transactionRequest)
          const response = await axios.post('/transactions/atm/deposit', this.transactionRequest);
          this.amount = 0
        }
      }catch(error){
        this.errorMessage = error.response.data;
      }

    },
    async makeWithdrawl(){
      try{
        if(this.amount < 0){
          console.log("error")
        }else{
          this.transactionRequest.amount = this.amount
          this.transactionRequest.fromIban = this.currentAccount.iban
          this.transactionRequest.description = "ATM Withdrawl"
          console.log(this.transactionRequest)
          const response = await axios.post('/transactions/atm/withdrawal', this.transactionRequest);
          this.amount = 0
        }
      }catch(error){
        this.errorMessage = error.response.data;
      }
    },

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
@import '../assets/userATM.css';
</style>
