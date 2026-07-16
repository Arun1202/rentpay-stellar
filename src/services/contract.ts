import {
  Address,
  BASE_FEE,
  Contract,
  Networks,
  nativeToScVal,
  rpc,
  Transaction,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

import { signTransaction } from "@stellar/freighter-api";

export const RENTPAY_CONTRACT_ID =
  "CA3HCSGNICCFKZOV24AZS2IWSRO2OW2XGJ6TDUQITQKMKPP2H6GKVIXA";

export const SOROBAN_RPC_URL =
  "https://soroban-testnet.stellar.org";

export const NETWORK_PASSPHRASE =
  Networks.TESTNET;

const rpcServer = new rpc.Server(SOROBAN_RPC_URL);

export async function createPaymentRecord(
  sender: string,
  receiver: string,
  amount: string
) {
  // 1. Load sender account from Stellar RPC
  const account = await rpcServer.getAccount(sender);

  // 2. Connect to deployed RentPay contract
  const contract = new Contract(RENTPAY_CONTRACT_ID);

  // Temporary unique payment ID
  const paymentId = BigInt(Date.now());

  // 3. Build create_payment contract call
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      contract.call(
        "create_payment",
        nativeToScVal(paymentId, { type: "u64" }),
        new Address(sender).toScVal(),
        new Address(receiver).toScVal(),
        nativeToScVal(amount, { type: "i128" })
      )
    )
    .setTimeout(300)
    .build();

  // 4. Simulate and prepare Soroban transaction
  const preparedTransaction =
    await rpcServer.prepareTransaction(transaction);

  // 5. Ask Freighter to sign
  const signResult = await signTransaction(
    preparedTransaction.toXDR(),
    {
      networkPassphrase: NETWORK_PASSPHRASE,
      address: sender,
    }
  );

  if (signResult.error) {
    throw new Error(JSON.stringify(signResult.error));
  }

  // 6. Convert signed XDR back to transaction
  const signedTransaction = TransactionBuilder.fromXDR(
    signResult.signedTxXdr,
    NETWORK_PASSPHRASE
  ) as Transaction;

  // 7. Submit contract transaction
  const response =
    await rpcServer.sendTransaction(signedTransaction);

  if (response.status === "ERROR") {
    throw new Error("Contract transaction submission failed.");
  }

  return {
    hash: response.hash,
    paymentId: paymentId.toString(),
  };
}