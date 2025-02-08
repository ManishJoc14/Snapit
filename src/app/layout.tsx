import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapit - Fastest Delivery in Kathmandu",
  description: "Order groceries and essentials with delivery in under 8 minutes.",
  keywords: "groceries, delivery, online shopping, Kathmandu, Snapit",
  authors: [{ name: "Manish Joshi", url: "https://yourwebsite.com" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Snapit - Fastest Delivery in Kathmandu",
    description: "Order groceries and essentials with delivery in under 8 minutes.",
    url: "https://yourwebsite.com",
    siteName: "Snapit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snapit - Fastest Grocery Delivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapit - Fastest Delivery in Kathmandu",
    description: "Order groceries and essentials with delivery in under 8 minutes.",
    images: ["/twitter-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* for dark mode: suppressHydrationWarning  */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="min-h-screen container mx-auto flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
