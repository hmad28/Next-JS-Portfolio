import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hammad.biz.id"),
  title: "Hammad | Fullstack Developer & Creative",
  description:
    "Portfolio Hammad (aka Matt, Muhammad, Hammad Imam Nafi), Fullstack Developer, Video Editor, Graphic Designer, and Student. Explore projects, tutorials, and creative works.",
  keywords: [
    "Hammad",
    "Matt",
    "Muhammad",
    "Hammad Imam Nafi'",
    "Fullstack Developer",
    "Next.js",
    "Laravel",
    "Video Editing",
    "Graphic Design",
    "Portfolio",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Hammad | Fullstack Developer & Creative",
    description:
      "Portfolio Hammad (aka Matt, Muhammad, Hammad Imam Nafi), Fullstack Developer, Video Editor, Graphic Designer, and Student.",
    url: "https://hammad.biz.id",
    siteName: "Hammad Portfolio",
    images: [
      {
        url: "/images/hammad-class.jpeg",
        width: 1200,
        height: 630,
        alt: "Hammad Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammad | Fullstack Developer & Creative",
    description:
      "Portfolio Hammad (aka Matt, Muhammad, Hammad Imam Nafi), Fullstack Developer, Video Editor, Graphic Designer, and Student.",
    images: ["/images/hammad-class.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hammad Imam Nafi",
              alternateName: ["Matt", "Muhammad"],
              url: "https://hammad.biz.id",
              sameAs: [
                "https://www.linkedin.com/in/hmatt28",
                "https://www.youtube.com/@hammad_matt",
                "https://www.instagram.com/matt.hmd28",
              ],
              jobTitle: "Fullstack Developer",
              knowsAbout: [
                "Web Development",
                "Laravel",
                "Next.js",
                "Video Editing",
                "Graphic Design",
              ],
              worksFor: {
                "@type": "Organization",
                name: "BaruDawg IT",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
