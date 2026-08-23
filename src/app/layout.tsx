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

// export const metadata: Metadata = {
//   title: "Michel Ruwishka - Personal Blog",
//   description: "Personal portfolio of Michel Ruwishka, a software engineering student and Full-Stack Developer",
//   icons: {
//     icon: "/michel_site_logo.png",
//   },
// };

export const metadata: Metadata = {
  title: "Michel Ruwishka | Full-Stack Developer",
  description: "Personal portfolio of Michel Ruwishka, a Full-Stack Developer specializing in scalable web applications and comprehensive digital solutions.",
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

  const themeScript = `
    (function() {
      try {
        var cookie = document.cookie.match(/(?:^|; )theme=([^;]*)/);
        var theme = cookie ? cookie[1] : null;
        if (!theme) {
          var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" data-theme={initialTheme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
