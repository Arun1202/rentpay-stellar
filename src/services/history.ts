import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function getTransactionHistory(address: string) {
  const response = await server
  .payments()
  .forAccount(address)
  .limit(10)
  .order("desc")
  .call();

return response.records;
}