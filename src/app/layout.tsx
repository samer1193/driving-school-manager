import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import RootWrapper from "@/components/RootWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driving School Manager",
  description: "White-label driving school management system - multi-company, multi-role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <RootWrapper>
              {children}
            </RootWrapper>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
