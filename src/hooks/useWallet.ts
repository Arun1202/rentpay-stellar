import { useState } from "react";
import { connectWallet } from "../services/wallet";
import { getBalance } from "../services/stellar";

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

 return {
  address,
  balance,
  connect,
};

}