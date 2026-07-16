import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import { cookies } from "next/headers";
import { UserProvider } from "@/components/UserProvider";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michel Ruwishka - Personal Blog",
  description: "Personal portfolio of Michel Ruwishka, a software engineering student and front-end developer",
  icons: {
    icon: "/michel_site_logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const initialTheme = (themeCookie?.value === "dark" || themeCookie?.value === "light") 
    ? themeCookie.value 
    : "light";

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className={`${inter.variable} ${firaCode.variable}`}>
        <UserProvider>
          <ThemeProvider initialTheme={initialTheme}>
            <CustomCursor />

            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <CookieConsent />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
