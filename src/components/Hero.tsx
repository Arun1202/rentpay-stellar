import useWallet from "../hooks/useWallet";
import SendForm from "./SendForm";
import TransactionHistory from "./TransactionHistory";
import toast from "react-hot-toast";
import AccountDetails from "./AccountDetails";

import {
  Wallet,
  Coins,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";


export default function Hero() {
  const [showHistory, setShowHistory] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
const {
  address,
  balance,
  connect,
  refreshBalance,
} = useWallet();  

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center py-12">

     <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
  🏠 RentPay
</h1>

<p className="text-lg text-gray-400 mt-3 text-center max-w-2xl">
  Fast, Secure and Low-Cost Rent Payments powered by the Stellar Blockchain.
</p>

    <button
  onClick={() => {
    alert("Button Clicked");
    console.log("Hero Button Clicked");
    connect();
  }}
  className="
mt-8
px-8
py-4
rounded-xl
font-semibold
text-white
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
transition-all
duration-300
shadow-xl"
>
  Connect Wallet
</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-5xl">

  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
    <Coins className="text-cyan-400 mb-3" size={30} />
    <p className="text-gray-400">Balance</p>
    <h2 className="text-2xl font-bold text-white">
      {balance || "0"} XLM
    </h2>
    <p className="text-gray-500 text-sm mb-3">
      Available Balance
    </p>

    <button
      onClick={refreshBalance}
      className="mt-4 text-sm bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg"
    >
      🔄 Refresh
    </button>
  </div>

  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
    <Wallet className="text-green-400 mb-3" size={30} />
    <p className="text-gray-400">Wallet</p>

    <h2 className="text-white">
      {address
        ? `${address.slice(0, 6)}...${address.slice(-6)}`
        : "---"}
    </h2>
    <p className="text-gray-500 text-sm mt-2">
  Freighter Wallet
</p>

    {address && (
      <button
        onClick={() => {
          navigator.clipboard.writeText(address);
          toast.success("Wallet copied!");
        }}
        className="mt-4 text-sm bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
      >
        Copy Address
      </button>
    )}
  </div>

  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
    <Activity className="text-yellow-400 mb-3" size={30} />
    <p className="text-gray-400">Status</p>

    <h2 className="text-green-400 font-bold">
      {address ? "🟢 Connected" : "🔴 Disconnected"}
    </h2>
    <p className="text-gray-500 text-sm mt-2">
  Stellar Testnet
</p>
  </div>

</div>
    <div className="w-full max-w-7xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 items-start">

  <div className="h-full">
    <SendForm address={address} />
  </div>

  <div className="h-full">
    <AccountDetails address={address} />
  </div>

</div>
<div className="mt-8 flex justify-center">
  <button
    onClick={() => setShowHistory(!showHistory)}
    className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
  >
    {showHistory ? (
      <>
        <ChevronUp size={20} />
        Hide Recent Transactions
      </>
    ) : (
      <>
        <ChevronDown size={20} />
        Recent Transactions
      </>
    )}
   </button>
   </div>

      <div
       className={`overflow-hidden transition-all duration-500 ${
       showHistory
        ? "max-h-[2500px] opacity-100 mt-6"
        : "max-h-0 opacity-0"
      }`}
      >
     <div className="w-full max-w-7xl mx-auto px-4">
      <TransactionHistory address={address} />
     </div>
     </div>
     <footer className="mt-16 w-full border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
      <p>Built with ❤️ using Stellar Testnet</p>

      <p className="mt-2 text-gray-500">
        © 2026 RentPay • Powered by React, TypeScript & Stellar SDK
      </p>
    </footer>
    </section>
  );
}