import { bscTestnet } from "viem/chains";
import { useBalance, useAccount, useWatchPendingTransactions, useBlockNumber } from "wagmi";
import { useEffect } from "react";

export default function ReadContract() {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useBalance({
    address: address,
    chainId: bscTestnet.id,
    blockTag: 'latest',
  });

  useWatchPendingTransactions({
    onTransactions: () => {
      refetch();
    }
  });

  const { data: blockNumber } = useBlockNumber({
    chainId: bscTestnet.id,
    watch: true,
  });

  useEffect(() => {
    if (blockNumber) {
      refetch();
    }
  }, [blockNumber, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <p className="flex gap-2 text-symbol-primary items-end text-4xl mb-2">
      {data?.formatted} <span className="text-lg">tBNB</span>
    </p>
  );
}
