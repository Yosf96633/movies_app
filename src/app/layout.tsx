import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
export const metadata: Metadata = {
  title: "Movie, Watch Movies Online, Watch TV Shows Online, free movie - Moviebox",
  icons: {
    icon: "/favicon.svg",
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
