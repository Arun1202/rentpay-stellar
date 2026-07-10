import { useState } from "react";
import TransactionCard from "./TransactionCard";
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
  
  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-8 w-full max-w-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Send XLM
      </h2>

      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="w-full p-3 rounded mb-4"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded mb-4"
      />
<button
  onClick={async () => {
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

console.log(result);

setHash(result.hash);
    } catch (err: any) {
  console.error(err);

  if (err.message) {
    console.log("Message:", err.message);
  }
}
  }}
  className="bg-green-600 px-6 py-3 rounded text-white w-full"
>
  Send XLM
</button>
 <TransactionCard hash={hash} />
    </div>
  );
}