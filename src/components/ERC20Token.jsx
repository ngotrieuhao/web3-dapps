import * as React from 'react';
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { formatUnits, erc20Abi, parseUnits } from 'viem';
import { toast } from 'react-toastify';
import busdIcon from '@images/busd-logo.svg';

const TOKENS = {
  BUSD: {
    address: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    symbol: 'BUSD',
    decimals: 18,
  },
};

export function ERC20Token() {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [selectedToken, setSelectedToken] = React.useState('BUSD');

  const currentToken = TOKENS[selectedToken];

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: currentToken.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed successfully!');
      refetchBalance();
    }
  }, [refetchBalance, isConfirmed]);

  return (
    <div className='my-4'>
      <h2 className='mb-4 text-4xl font-bold text-center text-red-500'>
        ERC20 Token Operations
      </h2>

      <div className='flex flex-col items-start w-full gap-2 p-6 mt-4 bg-gray-800 rounded-lg shadow-lg'>
        <div className='flex flex-col items-center justify-center w-full gap-2'>
          <img src={busdIcon} className='w-24 h-24 mb-2' alt='BUSD Icon' />
            <p className='mb-2 text-4xl text-symbol-primary'>
              {balance ? formatUnits(balance, currentToken.decimals) : '0'}{' '}
              <span className='text-lg'>{currentToken.symbol}</span>
            </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex flex-col w-full gap-2'
        >
          <div className='flex flex-col gap-2'>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className='p-2 text-black bg-white border rounded'
            >
              {Object.keys(TOKENS).map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
            <input
              type='text'
              placeholder='Recipient Address'
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className='p-2 border rounded'
              required
            />
            <input
              type='string'
              placeholder='Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='p-2 border rounded'
              required
              step='any'
            />
          </div>
          <button
            onClick={() => {
              try {
                writeContractAsync({
                  abi: erc20Abi,
                  address: currentToken.address,
                  functionName: 'transfer',
                  args: [recipientAddress, parseUnits(amount.toString(), 18)],
                });
              } catch (error) {
                console.log('error', error);
              }
            }}
            className='w-full py-2 text-white transition-all duration-300 ease-in-out transform rounded-lg bg-gradient-primary hover:bg-gradient-primary-hover hover:shadow-lg disabled:bg-gray-400 disabled:hover:scale-100 disabled:hover:shadow-none'
          >
            {isPending || isConfirming ? 'Confirming...' : 'Send Tokens'}
          </button>
        </form>
      </div>

      {hash && <div className='mt-2'>Transaction Hash: {hash}</div>}
      {isConfirming && <div className='mt-2'>Waiting for confirmation...</div>}
      {isConfirmed && <div className='mt-2'>Transaction confirmed.</div>}
    </div>
  );
}
