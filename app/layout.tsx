import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchOverlay } from "@/components/search-overlay";

export const metadata: Metadata = {
  title: "Grain & Grid — Fine Wooden Products, Montessori Toys & Home Decor",
  description:
    "Premium solid-wood school furniture, educational materials, kitchen essentials and toddler toys — crafted as a lasting alternative to plastic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
