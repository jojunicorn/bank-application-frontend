<template>
    <h1> {{ transactionLimitResponse.transactionLimit }} </h1>
</template>

<script>
  import axios from '../axiosConfig';
  
  export default {
   
    created(){
        this.getTransactionLimit();
    },
    data() {
        return{
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
    methods:{
        async getTransactionLimit(){
            try{
                const response = await axios.get('http://localhost:8080/users/transactionLimit/1', this.transactionLimitResponse);
                const status = JSON.parse(response.status);
                const data = response.data; // Response data

                this.transactionLimitResponse.transactionLimit = data.transactionLimit;
                //show errormessage if no response
                if (status == 200) {

                }
            }catch(error){
            console.log(error);
            }
        },
        async getDailyLimit(){
            try{
                const response = await axios.get('http://localhost:8080/users/dailyLimit/{id}', this.dailyLimitResponse);
                const status = JSON.parse(response.status);

                //show errormessage if no response
                if (status == 200) {

                }
            }catch(error){
            console.log(error);
            }
        },
    }
}
</script>

<style scoped>
  .main{
    margin: 2%
  }
</style>