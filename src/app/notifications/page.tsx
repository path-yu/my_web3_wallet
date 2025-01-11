import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  { id: 1, title: "Transaction Completed", message: "Your transaction of 0.1 ETH to 0xabcd...efgh has been confirmed.", date: "2023-05-10", read: false },
  { id: 2, title: "New Feature Available", message: "We've added a new feature to track your portfolio performance.", date: "2023-05-09", read: true },
  { id: 3, title: "Security Alert", message: "A new device has accessed your account. Please verify if this was you.", date: "2023-05-08", read: false },
  { id: 4, title: "Price Alert", message: "ETH has increased by 5% in the last 24 hours.", date: "2023-05-07", read: true },
  { id: 5, title: "Wallet Backup Reminder", message: "It's been a while since you last backed up your wallet. Consider doing it soon.", date: "2023-05-06", read: true },
]

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 p-4 border-b last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  {!notification.read && (
                    <Badge variant="destructive">New</Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{notification.message}</p>
                <p className="text-sm text-gray-400">{notification.date}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

