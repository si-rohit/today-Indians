import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import PageTitle from "@/components/PageTitle";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  description: "The Today Indians",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <PageTitle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
