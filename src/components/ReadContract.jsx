import { bscTestnet } from "viem/chains";
import { useBalance, useAccount } from "wagmi";

export default function ReadContract() {
  const { address } = useAccount();
  const { data, isLoading, isError } = useBalance({
    address: address,
    chainId: bscTestnet.id,
  });

  if (!address) return <div className="my-2">Please connect your wallet</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <div className="flex gap-2">
      <span className="font-bold">Balance:</span> {data?.formatted} BNB
    </div>
  );
}
