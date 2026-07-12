import useWallet from "../hooks/useWallet";
import SendForm from "./SendForm";
import TransactionHistory from "./TransactionHistory";
import toast from "react-hot-toast";
import AccountDetails from "./AccountDetails";
import { Wallet, Coins, Activity } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [showHistory, setShowHistory] = useState(false);
const {
  address,
  balance,
  connect,
  refreshBalance,
} = useWallet();  

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center py-12">

      <h1 className="text-6xl text-white font-bold">
        RentPay
      </h1>

      <p className="text-gray-400 mt-4">
        Secure PG Payments using Stellar
      </p>

    <button
  onClick={() => {
    alert("Button Clicked");
    console.log("Hero Button Clicked");
    connect();
  }}
  className="bg-blue-600 px-8 py-4 rounded-xl text-white mt-8"
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
      {address ? "Connected" : "Disconnected"}
    </h2>
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
    </section>
  );
}