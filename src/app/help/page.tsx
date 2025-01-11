import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  { 
    question: "How do I connect my wallet?", 
    answer: "To connect your wallet, click on the 'Connect Wallet' button on the login page and follow the prompts from your Web3 wallet provider (e.g., MetaMask)." 
  },
  { 
    question: "How do I send cryptocurrency?", 
    answer: "To send cryptocurrency, go to the 'Send' page, enter the recipient's address, the amount you want to send, and any optional note. Then click 'Send Transaction' and confirm the transaction in your wallet." 
  },
  { 
    question: "How do I receive cryptocurrency?", 
    answer: "To receive cryptocurrency, go to the 'Receive' page. You'll see your wallet address and a QR code. Share this address with the sender, or let them scan the QR code." 
  },
  { 
    question: "What should I do if a transaction is pending for a long time?", 
    answer: "If a transaction is pending for an unusually long time, it may be due to network congestion or low gas fees. You can try to speed up the transaction by increasing the gas fee in your wallet, or wait for the network to process it." 
  },
]

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">If you need further assistance, please don't hesitate to contact our support team:</p>
          <ul className="list-disc list-inside">
            <li>Email: support@web3wallet.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Live Chat: Available 24/7 on our website</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

