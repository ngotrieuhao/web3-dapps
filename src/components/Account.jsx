import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  const handleDisconnect = () => {
    disconnect();
    toast.success("Disconnected wallet successfully");
  };

  useEffect(() => {
    if (address) {
      toast.success("Wallet connected successfully!");
    }
  }, [address])

  return (
    <div className="flex flex-col gap-2 items-center justify-center text-md text-gray-300">
      <div className="flex gap-2">
        {address && <span className="text-gray-400">Address:</span>}{" "}
        {ensName ? `${ensName} (${address})` : address}
      </div>
      <button
        className="w-fit px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
