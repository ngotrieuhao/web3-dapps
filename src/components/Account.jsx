import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { toast } from "react-toastify";

export function Account() {
  const { address } = useAccount();
  console.log(" Account ~ address:", address)
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  console.log(" Account ~ ensName:", ensName)

  const handleDisconnect = () => {
    disconnect();
    toast.success("Disconnected wallet successfully");
  };


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
