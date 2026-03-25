import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Storytelling & Painting for Children",
  description:
    "Meertalige storytelling en creatieve kunstworkshops voor kinderen in Maastricht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* Corner Icon */}
        <div className="fixed top-4 left-4 z-50">
          <Image
            src="/icon.png"
            alt="Creative Storytelling & Painting"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
            priority
          />
        </div>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
