import type { AppKitEvent } from '@reown/appkit/vue'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
export const apiToken = useLocalStorage('apiToken', '')
export const walletConnected = useLocalStorage('walletConnected', '')
export const isWalletConnected = computed(() => Boolean(walletConnected.value))
export const loginProvider = useLocalStorage('loginProvider', '')
export const latestEvents = useLocalStorage<AppKitEvent[]>('latestEvents', [])

export function hasTokenExpired() {
  const base64Url = apiToken.value.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  const payload = JSON.parse(jsonPayload) as { exp: number, version: number, sub: string }
  if (payload.sub.toLowerCase() === payload.sub) {
    return true
  }
  // if (payload.version !== 2) {
  //   return true
  // }
  const threeHours = 3 * 60 * 60 * 1000
  return (payload.exp - 7200) * 1000 < Date.now() + threeHours
}
