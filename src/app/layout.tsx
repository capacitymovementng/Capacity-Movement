import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://capacitymovement.org"),
  title: "Capacity Movement | Project 2027",
  description: "Building a Capable Nation, One Citizen at a Time. Join the movement for credible leadership in Nigeria.",
  openGraph: {
    title: "Capacity Movement | Project 2027",
    description: "Building a Capable Nation, One Citizen at a Time. Join the movement for credible leadership.",
    url: "/", 
    siteName: "Capacity Movement",
    images: [
      {
        url: "https://capacitymovement.org/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "Capacity Movement - Official Emblem",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capacity Movement | Project 2027",
    description: "Building a Capable Nation, One Citizen at a Time.",
    images: ["https://capacitymovement.org/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#021807]">
        {children}
      </body>
    </html>
  );
}