<template>
  <div class="ml-3 mt-3">
    <h2>Find a IBAN based on name</h2>
    <div class="form-group">
      <label for="nameSearch">Search IBAN by customer name: </label>
      <input
        type="text"
        id="nameSearch"
        class="form-control col-md-6"
        v-model="searchFirstName"
        placeholder="Enter customer's first name"
      />
      <button @click="searchAccounts" class="btn btn-primary mt-3">Search</button>
    </div>

        <h2>Results</h2>
        <table class="table table-responsive my-3">
            <thead>
                <tr>
                    <th>IBAN</th>
                    <th>Customer's name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>{{ account.iban }}</td>
                    <td>{{ account.user }}</td>
                    <td>{{ account.accountType }}</td>
                    <td><button>Create Transaction</button></td>
                </tr>
            </tbody>
        </table>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>

<script>
import axios from '../../axiosConfig'
export default {
  data() {
    return {
      firstName: '',
      accounts: [],
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async searchAccounts() {
      const firstName = this.searchFirstName

      await axios
        .get(`/accounts/getIbanByCustomerName?firstName=${firstName}`)
        .then((response) => {
          this.accounts = response.data
          this.errorMessage = ''
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.errorMessage = error.response.data
          } else {
            this.errorMessage =
              'Customer with name "' + `${firstName}` + '" does not have a bank account.'
          }
          this.successMessage = ''
        })
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>
