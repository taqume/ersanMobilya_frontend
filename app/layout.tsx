import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import { getContactInfo } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ersan Mobilya | Yemek Odası Mobilyaları',
  description:
    'Kaliteli ve estetik yemek odası mobilyaları - Özel tasarım masa, sandalye ve konsol üretimi. Ersan Mobilya, yemek odası mobilyaları konusunda uzmanlaşmış bir üretim atölyesidir.',
  keywords: ['yemek odası', 'masa', 'sandalye', 'konsol', 'mobilya', 'ersan mobilya', 'özel tasarım'],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.ersanmobilya.com',
    siteName: 'Ersan Mobilya',
    title: 'Ersan Mobilya | Yemek Odası Mobilyaları',
    description: 'Kaliteli ve estetik yemek odası mobilyaları - Özel tasarım masa, sandalye ve konsol üretimi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ersan Mobilya | Yemek Odası Mobilyaları',
    description: 'Kaliteli ve estetik yemek odası mobilyaları',
  },
  metadataBase: new URL('https://www.ersanmobilya.com'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactInfo = await getContactInfo();

  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer contactInfo={contactInfo} />
          <Toaster position="top-center" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
