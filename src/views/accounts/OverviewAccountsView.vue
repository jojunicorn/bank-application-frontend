<script setup>
import UserNavComponent from '../../components/UserNavComponent.vue';
import OverviewAccountComponent from '../../components/accounts/OverviewAccountComponent.vue'
import UserTransactionHistoryComponent from '../../components/UserTransactionHistoryComponent.vue';
</script>

<template>
    <main>
        <UserNavComponent />
        <OverviewAccountComponent />
        <p class="ml-3 mt-3 text-center">
        Transaction History
        <UserTransactionHistoryComponent />
    </p>
    </main>
</template>