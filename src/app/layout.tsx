import "./globals.css";
import "./style.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Speso chat",
  description: "winks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ChatContextProvider>
          <body className={inter.className}>{children}</body>
        </ChatContextProvider>
      </AuthContextProvider>
    </html>
  );
}
