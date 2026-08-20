import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl md:text-3xl text-ink">You may also like</h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
