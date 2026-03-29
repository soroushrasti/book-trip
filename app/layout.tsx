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
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
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
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">🌈</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce opacity-30" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-bounce opacity-30" style={{animationDelay: '1s'}}>🎨</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-bounce opacity-30" style={{animationDelay: '1.5s'}}>🦋</div>
          <div className="absolute top-1/2 left-5 text-4xl animate-bounce opacity-20" style={{animationDelay: '0.7s'}}>🌸</div>
          <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20" style={{animationDelay: '1.2s'}}>🎈</div>
        </div>

        {/* Corner Icon with wiggle animation */}
        <div className="fixed top-4 left-4 z-50 hover:scale-110 transition-transform">
          <Image
            src="/icon.png"
            alt="Creative Storytelling & Painting"
            width={90}
            height={90}
            className="rounded-full shadow-xl border-4 border-yellow-400 hover:border-pink-400 transition-colors"
            priority
          />
        </div>
        <div className="flex-1 relative z-10">{children}</div>
      </body>
    </html>
  );
}
