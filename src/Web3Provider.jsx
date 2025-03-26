import { useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config";
import { Account } from "./components/Account";
import { WalletOptions } from "./components/WalletOptions";
import { SendTransaction } from "./components/SendTracsaction";
import ReadContract from "./components/ReadContract";
import { ERC20Token } from "./components/ERC20Token";
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

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <div className="w-[700px] mx-auto">
        {children}
        <div className="flex flex-col gap-2 bg-gray-800 p-6 rounded-lg shadow-lg w-full items-start mt-4">
        <SendTransaction />
        <ReadContract />
        </div>
        <ERC20Token />
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
