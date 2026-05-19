import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "PawsHome - Pet Adoption Platform",
  description: "Find your perfect companion. Every pet deserves a loving home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefin.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}