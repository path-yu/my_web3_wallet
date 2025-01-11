"use client";

import { useState } from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../hooks/useAuth";

const notifications = [
  {
    id: 1,
    title: "Transaction Completed",
    message: "Your transaction of 0.1 ETH has been confirmed.",
    date: "2023-05-10",
    read: false,
  },
  {
    id: 2,
    title: "New Feature Available",
    message: "We've added a new feature to track your portfolio performance.",
    date: "2023-05-09",
    read: true,
  },
  {
    id: 3,
    title: "Security Alert",
    message:
      "A new device has accessed your account. Please verify if this was you.",
    date: "2023-05-08",
    read: false,
  },
];

export default function Header() {
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );
  const { logout } = useAuth();

  const markAsRead = (id: number) => {
    setUnreadCount((prev) => Math.max(0, prev - 1));
    // In a real app, you would update the notification status in your backend here
  };

  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MobileNav />
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 pl-2">
                Web3 Wallet
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <Link
                    href="/notifications"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="mb-4 p-2 hover:bg-gray-100 rounded"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-semibold">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <Badge
                            variant="destructive"
                            className="text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.date}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </PopoverContent>
            </Popover>
            <Link
              href="/settings"
              className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Settings</span>
              <Settings className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="ml-2"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
