"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { useStore } from "@/context/store-context";
import { categories } from "@/lib/data";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/schools", label: "For Schools" },
  { href: "/custom", label: "Custom Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden md:block bg-ink text-cream/90 text-xs tracking-wide">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <span>Free delivery in Karachi on orders over PKR 5,000</span>
          <Link href="/schools" className="hover:text-white transition-colors">
            Furnishing a school? Request a quote →
          </Link>
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-ink">
              <Link href="/" className="hover:text-wood transition-colors">
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-wood transition-colors">
                  Shop <ChevronDown size={15} />
                </button>
                {shopOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div className="w-[560px] bg-white border border-line rounded-2xl shadow-xl p-6 grid grid-cols-2 gap-4">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/shop?category=${c.slug}`}
                          className="group rounded-xl p-4 hover:bg-cream-deep transition-colors"
                        >
                          <p className="font-display text-lg text-ink group-hover:text-wood transition-colors">
                            {c.name}
                          </p>
                          <p className="text-sm text-ink-soft mt-1">{c.tagline}</p>
                        </Link>
                      ))}
                      <Link
                        href="/shop"
                        className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-cream text-sm font-medium hover:bg-wood-dark transition-colors"
                      >
                        View all products
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-wood transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-cream-deep transition-colors"
              >
                <Search size={20} strokeWidth={1.75} />
              </button>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative p-2.5 rounded-full hover:bg-cream-deep transition-colors hidden sm:inline-flex"
              >
                <Heart size={20} strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-sage text-[10px] leading-4 text-center text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-cream-deep transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-wood text-[10px] leading-4 text-center text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
                className="p-2.5 rounded-full hover:bg-cream-deep transition-colors lg:hidden"
              >
                <Menu size={22} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-cream shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-line">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1 text-lg">
              <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 border-b border-line">
                Home
              </Link>
              <p className="pt-4 pb-1 text-xs uppercase tracking-wider text-ink-soft">Shop</p>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-line text-base"
                >
                  {c.name}
                </Link>
              ))}
              <div className="pt-3 flex flex-col">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 border-b border-line"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-line"
                >
                  Wishlist
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
