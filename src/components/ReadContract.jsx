import { bscTestnet } from "viem/chains";
import { useBalance } from "wagmi";

export default function ReadContract() {
  const { data, isLoading, isError } = useBalance({
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    chainId: bscTestnet.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching balance</div>;

  return <div className="my-2">Balance: {data?.formatted} BNB</div>;
}
