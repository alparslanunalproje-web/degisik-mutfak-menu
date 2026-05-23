import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Değişik Mutfak | Premium QR Menü",
    template: "%s | Değişik Mutfak",
  },
  description:
    "Değişik Mutfak'ın sıra dışı lezzetlerini keşfedin. Modern, premium dijital QR menü deneyimi.",
  keywords: [
    "QR menü",
    "dijital menü",
    "restoran menü",
    "Değişik Mutfak",
    "premium menü",
  ],
  metadataBase: new URL("https://degisik-mutfak-menu.vercel.app"),
  openGraph: {
    title: "Değişik Mutfak | Premium QR Menü",
    description: "Sıra dışı lezzetlerin dijital adresi.",
    type: "website",
    locale: "tr_TR",
    images: ["/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Değişik Mutfak",
    description: "Sıra dışı lezzetlerin dijital adresi.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
