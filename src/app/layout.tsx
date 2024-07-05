import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감",
  description: "NextJS 를 이용해 나만의 포켓몬 도감을 만들어 봅시다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-4 w-[800px] mx-auto my-2 shadow-list-container rounded-md">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
