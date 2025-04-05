import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
export const metadata: Metadata = {
  title: "Movie app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      
      <AuthProvider>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         <Navbar />
            {children}
            <Toaster />
        </ThemeProvider>
      </AuthProvider>
     
      </body>
    </html>
  );
}
