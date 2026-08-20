import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getCategory } from "@/lib/data";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { ProductTabs } from "@/components/product-tabs";
import { Reviews } from "@/components/reviews";
import { RelatedProducts } from "@/components/related-products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: category?.name ?? "Shop", href: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />
      <div className="mt-6">
        <ProductPurchasePanel product={product} />
      </div>

      <div className="mt-16 max-w-3xl">
        <ProductTabs product={product} />
      </div>

      <div className="mt-16 border-t border-line pt-14">
        <Reviews product={product} />
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
