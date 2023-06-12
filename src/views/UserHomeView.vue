<script setup>
import { ref } from 'vue'
import NavComponent from '../components/UserNavComponent.vue'
import UserHomeComponent from '../components/UserHomeComponent.vue'
import UserLimitsComponent from '../components/UserLimitsComponent.vue'
import GetMyAccountsComponent from '../components/accounts/GetMyAccountsComponent.vue'
</script>

<template>
  <main>
    <NavComponent :role="role" />
    <UserHomeComponent @role-updated="updateRole" />
    <GetMyAccountsComponent />
    <UserLimitsComponent />
  </main>
</template>

<script>
const role = ref(localStorage.getItem('role'))

function updateRole(newRole) {
  role.value = newRole
}
</script>
