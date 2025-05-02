import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { wagmiAdapter } from '@/composables/reown'
import InlineSvg from 'vue-inline-svg'
const queryClient = new QueryClient()
const app = createApp(App)

// End Sentry
app.component('InlineSvg', InlineSvg)
app.use(VueQueryPlugin, { queryClient })
app.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
app.mount('#app')
