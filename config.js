import { http, createConfig } from 'wagmi'
import { base, bscTestnet, mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'


export const config = createConfig({
  chains: [mainnet, base, sepolia, bscTestnet],
  connectors: [
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
})