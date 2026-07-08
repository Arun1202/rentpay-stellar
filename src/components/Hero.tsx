import useWallet from "../hooks/useWallet";
import SendForm from "./SendForm";

export default function Hero() {
const { address, balance, connect } = useWallet();
  

  return (
    <section className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">

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

      {address && (
        <div className="mt-10 text-green-400">
          {address}
        </div>
      )}
      {balance && (
     <div className="mt-6 bg-slate-800 p-4 rounded-lg text-white">
       <h2 className="font-bold">Balance</h2>
       <p>{balance} XLM</p>
      </div>
     )}
     <SendForm />
    </section>
  );
}