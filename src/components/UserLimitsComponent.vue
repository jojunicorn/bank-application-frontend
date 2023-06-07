<template>
  <div class="container limits">
    <div class="row">
      <div class="card limit" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">General Transaction Limit</h5>
          <h6 class="card-subtitle mb-2 text-muted">How much you can spend in one transaction</h6>
          <p class="card-text limit-amount">
            {{ transactionLimitResponse.transactionLimit.toLocaleString('en-US') }} €
          </p>
        </div>
      </div>
      <div class="card limit" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Daily Limit</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            How much you can still spend today until 12pm
          </h6>
          <p class="card-text limit-amount">
            {{ dailyLimitResponse.dailyLimit.toLocaleString('en-US') }} €
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axiosConfig'

export default {
  mounted() {
    this.getTransactionLimit()
    this.getDailyLimit()
  },
  data() {
    return {
      transactionLimitResponse: {
        id: '',
        transactionLimit: ''
      },
      dailyLimitResponse: {
        id: '',
        dailyLimit: ''
        // when backend implemented maybe remaining daily limit and general daily limit field
      }
    }
  },
  methods: {
    async getTransactionLimit() {
      try {
        const userId = localStorage.getItem('id');

        const response = await axios.get(
          `/users/transactionLimit/${userId}`,
          this.transactionLimitResponse
        )
        const status = JSON.parse(response.status)
        const data = response.data // Response data

        this.transactionLimitResponse.transactionLimit = data.transactionLimit
        //show errormessage if no response
        if (status == 200) {
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getDailyLimit() {
      try {
        const userId = localStorage.getItem('id');

        const response = await axios.get(
          `/users/dailyLimit/${userId}`,
          this.dailyLimitResponse
        )
        const status = JSON.parse(response.status)
        const data = response.data // Response data

        console.log(data)

        this.dailyLimitResponse.dailyLimit = data.dailyLimit
        //show errormessage if no response
        if (status == 200) {
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.main {
  margin: 2%;
}
.limit {
  margin: 5%;
  text-align-last: center;
}
.limits {
  margin-left: 23%;
  margin-right: 23%;
}
.limit-amount {
  color: rgb(103, 14, 113);
  font-weight: bold;
  font-size: 3em;
}
</style>
