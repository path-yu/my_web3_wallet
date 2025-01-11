'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Send() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to send the transaction
    console.log('Sending transaction:', { recipient, amount, note })
    // Reset form
    setRecipient('')
    setAmount('')
    setNote('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Send</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input 
                  id="recipient" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount (ETH)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.0001"
                  min="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="note">Note (optional)</Label>
                <Input 
                  id="note" 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's this for?"
                />
              </div>
              <Button type="submit" className="w-full">Send Transaction</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

