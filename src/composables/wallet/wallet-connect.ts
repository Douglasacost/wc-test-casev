import { useAppKitEvents } from '@reown/appkit/vue'
import { ref, watch } from 'vue'
import { latestEvents, loginProvider } from '../auth'

let isWatcherInitialized = false
const isRequestSignLoginModalOpen = ref(false)
const isWCReady = ref(false)

const useWalletEvents = () => {
  console.debug('useWalletEvents', isWatcherInitialized)
  if (!isWatcherInitialized) {
    const events = useAppKitEvents()
    watch(events, (events) => {
      const eventName = events.data.event
      console.debug('eventName', eventName)
      console.debug('events', events)
      latestEvents.value.push(Object.assign({}, events))
      switch (eventName) {
      case 'INITIALIZE':
        isWCReady.value = true
        break
      case 'SOCIAL_LOGIN_STARTED':
        loginProvider.value = events.data.properties.provider
        break

      case 'EMAIL_LOGIN_SELECTED':
        loginProvider.value = 'email'
        break

      case 'SELECT_WALLET':
        loginProvider.value = events.data.properties.name
        break

      case 'CONNECT_SUCCESS':
      case 'SOCIAL_LOGIN_SUCCESS':
      case 'EMAIL_VERIFICATION_CODE_PASS':
        isRequestSignLoginModalOpen.value = true
        break
      }
    })

    isWatcherInitialized = true
  }
}

export { useWalletEvents, isWCReady, isRequestSignLoginModalOpen }
