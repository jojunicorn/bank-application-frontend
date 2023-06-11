<template>
  <div class="ml-3 mt-3">
    <h2>Get one or more bank accounts</h2>
    <div class="form-group row">
      <label for="ibanSearch" class="col-sm-2 col-form-label">Search account by IBAN: </label>
      <div class="col-md-10">
        <div class="input-group">
          <input type="text" id="ibanSearch" class="form-control col-md-2" v-model="searchIban"
            placeholder="Enter IBAN" />
          <div class="input-group-append">
            <button @click="fetchAccounts" class="btn btn-primary">Search account</button>
          </div>

          <div class="ml-auto mr-5">
            <a href="/accountsCreate" class="btn btn-success">Create new account</a>
          </div>
        </div>
      </div>
    </div>
    <h2>Bank Accounts</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-striped my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>IBAN</th>
            <th>Balance</th>
            <th>Absolute limit</th>
            <th>Created at</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Account Holder ID</th>
            <th>Account Holder</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{ account.id }}</td>
            <td>{{ account.iban }}</td>
            <td>&euro; {{ account.balance }}</td>
            <td>{{ account.absoluteLimit }}</td>
            <td>{{ account.createdAt }}</td>
            <td>{{ account.accountType }}</td>
            <td :class="{ 'success-message': account.accountStatus === 'ACTIVE', 'error-message': account.accountStatus === 'INACTIVE' }">
              {{ account.accountStatus }}
            </td>
            <td>{{ account.user.id }}</td>
            <td>{{ account.user.firstName }} {{ account.user.lastName }}</td>
            <td>
              <div class="btn-group" role="group">
                <a @click="goToEditStatus(account.iban)" target="_blank" class="btn btn-warning mt-3 mr-3">Update
                  account
                  status</a>
                <a @click="goToEditLimit(account.iban)" target="_blank" class="btn btn-warning mt-3 mr-3">Update
                  absolute
                  limit</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from '../../axiosConfig';
export default {
  mounted() {
    this.fetchAccounts();
  },
  data() {
    return {
      accounts: [],
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async fetchAccounts() {
      const iban = this.searchIban;

      if (iban) {
        await axios
          .get(`/accounts/${iban}`)
          .then(response => {
            this.errorMessage = '';
            const account = response.data;
            this.accounts = [account];
          })
          .catch(error => {
            if (error.response && error.response.data) {
              this.errorMessage = error.response.data;
            } else {
              this.errorMessage = 'Failed to get account with IBAN.' + iban;
            }
            this.successMessage = '';
          });
      } else {
        await axios
          .get(`/accounts`)
          .then(response => {
            this.errorMessage = '';
            this.accounts = response.data;
          })
          .catch(error => {
            if (error.response && error.response.data) {
              this.errorMessage = error.response.data;
            } else {
              this.errorMessage = 'Failed to get accounts.';
            }
            this.successMessage = '';
          });
      }
      this.successMessage = ''
    },
    goToEditStatus(iban) {
      this.$eventBus.accountUpdateEvent = { iban: iban };
      this.$router.push({ name: 'updateAccount' });
    },
    goToEditLimit(iban) {
      this.$eventBus.accountUpdateLimitEvent = { iban: iban };
      this.$router.push({ name: 'updateAbsoluteLimit' });
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

.btn-group .btn {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}
</style>
