import { useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config";
import { Account } from "./components/Account";
import { WalletOptions } from "./components/WalletOptions";
import { SendTransaction } from "./components/SendTracsaction";
import ReadContract from "./components/ReadContract";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    toast.success('Wallet connected successfully!');
    return <Account />;
  }
  return <WalletOptions />;
}

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <div className="w-[700px] mx-auto">
        {children}
        <SendTransaction />
        <ReadContract />
        <ConnectWallet />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
