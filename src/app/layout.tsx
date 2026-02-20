import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReactLenis from "lenis/react";
import StoreProvider from "../../StoreProvider/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopNest",
  description:
    "Discover trendy fashion, top tech gadgets, and lifestyle essentials at ShopNest — your all-in-one online store. Enjoy fast delivery, secure checkout, and unbeatable deals every day.",
  // icons: {
  //   icon: "/favicon.png",
  // },
  keywords: ["e-commerce", "shop", "nextjs", "products", "online store"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <ReactLenis root
    options={{
      lerp: 0.1,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      // smoothTouch: false,
      touchMultiplier: 2,

    }}
    >
      <ClerkProvider>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
      </ReactLenis>
    </StoreProvider>
  );
}
