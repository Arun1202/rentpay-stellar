import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-8 py-5">

      <h1 className="text-2xl font-bold">
        RentPay
      </h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

    </nav>
  );
}