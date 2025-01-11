'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode } from 'lucide-react'

export default function Receive() {
  const [address] = useState('0x1234...5678') // In a real app, this would be fetched from the user's wallet

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
      .then(() => {
        alert('Address copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Receive</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Receiving Address</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <QrCode size={200} />
          </div>
          <p className="text-lg font-mono mb-4">{address}</p>
          <Button onClick={copyToClipboard}>Copy Address</Button>
        </CardContent>
      </Card>
    </div>
  )
}

