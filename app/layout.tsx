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
  title: {
    default: "脑壳有包",
    template: "%s · 脑壳有包",
  },
  description: "有的会消，有的会长大，有的一直疼。想法、正在做的事、做成的和没做成的，都记在脑壳上。",
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico?v=3", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png?v=3",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--theme)] px-4 py-8 sm:p-6">
          {children}
          <p className="mt-6 text-center text-[10px] text-white/80">naokeyoubao.com · 作者 Marvin</p>
          <Socials />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
