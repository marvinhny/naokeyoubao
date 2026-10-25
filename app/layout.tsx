import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Socials } from "@/components/socials";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  fallback: ["PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naokeyoubao.com"),
  title: {
    default: "脑壳有包",
    template: "%s · 脑壳有包",
  },
  description: "naokeyoubao.com · 作者 Marvin",
  authors: [{ name: "Marvin" }],
  icons: {
    icon: [
      { url: "/icon.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico?v=4", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png?v=4",
  },
  openGraph: {
    title: "脑壳有包",
    description: "naokeyoubao.com · 作者 Marvin",
    url: "https://naokeyoubao.com",
    siteName: "脑壳有包",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png?v=4", width: 512, height: 512, alt: "脑壳有包" }],
  },
  twitter: {
    card: "summary",
    title: "脑壳有包",
    description: "naokeyoubao.com · 作者 Marvin",
    images: ["/og.png?v=4"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen w-full flex-col items-center bg-[var(--theme)] px-4 py-8 sm:p-6">
          <div className="w-full flex-1" />
          {children}
          <p className="mt-6 text-center text-[10px] text-white/80">naokeyoubao.com · 作者 Marvin</p>
          <Socials />
          <div className="w-full flex-1" />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
