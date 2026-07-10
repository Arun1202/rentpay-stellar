type Props = {
  hash: string;
};

export default function TransactionCard({ hash }: Props) {
  if (!hash) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-8 w-full max-w-lg">
      <h2 className="text-white text-xl font-bold">
        Transaction Success
      </h2>

      <p className="text-green-400 break-all mt-3">
        {hash}
      </p>

      <a
        href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 underline mt-4 block"
      >
        View Transaction
      </a>
    </div>
  );
}