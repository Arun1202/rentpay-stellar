export default function Hero() {
  return (
    <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold text-white">
        RentPay
      </h1>

      <p className="text-gray-400 mt-4 text-xl">
        Secure PG Payments using Stellar Blockchain
      </p>

      <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white text-lg">
        Connect Wallet
      </button>

    </section>
  );
}