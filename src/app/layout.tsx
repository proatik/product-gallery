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
        <MainContextProvider>{children}</MainContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
