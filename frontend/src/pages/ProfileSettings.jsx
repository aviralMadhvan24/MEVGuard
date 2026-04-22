import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import PageContainer from "../components/PageContainer";

export default function ProfileSettings() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) setWallet(storedWallet);
  }, []);

  const shortWallet = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "Not connected";

  const copyWallet = () => {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet);
    alert("Wallet address copied");
  };

  return (
    <AppLayout headerProps={{ title: "Sentinel AI" }}>
      <PageContainer>
        <h1 className="text-3xl font-bold text-white mb-8">
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-dark/80 backdrop-blur-md border border-[#283639] rounded-xl p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />

              {/* Avatar */}
              <div className="relative mb-6">
                <div className="size-32 rounded-full bg-gradient-to-br from-[#1a2325] to-[#0d1213] border-2 border-primary/50 flex items-center justify-center shadow-neon">
                  <span className="material-symbols-outlined text-6xl text-gray-600">
                    person
                  </span>
                </div>
              </div>

              {/* Wallet */}
              <div
                onClick={copyWallet}
                title={wallet || ""}
                className="flex items-center gap-2 bg-[#111718] px-4 py-2 rounded-lg border border-[#283639] mb-4 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <span className="font-mono text-gray-300 text-sm">
                  {shortWallet}
                </span>
                <span className="material-symbols-outlined text-gray-500 text-sm">
                  content_copy
                </span>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-8">
                Primary Role: Protocol Admin
              </span>

              {/* Linked Protocols */}
              <div className="w-full text-left">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#283639] pb-2">
                  Linked Protocols
                </h3>
                <div className="space-y-3">
                  <LinkedProtocol name="Uniswap V3" role="Pool Admin" />
                  <LinkedProtocol name="Aave V3" role="Governance" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-6">
            <Section
              title="Notification Preferences"
              icon="notifications_active"
              description="Manage alerts for protocol security events."
            >
              <ToggleRow
                title="Email Alerts"
                description="Receive daily summaries and critical warnings."
                id="email-toggle"
              />
              <ToggleRow
                title="Telegram Bot"
                description="Instant messages for real-time monitoring."
                id="tg-toggle"
                defaultChecked
              />
              <ToggleRow
                title="High-Risk Tx Alerts"
                description="Push notifications for Risk Score > 80."
                id="risk-toggle"
                defaultChecked
              />
            </Section>

            <Section
              title="Security Keys"
              icon="vpn_key"
              description="Manage hardware wallets and 2FA methods."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <SecurityKey
                  name="Ledger Nano X"
                  status="Last used: 2h ago"
                />
                <SecurityKey
                  name="Google Authenticator"
                  status="2FA Enabled"
                />
              </div>
            </Section>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}

/* ---------- Helper Components ---------- */

const LinkedProtocol = ({ name, role }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-[#111718] border border-[#283639]">
    <div>
      <div className="text-white text-sm font-bold">{name}</div>
      <div className="text-gray-500 text-xs">{role}</div>
    </div>
    <span className="material-symbols-outlined text-accent-green text-sm">
      check_circle
    </span>
  </div>
);

const Section = ({ title, icon, description, children }) => (
  <div className="bg-surface-dark/80 border border-[#283639] rounded-xl">
    <div className="p-6 border-b border-[#283639] flex items-center gap-3">
      <div className="p-2 rounded bg-primary/10 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

const ToggleRow = ({ title, description, id, defaultChecked = false }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-white font-medium">{title}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
    <input
      type="checkbox"
      id={id}
      defaultChecked={defaultChecked}
      className="h-5 w-5 accent-primary cursor-pointer"
    />
  </div>
);

const SecurityKey = ({ name, status }) => (
  <div className="bg-[#111718] border border-[#283639] rounded-lg p-4 flex justify-between">
    <div>
      <p className="text-white font-bold text-sm">{name}</p>
      <p className="text-gray-500 text-xs">{status}</p>
    </div>
    <span className="bg-accent-green/10 text-accent-green text-xs px-2 py-1 rounded font-bold">
      Active
    </span>
  </div>
);
