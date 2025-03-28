import * as React from "react";
import { toast } from "react-toastify";
import { useConnect } from "wagmi";
import metamaskIcon from "@images/metamask-icon.svg";

export function WalletOptions() {
  const { connectors, connect } = useConnect({
    onSuccess: () => {
      toast.success("Wallet connected successfully!");
    },
    onError: () => {
      toast.error("Failed to connect wallet");
    }
  });

  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  if (!metaMaskConnector) return null;

  return (
    <WalletOption
      connector={metaMaskConnector}
      onClick={() => connect({ connector: metaMaskConnector })}
    />
  );
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <div className="p-6 bg-[#252B36] rounded-lg shadow-lg w-fit mx-auto flex flex-col items-start">
      <h2 className="text-gray-300 text-lg font-bold mb-4">Connect a wallet</h2>
      <button 
        disabled={!ready} 
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <img src={metamaskIcon} className="w-6 h-6 mr-2" alt="MetaMask" />
        {connector.name}
      </button>
    </div>
  );
}
