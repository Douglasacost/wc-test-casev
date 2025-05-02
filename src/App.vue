<template>
  <div class="bg-cover bg-center h-screen relative">
    <BaseLayout class="gap-2">
      <button
        class="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
        @click="() => isWalletConnected ? logout() : login()"
      >
        {{ isWalletConnected ? 'Logout' : 'Login' }}
      </button>
      <div>
        <ul>
          <li class="flex gap-2">
            <span>Wallet Connected</span>
            <span>{{ walletConnected }}</span>
          </li>
        </ul>
        <div class="flex gap-2 flex-col">
          <h2 class="text-lg font-bold">
            Latest Events
          </h2>
          <button
            class="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
            @click="() => latestEvents = []"
          >
            Clear
          </button>
          <code
            v-for="event in latestEvents"
            :key="event.timestamp"
          >
            {{ JSON.stringify(event, null, 2) }}
          </code>
        </div>
      </div>
      <RequestSignLoginModal
        :model-value="isRequestSignLoginModalOpen"
        :is-signing="isSigningIn"
        @update:model-value="(isOpen) => isRequestSignLoginModalOpen = isOpen"
        @sign="authenticate"
        @disconnect="logout"
      />
    </BaseLayout>
  </div>
</template>
<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { init } from '@/composables/reown.ts'
import { isSigningIn, useWalletAuth } from '@/composables/wallet/use-wallet-auth.ts'
import RequestSignLoginModal from './components/RequestSignLoginModal.vue'
import { isRequestSignLoginModalOpen } from './composables/wallet/wallet-connect'
import { isWalletConnected, latestEvents, walletConnected } from './composables/auth'

init()
const { authenticate, logout, login } = useWalletAuth()
</script>
