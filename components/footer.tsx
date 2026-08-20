import Link from "next/link";
import { Logo } from "./logo";
import { JoineryDivider } from "./joinery-divider";
import { NewsletterForm } from "./newsletter-form";

const socials = ["IG", "FB", "YT"];

export function Footer() {
  return (
    <footer className="bg-ink text-cream/85 mt-24">
      <JoineryDivider color="var(--ink)" onColor="var(--wood)" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo onDark />
            <p className="mt-4 text-sm text-cream/70 max-w-xs leading-relaxed">
              Fine wooden products, Montessori toys and home decor — crafted for
              classrooms, kitchens and children who deserve better than plastic.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-cream/20 hover:border-cream/60 text-[11px] font-medium transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-cream/50 mb-4">Shop</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shop?category=school-furniture" className="hover:text-white">School Furniture</Link></li>
              <li><Link href="/shop?category=educational-materials" className="hover:text-white">Educational Materials</Link></li>
              <li><Link href="/shop?category=kitchen" className="hover:text-white">Kitchen</Link></li>
              <li><Link href="/shop?category=toys" className="hover:text-white">Toys</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-cream/50 mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/about#craft" className="hover:text-white">Our Craft</Link></li>
              <li><Link href="/about#sustainability" className="hover:text-white">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-cream/50 mb-4">Business</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/schools" className="hover:text-white">Schools &amp; Institutions</Link></li>
              <li><Link href="/schools#bulk" className="hover:text-white">Bulk Orders</Link></li>
              <li><Link href="/custom" className="hover:text-white">Custom Projects</Link></li>
              <li><Link href="/contact#wholesale" className="hover:text-white">Wholesale</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-wider text-cream/50 mb-4">Stay in the loop</p>
            <p className="text-sm text-cream/70 mb-3">New releases and workshop notes, occasionally.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Grain &amp; Grid. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="hover:text-cream/80">Shipping</Link>
            <Link href="/contact" className="hover:text-cream/80">Returns</Link>
            <Link href="/contact" className="hover:text-cream/80">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
