<script setup>
  import HomeComponent from '../components/HomeComponent.vue';
</script>

<template>
  <main>
    <HomeComponent />
  </main>
</template>


<style scoped>
  main{
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(../assets/background.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
  }

</style>