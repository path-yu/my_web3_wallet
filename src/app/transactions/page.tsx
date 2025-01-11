import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  { id: 1, type: 'Send', amount: '0.1 ETH', to: '0xabcd...efgh', from: '0x1234...5678', status: 'Completed', date: '2023-05-01' },
  { id: 2, type: 'Receive', amount: '0.5 ETH', to: '0x1234...5678', from: '0x9876...5432', status: 'Completed', date: '2023-04-28' },
  { id: 3, type: 'Send', amount: '0.05 ETH', to: '0xijkl...mnop', from: '0x1234...5678', status: 'Pending', date: '2023-04-25' },
]

export default function Transactions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>To</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.to}</TableCell>
                  <TableCell>{tx.from}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

