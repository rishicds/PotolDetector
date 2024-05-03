
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
      <body ><ImageUploader/>
      <h3 className="container mx-auto px-4 py-2">
        Made with ❤️ by <a href="https://rishi-paul04.vercel.app/" style={{color: 'red'}}>Rishi</a>
      </h3>
      <h4 className="container mx-auto px-4 py-0">
        See project on <a href="https://github.com/rishicds"style={{color: 'green'}}>Github</a>
      </h4>
      </body>
    </html>
  );
}
