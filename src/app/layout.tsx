import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title:
    "Movie, Watch Movies Online, Watch TV Shows Online, free movie - Moviebox",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" relative">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className=" sticky top-0 z-10">
              <Navbar />
            </div>
            {children}
            {modal}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
