<script setup>
  import UserNavComponent from '../components/UserNavComponent.vue';
  import UserHomeComponent from '../components/UserHomeComponent.vue';
  import UserLimitsComponent from '../components/UserLimitsComponent.vue';

</script>

<template>
  <main>
    <UserNavComponent />
    <UserHomeComponent />
    <UserLimitsComponent />
  </main>
</template>

<style scoped>
  /* main{
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(../assets/background2.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;  
  } */
</style>
