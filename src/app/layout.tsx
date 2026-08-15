import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Capacity Movement, Project 2027",
  description: "Building a Capable Nation, One Citizen at a Time. Join the movement for credible leadership in Nigeria.",
  openGraph: {
    title: "Capacity Movement | Project 2027",
    description: "Building a Capable Nation, One Citizen at a Time. Join the movement for credible leadership.",
    url: "https://capacitymovement.ng", // Replace with your actual domain when you launch
    siteName: "Capacity Movement",
    images: [
      {
        url: "/images/hero-banner.jpg", // This will show up on WhatsApp/Facebook
        width: 1200,
        height: 630,
        alt: "Capacity Movement - Project 2027",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capacity Movement | Project 2027",
    description: "Building a Capable Nation, One Citizen at a Time.",
    images: ["/images/hero-banner.jpg"],
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