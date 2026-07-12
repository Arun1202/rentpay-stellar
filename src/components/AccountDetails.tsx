import { useEffect, useState } from "react";
import { getAccountDetails } from "../services/account";

type Props = {
  address: string;
};

export default function AccountDetails({ address }: Props) {
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    if (!address) return;

    async function loadAccount() {
      try {
        const data = await getAccountDetails(address);
        setAccount(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAccount();
  }, [address]);

  if (!address || !account) return null;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl h-full">
      <h2 className="text-2xl font-bold text-white mb-4">
        Account Details
      </h2>

      <div className="space-y-3 text-gray-300">
        <p>
          <span className="font-semibold text-white">Account ID:</span>
        </p>

        <p className="break-all text-green-400">
          {account.accountId()}
        </p>

        <p>
          <span className="font-semibold text-white">Sequence:</span>{" "}
          {account.sequence}
        </p>

        <p>
          <span className="font-semibold text-white">Subentries:</span>{" "}
          {account.subentryCount}
        </p>
      </div>
    </div>
  );
}