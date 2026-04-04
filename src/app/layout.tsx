import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/src/config/fonts";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lion Motors Group",
  description: "Web Site Lion Motors Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
