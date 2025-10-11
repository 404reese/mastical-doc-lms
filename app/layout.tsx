import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { LanguageProvider } from '@/lib/language-context';
import { EnrollmentProvider } from '@/lib/enrollment-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Doctor LMS - Medical Education Platform',
  description: 'World-class medical courses for doctors by doctors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <EnrollmentProvider>
            <Navbar />
            {children}
          </EnrollmentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
