import { isConnected, requestAccess } from "@stellar/freighter-api";

export async function connectWallet() {
  const connection = await isConnected();

  if (!connection.isConnected) {
    throw new Error("Freighter extension is not installed.");
  }

  const result = await requestAccess();

  if ("error" in result && result.error) {
    throw new Error(result.error);
  }

  return result.address;
}