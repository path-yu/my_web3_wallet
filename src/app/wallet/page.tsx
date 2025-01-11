"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, Check } from "lucide-react";
import { AddWalletModal } from "../components/AddWalletModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWalletStore, Wallet } from "../store/useWalletStore";
import { useCopyToClipboard } from "usehooks-ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WalletManagement() {
  const { wallets, addWallet, removeWallet } = useWalletStore();
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [_, copy] = useCopyToClipboard();

  useEffect(() => {
    if (wallets.length > 0 && !selectedWallet) {
      setSelectedWallet(wallets[0].id);
    }
  }, [wallets, selectedWallet]);

  const handleAddWallet = (newWallet: Wallet) => {
    addWallet(newWallet);
  };

  const handleRemoveWallet = (id: string) => {
    removeWallet(id);
    if (selectedWallet === id) {
      setSelectedWallet(wallets[0]?.id || "");
    }
  };

  const getNetworkLabel = (networkValue: string) => {
    const network = networks.find((net) => net.value === networkValue);
    return network ? network.label : networkValue;
  };

  const handleCopyAddress = (address: string) => {
    copy(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wallet Management</h1>
        <AddWalletModal onAddWallet={handleAddWallet} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <Card
            key={wallet.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedWallet === wallet.id ? "ring-2 ring-primary" : ""
            )}
            onClick={() => setSelectedWallet(wallet.id)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="truncate">{wallet.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWallet(wallet.id);
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2">{getNetworkLabel(wallet.network)}</Badge>
              <div className="flex items-center justify-between mb-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm">
                        <strong>Address:</strong>{" "}
                        {truncateAddress(wallet.address)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{wallet.address}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyAddress(wallet.address);
                  }}
                >
                  {copiedAddress === wallet.address ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm mb-1">
                <strong>Balance:</strong> {wallet.balance}
              </p>
              {wallet.notes && (
                <p className="text-sm mb-2">
                  <strong>Notes:</strong> {wallet.notes}
                </p>
              )}
              {selectedWallet === wallet.id && (
                <Badge variant="secondary" className="mt-2">
                  Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const networks = [
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "bsc", label: "Binance Smart Chain (BNB)" },
  { value: "solana", label: "Solana (SOL)" },
  { value: "ton", label: "TON" },
  { value: "aptos", label: "Aptos (APT)" },
];
