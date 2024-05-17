import type { Metadata } from 'next';
import './globals.css';
import { quicksand } from './fonts'

export const metadata: Metadata = {
  title: 'Go Dist UI',
  description: 'UI for go microservices',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={quicksand.className}>
      <body>{children}</body>
    </html>
  );
}
