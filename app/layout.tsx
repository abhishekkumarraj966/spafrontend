import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Serenity Spa | Luxury Wellness & Beauty",
  description: "Experience ultimate relaxation at Serenity Spa. Book massages, facials, body treatments and more. Your sanctuary of wellness awaits.",
  keywords: "spa, massage, facial, wellness, beauty, relaxation, luxury spa",
  openGraph: {
    title: "Serenity Spa | Luxury Wellness & Beauty",
    description: "Experience ultimate relaxation at Serenity Spa.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#1a1a2e', color: '#fff', borderRadius: '12px' } }} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
