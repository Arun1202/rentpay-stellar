import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/history";

type Props = {
  address: string;
};

export default function TransactionHistory({ address }: Props) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (!address) return;

    async function loadTransactions() {
      try {
        const data = await getTransactionHistory(address);
        setTransactions(data);
        let sent = 0;
let received = 0;
let count = 0;

data.forEach((tx: any) => {
  if (tx.type !== "payment") return;

  count++;

  if ("from" in tx && tx.from === address) {
    sent += Number(tx.amount);
  }

  if ("to" in tx && tx.to === address) {
    received += Number(tx.amount);
  }
});

setPaymentCount(count);
setTotalSent(sent);
setTotalReceived(received);
      } catch (err) {
        console.error(err);
      }
    }

    loadTransactions();
  }, [address]);

  if (!address) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Transaction History
      </h2>
      <div className="flex gap-3 mb-6">
  <input
    type="text"
    placeholder="Search Transaction ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 p-2 rounded bg-slate-700 text-white"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="p-2 rounded bg-slate-700 text-white"
  >
    <option value="all">All</option>
    <option value="payment">Payment</option>
    <option value="create_account">Create Account</option>
  </select>
</div>
      <div className="grid grid-cols-3 gap-3 mb-6">
  <div className="bg-slate-700 rounded p-3 text-center">
    <p className="text-gray-400 text-sm">Payments</p>
    <p className="text-white font-bold">{paymentCount}</p>
  </div>

  <div className="bg-slate-700 rounded p-3 text-center">
    <p className="text-gray-400 text-sm">Sent</p>
    <p className="text-red-400 font-bold">
      {totalSent.toFixed(2)} XLM
    </p>
  </div>

  <div className="bg-slate-700 rounded p-3 text-center">
    <p className="text-gray-400 text-sm">Received</p>
    <p className="text-green-400 font-bold">
      {totalReceived.toFixed(2)} XLM
    </p>
  </div>
</div>

      {transactions.length === 0 ? (
        <p className="text-gray-400">
          No transactions found.
        </p>
      ) : (
        <div className="space-y-3">
          {transactions
   .filter((tx: any) => {
  const searchText = search.trim().toLowerCase();

  const matchesSearch =
    String(tx.id).toLowerCase().includes(searchText) ||
    String(tx.type ?? "").toLowerCase().includes(searchText) ||
    String(tx.from ?? "").toLowerCase().includes(searchText) ||
    String(tx.to ?? "").toLowerCase().includes(searchText) ||
    String(tx.amount ?? "").toLowerCase().includes(searchText);

  const matchesFilter =
    filter === "all" || tx.type === filter;

  return matchesSearch && matchesFilter;
})
  .map((tx: any) => (
            <div
              key={tx.id}
              className="bg-slate-700 p-3 rounded"
            >
              <h3 className="text-green-400 font-semibold">
  {tx.type === "payment"
    ? "💸 Payment"
    : "🆕 Account Created"}
</h3>

{"amount" in tx && (
  <p className="text-white">
    Amount: {tx.amount} XLM
  </p>
)}

{"to" in tx && (
  <p className="text-gray-300 break-all">
    To: {tx.to}
  </p>
)}

<p className="text-gray-400 text-sm">
  {new Date(tx.created_at).toLocaleString()}
</p>

<a
  href={`https://stellar.expert/explorer/testnet/op/${tx.id}`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-400 underline"
>
  View on Explorer
</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}