import { useState } from "react";
import TransactionCard from "./TransactionCard";
import toast from "react-hot-toast";
import {
  buildPaymentTransaction,
  signPaymentTransaction,
  submitSignedTransaction,
} from "../services/transaction";

export default function SendForm({
  address,
}: {
  address: string;
}) {
  const [receiver, setReceiver] = useState("");
  const [hash, setHash] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<{
  amount: string;
  receiver: string;
  hash: string;
  date: string;
} | null>(null);

  return (
    <div className="bg-slate-800 p-6 rounded-xl h-full">
      <h2 className="text-2xl font-bold text-white mb-6">
        Send XLM
      </h2>

      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded mb-4"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded mb-4"
      />

      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setMessage("");
          if (!receiver.trim()) {
  toast.error("Receiver address is required");
  return;
}

if (!receiver.startsWith("G") || receiver.length !== 56) {
  toast.error("Invalid Stellar address");
  return;
}

if (!amount || Number(amount) <= 0) {
  toast.error("Enter a valid amount");
  return;
}

          try {
            console.log("Sender:", address);
            console.log("Receiver:", receiver);
            console.log("Amount:", amount);

            const tx = await buildPaymentTransaction(
              address,
              receiver,
              amount
            );

            const signedXdr = await signPaymentTransaction(
              tx,
              address
            );

            const result = await submitSignedTransaction(
              signedXdr
            );

            setHash(result.hash);

            toast.success("Payment Successful!");
            setMessage("✅ Payment Successful");
            setReceipt({
  amount,
  receiver,
  hash: result.hash,
  date: new Date().toLocaleString(),
});



setReceiver("");
setAmount("");

            console.log(result);
          } catch (err: any) {
            toast.error("Transaction Failed!");
            setMessage("❌ Transaction Failed");

            console.error(err);

            if (err.message) {
              console.log("Message:", err.message);
            }
          } finally {
            setLoading(false);
          }
        }}
        className={`px-6 py-3 rounded text-white w-full ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </div>
        ) : (
          "Send XLM"
        )}
      </button>

      {message && (
        <p className="text-center mt-4 text-white">
          {message}
        </p>
      )}

      <TransactionCard hash={hash} />
      {receipt && (
  <div className="bg-slate-800 p-6 rounded-xl mt-6 border border-green-500">
    <h2 className="text-2xl font-bold text-green-400 mb-4">
      Payment Receipt
    </h2>

    <p className="text-white">
      <strong>Amount:</strong> {receipt.amount} XLM
    </p>

    <p className="text-white break-all mt-2">
      <strong>Receiver:</strong> {receipt.receiver}
    </p>

    <p className="text-white break-all mt-2">
      <strong>Transaction Hash:</strong> {receipt.hash}
    </p>

    <p className="text-white mt-2">
      <strong>Date:</strong> {receipt.date}
    </p>
  </div>
)}
    </div>
  );
}