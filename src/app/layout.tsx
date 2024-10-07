import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { Suspense } from "react";
import Loading from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Statty",
  description: "See Spotify stats anytime, anywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-100 text-zinc-900`}>
        <Container>
          <Header />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <Footer />
        </Container>
      </body>
    </html>
  );
}