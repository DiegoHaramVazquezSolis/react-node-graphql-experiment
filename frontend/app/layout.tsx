'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { ApolloWrapper } from "@/components/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
