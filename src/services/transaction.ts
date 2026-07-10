import {
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
  BASE_FEE,
  Transaction,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function buildPaymentTransaction(
  sourceAddress: string,
  destinationAddress: string,
  amount: string
)
{
  const account = await server.loadAccount(sourceAddress);

  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
  
    .addOperation(
      Operation.payment({
        destination: destinationAddress,
        asset: Asset.native(),
        amount,
      })
    )
    
    .setTimeout(300)
    .build();
    console.log("Transaction XDR:", transaction.toXDR());


  return transaction;
}
export async function signPaymentTransaction(
  transaction: Transaction,
  sourceAddress: string
) {
  const result = await signTransaction(transaction.toXDR(), {
    networkPassphrase: Networks.TESTNET,
    address: sourceAddress,
  });

  console.log("Sign Result:", result);

  if (result.error) {
    throw new Error(JSON.stringify(result.error));
  }

  return result.signedTxXdr;
}
export async function submitSignedTransaction(signedTxXdr: string) {
  const signedTransaction = TransactionBuilder.fromXDR(
    signedTxXdr,
    Networks.TESTNET
  ) as Transaction;

  try {
    return await server.submitTransaction(signedTransaction);
  } catch (err: any) {
    console.log("========== HORIZON ERROR ==========");
    console.log(JSON.stringify(err.response?.data, null, 2));
    console.log("==================================");

    throw err;
  }
}
