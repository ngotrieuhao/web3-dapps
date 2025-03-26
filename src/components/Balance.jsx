import { useAccount, useBalance } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';

const Balance = () => {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address,
    chainId: bscTestnet.id,
  });

  if (isLoading) return <p>Loading balance...</p>;

  return <p>Balance: {data?.formatted} BNB</p>;
};

export default Balance;
