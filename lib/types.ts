export type CategorySlug =
  | "school-furniture"
  | "educational-materials"
  | "kitchen"
  | "toys";

export type PurchaseType = "cart" | "quote";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accent: "wood" | "sage";
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  art: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "PKR";
  rating: number;
  reviewCount: number;
  purchaseType: PurchaseType;
  bulkPricing?: boolean;
  badges?: string[];
  ageGroup?: string;
  material: string;
  dimensions: string;
  finish: string;
  care: string;
  inStock: boolean;
  reviews: Review[];
}
