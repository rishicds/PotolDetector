
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ImageUploader from "@/components/imageuploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PotolDetector",
  description: "An Advanced AI that can detect Potol in an image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body ><ImageUploader/></body>
    </html>
  );
}
