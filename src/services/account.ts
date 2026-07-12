import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function getAccountDetails(address: string) {
  return await server.loadAccount(address);
}