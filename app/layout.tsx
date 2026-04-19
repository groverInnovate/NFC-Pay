import type { Metadata } from 'next'
import './globals.css'
import './theme.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'NFC Payment Mini App',
  description: 'Farcaster Mini App for NFC Payments on Base',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'NFC Payment Mini App',
    description: 'Pay with NFC using Base blockchain',
    images: ['/og-image.png'], // Add your OG image
  },
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://nfcpay-amber.vercel.app/og-image.png",
      button: {
        title: "Initiate Payment",
        action: {
          type: "launch_frame",
          name: "NFC Pay",
          url: "https://nfcpay-amber.vercel.app/",
          splashImageUrl: "https://nfcpay-amber.vercel.app/og-image.png",
          splashBackgroundColor: "#000000"
        }
      }
    })
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
