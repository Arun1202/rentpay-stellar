import toast from "react-hot-toast";

type Props = {
  hash: string;
};

export default function TransactionCard({ hash }: Props) {
  if (!hash) return null;

  return (
    <div className="bg-green-900 p-6 rounded-xl mt-6 border border-green-500">
      <h2 className="text-2xl font-bold text-white mb-4">
        ✅ Transaction Successful
      </h2>

      <p className="text-green-300 break-all mb-4">
        {hash}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(hash);
            toast.success("Transaction Hash Copied!");
          }}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Copy Hash
        </button>

        <a
          href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          View Explorer
        </a>
      </div>
    </div>
  );
}