<template>
  <div class="bg-cover bg-center h-screen relative">
    <BaseLayout class="gap-2">
      <button
        class="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
        @click="() => isWalletConnected ? logout() : login()"
      >
        {{ isWalletConnected ? 'Logout' : 'Login' }}
      </button>
      <ParentComponent />
      <div>
        <ul class="p-4">
          <li class="flex gap-2">
            <span>Connected account:</span>
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
import { isRequestSignLoginModalOpen, isSigningIn, useWalletAuth } from '@/composables/wallet/use-wallet-auth.ts'
import RequestSignLoginModal from './components/RequestSignLoginModal.vue'
import { isWalletConnected, latestEvents, walletConnected } from './composables/auth'
import ParentComponent from './components/ParentComponent.vue'

init()
const { authenticate, logout, login } = useWalletAuth()
</script>
