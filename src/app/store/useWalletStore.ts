import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: string;
  network: string;
  notes?: string;
}

interface WalletStore {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  removeWallet: (id: string) => void;
  updateWalletBalance: (id: string, newBalance: string) => void;
}

const defaultWallets: Wallet[] = [
  {
    id: "1",
    name: "Main ETH Wallet",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    balance: "1.5",
    network: "ethereum",
    notes: "Primary trading wallet",
  },
  {
    id: "2",
    name: "BNB Savings",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44f",
    balance: "10",
    network: "bsc",
    notes: "Long-term holdings",
  },
  {
    id: "3",
    name: "SOL Wallet",
    address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
    balance: "20",
    network: "solana",
  },
  {
    id: "4",
    name: "TON Wallet",
    address: "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV",
    balance: "100",
    network: "ton",
  },
  {
    id: "5",
    name: "APT Investment",
    address:
      "0x1234567890123456789012345678901234567890123456789012345678901234",
    balance: "50",
    network: "aptos",
    notes: "Aptos ecosystem investment",
  },
];

export const useWalletStore = create(
  persist<WalletStore>(
    (set) => ({
      wallets: defaultWallets,
      addWallet: (wallet) =>
        set((state) => ({ wallets: [...state.wallets, wallet] })),
      removeWallet: (id) =>
        set((state) => ({ wallets: state.wallets.filter((w) => w.id !== id) })),
      updateWalletBalance: (id, newBalance) =>
        set((state) => ({
          wallets: state.wallets.map((w) =>
            w.id === id ? { ...w, balance: newBalance } : w
          ),
        })),
    }),
    {
      name: "wallet-storage",
    }
  )
);
