import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chinmayameher.github.io/Portfolio"),
  title: "Chinmaya Meher — Portfolio | Full-Stack Developer & AI/ML Learner",
  description:
    "Portfolio of Chinmaya Meher, CSE student at Centurion University specializing in Full-Stack Web Engineering, AI/ML, and Computer Vision.",
  keywords: [
    "Chinmaya Meher",
    "Portfolio",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "AI/ML",
    "Centurion University",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Chinmaya Meher" }],
  creator: "Chinmaya Meher",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chinmayameher.github.io/Portfolio/",
    title: "Chinmaya Meher — Portfolio | Full-Stack Developer & AI/ML",
    description:
      "Crafting digital experiences with modern web technologies and machine learning.",
    siteName: "Chinmaya Meher Portfolio",
    images: [
      {
        url: "/image/chinmaya_image.png",
        width: 1200,
        height: 630,
        alt: "Chinmaya Meher Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya Meher — Portfolio",
    description:
      "Full-Stack Web Developer & AI/ML student building scalable digital products.",
    creator: "@simple_999_",
    images: ["/image/chinmaya_image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { CvModalProvider } from "@/context/CvModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-background text-neutral-100 antialiased selection:bg-accent/20 selection:text-accent font-sans">
        <CvModalProvider>{children}</CvModalProvider>
      </body>
    </html>
  );
}
