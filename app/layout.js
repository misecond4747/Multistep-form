import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Multistep Form",
  description: "Just step a head",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
