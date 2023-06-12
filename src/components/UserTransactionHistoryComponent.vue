<template>
  <div class="container">
    <form class="row g-3" @submit.prevent="getTransactions">
      <div class="form-group col-12" v-if="currentUser?.role != 'ROLE_CUSTOMER'">
        <label for="userInput">User:</label>
        <input type="text" class="form-control" id="userInput" placeholder="Enter user" />
      </div>
      <div class="form-group col-md-6">
        <label for="startDateInput">Start Date:</label>
        <input type="date" class="form-control" id="startDateInput" v-model="startDate"/>
      </div>
      <div class="form-group col-md-6">
        <label for="endDateInput">End Date:</label>
        <input type="date" class="form-control" id="endDateInput" v-model="endDate" />
      </div>
      <div class="form-group col-md-3">
        <label for="minAmount">Minimum amount:</label>
        <input
            type="number"
            class="form-control"
            id="minAmount"
            placeholder="Enter amount"
            step="0.01"
            v-model="minimum"
        />
      </div>
      <div class="form-group col-md-3">
        <label for="maxAmount">Maximum amount:</label>
        <input
            type="number"
            class="form-control"
            id="maxAmount"
            placeholder="Enter amount"
            step="0.01"
            v-model="maximum"
        />
      </div>
      <button type="submit" class="btn btn-primary col-12">Filter</button>
    </form>
    <div>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">User</th>
          <th scope="col">From IBAN</th>
          <th scope="col">To IBAN</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <th scope="row">{{ transaction.id }}</th>
            <td>{{ transaction.transactionType }}</td>
            <td>{{ transaction.userName }}</td>
            <td>{{ transaction.fromIban }}</td>
            <td>{{ transaction.toIban }}</td>
            <td>{{ transaction.amount.toFixed(2) }}</td>
            <td>{{ transaction.timestamp }}</td>
            <td>{{ transaction.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '../axiosConfig';

export default {
  name: "UserTransactionHistoryComponent",
  data() {
    return {
      transactions: [],
      page: 0,
      limit: 10,
      startDate: null,
      endDate: null,
      minimum: null,
      maximum: null,
      currentUser: null,
    };
  },
  async mounted() {
    await this.getCurrentUser();
    this.getTransactions();
    this.setTodaysDate();
  },
  methods: {
    getCurrentUser() {
      axios.get('/users/'+localStorage.getItem("id")).then(response => {
        this.currentUser = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    getTransactions() {
      axios.get('/transactions', {
        params:{
          page: this.page,
          limit: this.limit,
          userId: localStorage.getItem("id"),
          startDate: this.startDate,
          endDate: this.endDate,
          minAmount: this.minimum,
          maxAmount: this.maximum,
        }
      }).then(response => {
        this.transactions = response.data;
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
    },
    setTodaysDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      if(dd<10) {
        dd='0'+dd;
      }
      if(mm<10) {
        mm='0'+mm;
      }
      today = yyyy+'-'+mm+'-'+dd;
      this.startDate = today;
      this.endDate = today;
    }
  },
}
</script>


