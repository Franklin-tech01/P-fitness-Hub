import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.APP_URL || "http://localhost:3000";
const title = "P Fitness Hub | Train. Sweat. Grow.";
const description =
  "P Fitness Hub is a modern gym offering flexible memberships, expert-led classes and top facilities. Join today and start your transformation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | P Fitness Hub",
  },
  description,
  keywords: [
    "P Fitness Hub",
    "gym",
    "fitness",
    "gym membership",
    "personal training",
    "gym classes",
    "Lagos gym",
  ],
  applicationName: "P Fitness Hub",
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "P Fitness Hub",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-black">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
