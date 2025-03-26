import * as React from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { toast } from 'react-toastify';

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending, error } = useSendTransaction();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");
    try {
      sendTransaction({ to, value: parseEther(value) });
      toast.info('Transaction is being processed...');
    } catch {
      toast.error('Failed to send transaction');
    }
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
    <form onSubmit={submit} className="flex flex-col gap-2 my-4">
      <div className="flex flex-row gap-2">
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      </div>
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error).shortMessage || error.message}</div>
      )}
    </form>
  );
}
