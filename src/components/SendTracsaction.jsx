import * as React from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';
import cryptoIcon from '@images/crypto-logo.svg';
import ReadContract from './ReadContract';

export function SendTransaction() {
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
  } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        toast.info('Transaction is being processed...');
      },
      onError: () => {
        toast.error('Failed to send transaction');
      },
    },
  });

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get('address');
    const value = formData.get('value');
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed successfully!');
    }
  }, [isConfirmed]);

  React.useEffect(() => {
    if (error) {
      toast.error(error.shortMessage || error.message);
    }
  }, [error]);

  return (
    <div className='flex flex-col gap-2 bg-gray-800 p-6 rounded-lg shadow-lg w-full mt-4 justify-center items-center'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <img src={cryptoIcon} className='w-24 h-24 mb-2' alt='Crypto Icon' />
        <ReadContract />
      </div>
      <form onSubmit={submit} className='flex flex-col gap-2 w-full'>
        <div className='flex flex-row gap-2'>
          <input
            name='address'
            placeholder='0xA0Cf…251e'
            required
            className='p-2 rounded-lg'
          />
          <input
            name='value'
            type='text'
            placeholder='0.05'
            required
            className='p-2 rounded-lg'
          />
        </div>
        <button
          className='w-full bg-gradient-primary hover:bg-gradient-primary-hover rounded-lg text-white py-2 transition-all duration-300 ease-in-out transform hover:shadow-lg disabled:bg-gray-400 disabled:hover:scale-100 disabled:hover:shadow-none'
          disabled={isPending}
          type='submit'
        >
          {isPending ? 'Confirming...' : 'Send'}
        </button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && <div>Error: {error.shortMessage || error.message}</div>}
      </form>
    </div>
  );
}
