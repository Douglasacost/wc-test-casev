import { signMessage } from '@wagmi/core'
import {
  apiToken,
  isWalletConnected,
  walletConnected,
} from '@/composables/auth.ts'
import { ref, watch } from 'vue'
import {
  useAppKit,
  useAppKitAccount,
  type UseAppKitAccountReturn,
  useDisconnect,
} from '@reown/appkit/vue'
import {
  isWCReady,
  useWalletEvents,
} from '@/composables/wallet/wallet-connect.ts'
import { config } from '../reown'

export const isRequestSignLoginModalOpen = ref(false)
export const isSigningIn = ref(false)
const isEOA = ref(false)

/* TODO: Create a real store with: ex. Pinia */
const useAuthStore = () => {

  const authenticate = async (account: UseAppKitAccountReturn) => {
    if (isSigningIn.value) return

    try {
      isSigningIn.value = true
      const { message } = {
        message: 'Please sign this message to login to Lingo!',
      }

      let signature = ''
      if (isEOA.value) {
        isRequestSignLoginModalOpen.value = false
        signature = await signMessage(config, {
          message: message,
        })
        isRequestSignLoginModalOpen.value = true
      } else {
        signature = await signMessage(config, {
          message: message,
        })
      }

      apiToken.value = signature
      walletConnected.value = account.address

      isRequestSignLoginModalOpen.value = false
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      isSigningIn.value = false
    }
  }

  return {
    authenticate,
  }
}

export const useWalletAuth = () => {
  const { disconnect } = useDisconnect()
  const account = useAppKitAccount()
  const { open } = useAppKit()
  const authStore = useAuthStore()
  const authenticate = () => authStore.authenticate(account.value)

  useWalletEvents()

  async function login() {
    if (!isWCReady.value) return
    await open({ view: 'Connect', namespace: 'eip155' })
  }

  async function logout() {
    try {
      await disconnect()
    } catch (e) {
      // In case wallet is not connected, it will throw an error
      console.log('error:', e)
    }
    apiToken.value = ''
    walletConnected.value = ''
    isRequestSignLoginModalOpen.value = false
    isSigningIn.value = false
  }

  watch(
    () => account.value.address,
    async (value) => {
      if (
        isWalletConnected.value &&
        !!value &&
        value !== walletConnected.value
      ) {
        await logout()
      }
    },
  )

  watch(
    () => account.value.embeddedWalletInfo?.accountType,
    (accountType) => {
      isEOA.value = accountType === 'eoa'
    },
    { immediate: true },
  )

  watch(
    () => isRequestSignLoginModalOpen.value,
    (value, oldValue) => {
      if (value && !oldValue && !isWalletConnected.value) {
        isRequestSignLoginModalOpen.value = false
      }
    },
  )

  watch(
    () => account.value,
    (value) => {
      console.log('account.value', value)
    },
  )

  return {
    login,
    logout,
    authenticate,
  }
}
