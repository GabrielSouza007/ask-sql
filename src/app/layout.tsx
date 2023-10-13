import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter, Ubuntu_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400', variable: '--font-ubuntu' });

export const metadata: Metadata = {
  title: 'AskSQL',
  description:
    'Its a SQL translation app, capable of receiving a schema and answering queries in natural language using artificial intelligence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn(inter.variable, ubuntuMono.variable)}>
      <body className='bg-blueberry-900 tailwind-scrollbar'>{children}</body>
    </html>
  );
}
