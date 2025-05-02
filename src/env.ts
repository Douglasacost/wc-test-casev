export const appEnv = import.meta.env.VITE_APP_ENV as string
export const env = {
  app: {
    url: import.meta.env.VITE_APP_URL as string,
    isProd: appEnv === 'prod',
  },
  reown: {
    projectId: import.meta.env.VITE_REOWN_PROJECT_ID as string,
  },
  contracts: {
    rpcEndpoint: import.meta.env.VITE_RPC_ENDPOINT as string,
  },
}
