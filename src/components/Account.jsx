import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { toast } from 'react-toastify';

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  const handleDisconnect = () => {
    disconnect();
    toast.success('Disconnected wallet successfully');
  };

  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      {address && <div>Address: {ensName ? `${ensName} (${address})` : address}</div>}
      <button 
        className='w-fit px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600' 
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
    </div>
  )
}