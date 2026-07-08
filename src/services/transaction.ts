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
    
    .setTimeout(30)
    .build();


  return transaction;
}
export async function signPaymentTransaction(transaction: any) {
  const xdr = transaction.toXDR();

  const signed = await signTransaction(xdr, {
    networkPassphrase: Networks.TESTNET,
  });

  return signed;
}
export async function submitSignedTransaction(signedXdr: string) {
  const transaction = TransactionBuilder.fromXDR(
    signedXdr,
    Networks.TESTNET
  ) as Transaction;

  const response = await server.submitTransaction(transaction);

  return response;
}