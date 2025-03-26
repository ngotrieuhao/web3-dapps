import * as React from "react";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

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
    <button 
      disabled={!ready} 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {connector.name}
    </button>
  );
}
