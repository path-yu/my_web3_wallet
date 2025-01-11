"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: string;
  network: string;
  notes?: string;
}

interface AddWalletModalProps {
  onAddWallet: (wallet: Wallet) => void;
}

const networks = [
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "bsc", label: "Binance Smart Chain (BNB)" },
  { value: "solana", label: "Solana (SOL)" },
  { value: "ton", label: "TON" },
  { value: "aptos", label: "Aptos (APT)" },
];

export function AddWalletModal({ onAddWallet }: AddWalletModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [network, setNetwork] = useState("");
  const [notes, setNotes] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const handleAddWallet = (type: "mnemonic" | "privateKey") => {
    setError("");
    if (!name || !network) {
      setError("Please fill in all required fields");
      return;
    }

    if (
      type === "mnemonic" &&
      (!mnemonic || mnemonic.trim().split(" ").length !== 12)
    ) {
      setError("Please enter a valid 12-word mnemonic phrase");
      return;
    }

    if (type === "privateKey" && (!privateKey || privateKey.length !== 64)) {
      setError("Please enter a valid 64-character private key");
      return;
    }

    // In a real application, you would use a library like ethers.js or web3.js
    // to derive the wallet address from the mnemonic or private key
    const mockAddress =
      type === "mnemonic"
        ? `0x${Array(40)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")}`
        : `0x${privateKey.slice(0, 40)}`;

    const newWallet: Wallet = {
      id: Date.now().toString(),
      name,
      address: mockAddress,
      balance: "0", // You would fetch the actual balance here in a real application
      network,
      notes,
    };

    onAddWallet(newWallet);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNetwork("");
    setNotes("");
    setMnemonic("");
    setPrivateKey("");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Import Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
          <DialogDescription>
            Import your wallet using mnemonic phrase or private key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="network" className="text-right">
              Network
            </Label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {networks.map((net) => (
                  <SelectItem key={net.value} value={net.value}>
                    {net.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Tabs defaultValue="mnemonic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mnemonic">Mnemonic</TabsTrigger>
            <TabsTrigger value="privateKey">Private Key</TabsTrigger>
          </TabsList>
          <TabsContent value="mnemonic">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="mnemonic">Mnemonic Phrase</Label>
                <Textarea
                  id="mnemonic"
                  placeholder="Enter your 12-word mnemonic phrase"
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                  rows={3}
                />
              </div>
              <Button
                onClick={() => handleAddWallet("mnemonic")}
                className="w-full"
              >
                Import Wallet
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="privateKey">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="privateKey">Private Key</Label>
                <Input
                  id="privateKey"
                  placeholder="Enter your private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                />
              </div>
              <Button
                onClick={() => handleAddWallet("privateKey")}
                className="w-full"
              >
                Import Wallet
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
