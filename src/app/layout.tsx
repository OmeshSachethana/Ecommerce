import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart-drawer";
import { CommandSearch } from "@/components/command-search";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StoreHydrator } from "@/components/store-hydrator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurora — Objects for modern living",
    template: "%s · Aurora",
  },
  description:
    "Aurora is a curated store of design-led audio, wearables, apparel and home goods. Free shipping over $150 and 30-day returns.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("aurora-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <StoreHydrator />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <CommandSearch />
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
