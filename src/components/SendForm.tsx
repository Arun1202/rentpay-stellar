import { useState } from "react";
import TransactionCard from "./TransactionCard";
import { createPaymentRecord } from "../services/contract";
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
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-full shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Send XLM
      </h2>

      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
      />

      <button
        disabled={loading}
        onClick={async () => {
          // Wallet connected?
if (!address) {
  toast.error("Please connect your wallet first.");
  return;
}

// Receiver empty?
if (!receiver.trim()) {
  toast.error("Receiver address is required.");
  return;
}

// Amount empty?
if (!amount.trim()) {
  toast.error("Amount is required.");
  return;
}

// Invalid amount?
if (Number(amount) <= 0) {
  toast.error("Enter a valid amount.");
  return;
}

// Sender & receiver same?
if (receiver === address) {
  toast.error("You can't send XLM to your own wallet.");
  return;
}
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
            toast.success("XLM Payment Successful!");

setMessage("⏳ Recording payment on smart contract...");

try {
  const contractResult = await createPaymentRecord(
    address,
    receiver,
    amount
  );

  console.log(
    "Contract Transaction Hash:",
    contractResult.hash
  );

  console.log(
    "Payment ID:",
    contractResult.paymentId
  );

  toast.success("Payment recorded on smart contract!");

  setMessage(
    "✅ Payment Successful & Recorded on Blockchain"
  );
} catch (contractError) {
  console.error(
    "Contract recording failed:",
    contractError
  );

  toast.error(
    "XLM sent, but smart contract recording failed."
  );

  setMessage(
    "⚠️ XLM Payment Successful, Contract Record Failed"
  );
}

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
  console.error(err);

  const errorMessage =
    err?.message ||
    err?.response?.data?.detail ||
    "";

  if (errorMessage.includes("rejected")) {
    toast.error("Transaction cancelled by user.");
  } else if (errorMessage.includes("insufficient")) {
    toast.error("Insufficient XLM balance.");
  } else if (
    errorMessage.includes("destination") ||
    errorMessage.includes("not found")
  ) {
    toast.error("Receiver account not found.");
  } else if (errorMessage.includes("network")) {
    toast.error("Network error. Please try again.");
  } else {
    toast.error("Transaction failed.");
  }

  setMessage("❌ Transaction Failed");
}
finally {
  setLoading(false);
} 
        }}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
  loading
    ? "bg-gray-600 cursor-not-allowed"
    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] hover:shadow-xl"
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