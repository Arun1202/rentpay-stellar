import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export async function getBalance(address: string) {
  const account = await server.loadAccount(address);

  const xlm = account.balances.find(
    (balance) => balance.asset_type === "native"
  );

  return xlm ? xlm.balance : "0";
}