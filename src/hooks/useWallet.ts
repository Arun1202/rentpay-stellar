import { useState } from "react";
import { connectWallet } from "../services/wallet";
import { getBalance } from "../services/stellar";
import toast from "react-hot-toast";

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

async function connect() {
  try {
    const walletAddress = await connectWallet();

    setAddress(walletAddress);

    const xlmBalance = await getBalance(walletAddress);

    setBalance(xlmBalance);

  } catch (error) {
    console.error(error);
    alert(String(error));
  }
}
async function refreshBalance() {
  const xlmBalance = await getBalance(address);
setBalance(xlmBalance);

toast.success("Balance Updated");
  if (!address) return;

  try {
    const xlmBalance = await getBalance(address);
    setBalance(xlmBalance);
  } catch (error) {
    toast.error("Failed to refresh balance");
    console.error(error);
  }
}

return {
  address,
  balance,
  connect,
  refreshBalance,
};

}