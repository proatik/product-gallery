import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// providers.
import { ToastProvider } from "@/providers/ToastProvider";
import { MainContextProvider } from "@/contexts/MainContext";

// react components.
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider />
        <MainContextProvider>
          <Header />
          {children}
          <Footer />
        </MainContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
