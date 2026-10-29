import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHESSY SCHOOLS — Learn Without Limits",
  description: "Build practical skills in technology, business, finance and data with CHESSY SCHOOLS.",
  icons: { icon: "/jchess-icon.svg", shortcut: "/jchess-icon.svg", apple: "/jchess-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
