import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://claukk.com";
const SITE_NAME = "Claukk";
const TITLE = "Claukk — Tools that run your whole business";
const DESCRIPTION =
  "Claukk builds ClaukkSuite, a connected set of business tools that work as one. Start with ClaukkPOS — a fast point of sale, inventory and sales system for modern retail, with cash, Paystack and mobile money payments.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Claukk",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Claukk", url: SITE_URL }],
  creator: "Claukk",
  publisher: "Claukk",
  keywords: [
    "Claukk",
    "ClaukkSuite",
    "ClaukkPOS",
    "point of sale",
    "POS system",
    "retail POS",
    "inventory management",
    "sales software",
    "business tools",
    "mobile money payments",
    "Paystack",
    "small business software",
    "Ghana POS",
  ],
  category: "Business Software",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Claukk — Tools that run your whole business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@claukk",
    creator: "@claukk",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#050706" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      style={{ scrollPaddingTop: "72px" }}
    >
      <body className="flex min-h-full flex-col bg-[#f3f5f2] text-[#050706]">
        {children}
      </body>
    </html>
  );
}