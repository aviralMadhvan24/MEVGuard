import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import PageContainer from "../components/PageContainer";
import { getWalletTransactions } from "../lib/api";

export default function WalletActivity() {
  const [wallet, setWallet] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const w = localStorage.getItem("wallet");
    if (!w) return;

    setWallet(w);

    async function load() {
      try {
        const res = await getWalletTransactions(w);
        setTxs(res.transactions);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <AppLayout headerProps={{ title: "Wallet Activity" }}>
      <PageContainer>

        {/* Wallet Summary */}
        <div className="mb-6 bg-surface-dark border border-[#283639] rounded-xl p-6">
          <p className="text-gray-400 text-sm">Connected Wallet</p>
          <p className="text-white font-mono text-lg">
            {wallet?.slice(0, 10)}...{wallet?.slice(-6)}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-surface-dark border border-[#283639] rounded-xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Recent On-Chain Transactions
          </h2>

          {loading && (
            <p className="text-gray-500">Loading transactions...</p>
          )}

          {!loading && txs.length === 0 && (
            <p className="text-gray-500">No transactions found</p>
          )}

          <div className="space-y-3">
            {txs.map(tx => (
              <div
                key={tx.tx_hash}
                className="flex justify-between items-center bg-[#111718] border border-[#283639] rounded-lg p-4"
              >
                <div>
                  <p className="font-mono text-sm text-white">
                    {tx.tx_hash.slice(0, 12)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    {tx.amount_eth} ETH • {tx.gas_gwei} gwei
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    tx.risk_level === "high"
                      ? "bg-red-500/20 text-red-400"
                      : tx.risk_level === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {tx.risk_level.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </PageContainer>
    </AppLayout>
  );
}
