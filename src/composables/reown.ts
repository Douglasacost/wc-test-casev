import { createAppKit, type CreateAppKit } from '@reown/appkit/vue'

import { type AppKitNetwork, base, baseSepolia } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { env } from '@/env.ts'

export const metadata = {
  name: 'Test dev',
  description: 'Test token',
  url: env.app.url,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [base, baseSepolia]

export const wagmiAdapter = new WagmiAdapter({
  projectId: env.reown.projectId,
  networks,
  customRpcUrls: {
    [`eip155:${base.id}`]: [{
      url: env.contracts.rpcEndpoint,
    }],
  },
})
export const config = wagmiAdapter.wagmiConfig

const isWeb2QueryPresent = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('web2only') === 'true'
}

export const init = () => {
  const isWeb2Only = isWeb2QueryPresent()
  const allWallets: CreateAppKit['allWallets'] = isWeb2Only ? 'HIDE' : 'SHOW'
  createAppKit({
    defaultAccountTypes: { eip155: 'smartAccount' },
    enableAuthLogger: true,
    adapters: [wagmiAdapter],
    networks,
    metadata,
    allWallets,
    enableWallets: !isWeb2Only,
    projectId: env.reown.projectId,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
    },
    allowUnsupportedChain: true,
    defaultNetwork: env.app.isProd ? base : baseSepolia,
  })
}
