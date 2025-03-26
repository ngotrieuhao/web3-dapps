import * as React from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatUnits } from "viem";
import { toast } from "react-toastify";

// ERC20 ABI
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

// BUSD Token trên BSC Testnet
const TOKEN_ADDRESS = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";

export function ERC20Token() {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  // Đọc balance của token
  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  // Hàm transfer token
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Theo dõi trạng thái transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed successfully!");
    }
  }, [isConfirmed]);

  return (
    <div className="my-4">
      <h2 className="text-red-500 text-4xl font-bold mb-4">
        ERC20 Token Operations
      </h2>

      <div className="flex flex-col gap-2 bg-gray-800 p-6 rounded-lg shadow-lg w-full items-start mt-4">
        <form className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border rounded"
              required
              step="any"
            />
          </div>
          <button
            onClick={() =>
              writeContract({
                address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                functionName: "transferFrom",
                args: [
                  "0xd2135CfB216b74109775236E36d4b433F1DF507B",
                  "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
                  123n,
                ],
              })
            }
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            {isPending || isConfirming ? "Confirming..." : "Send Tokens"}
          </button>
        </form>
        <div className="w-full flex gap-2">
          <h3 className="font-semibold">Your Balance:</h3>
          {isBalanceLoading ? (
            <div>Loading balance...</div>
          ) : (
            <span>{balance ? formatUnits(balance, 18) : "0"} BUSD</span>
          )}
        </div>
      </div>

      {hash && <div className="mt-2">Transaction Hash: {hash}</div>}
      {isConfirming && <div className="mt-2">Waiting for confirmation...</div>}
      {isConfirmed && <div className="mt-2">Transaction confirmed.</div>}
    </div>
  );
}
