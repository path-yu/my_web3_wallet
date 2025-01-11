import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Address:</strong> 0x1234...5678</p>
            <p><strong>Balance:</strong> 1.5 ETH</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Sent 0.1 ETH to 0xabcd...efgh</li>
              <li>Received 0.5 ETH from 0x9876...5432</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex space-x-4">
        <Button>Send</Button>
        <Button variant="outline">Receive</Button>
      </div>
    </div>
  )
}

