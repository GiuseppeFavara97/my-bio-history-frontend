import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientlayout";
import services from "./services/page";
import Footer from "../components/footer/footer";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from 'next-themes'
import ToggleTheme  from '../components/toggleTheme';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ClientLayout> {children}</ClientLayout>
          

        {/* ClientLayout is a client component */}
        
      
            <Footer/>

      </ThemeProvider>
    </body>
    </html>
  );
}

/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <Link href="/home">index</Link>
        <br/>
        <Link href="/about">about</Link>
        <br/>
        <Link href="http://localhost:3000/">Home</Link>
        <main>{children}</main>
      </body>
    </html>
  );
}
*/