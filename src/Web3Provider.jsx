import { useAccount, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../config';
import { Account } from './components/Account';
import { WalletOptions } from './components/WalletOptions';
import { SendTransaction } from './components/SendTracsaction';
import ReadContract from './components/ReadContract';
import { ERC20Token } from './components/ERC20Token';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <Account />;
  }
  return <WalletOptions />;
}

function Web3Content({ children }) {
  const { address } = useAccount();
  return (
    <>
      <div className='w-[700px] mx-auto z-20 relative'>
        {children}
        {address && <SendTransaction />}
        {address && <ERC20Token />}
        <ConnectWallet />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
      <img
        className='w-full absolute top-0 h-[100vh] z-10'
        aria-hidden='true'
        src='data:image/png;base64,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'
        alt='background-purple'
      ></img>
    </>
  );
}

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Web3Content>{children}</Web3Content>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
