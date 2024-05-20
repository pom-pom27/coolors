import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coolors",
  description: "Best colors palettes generato!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Header />

          {children}

          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
