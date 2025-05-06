<template>
  <div class="parent-component">
    <SimpleComponent :text="accountData" />
  </div>
</template>

<script setup lang="ts">
import { useAppKitAccount } from '@reown/appkit/vue'
import SimpleComponent from './SimpleComponent.vue'

const account = useAppKitAccount()
const accountData = JSON.stringify(account.value?.embeddedWalletInfo) || 'Nothing'
</script>

<style scoped>
.parent-component {
  padding: 16px;
}
</style>
