"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Wallet,
  Send,
  ReceiptIcon,
  List,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Send", href: "/send", icon: Send },
  { name: "Receive", href: "/receive", icon: ReceiptIcon },
  { name: "Transactions", href: "/transactions", icon: List },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-lg font-semibold",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  )}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <item.icon
                    className={cn(
                      "h-6 w-6",
                      isActive ? "text-blue-600" : "text-gray-400"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
