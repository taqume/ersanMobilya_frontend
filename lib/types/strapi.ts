// Strapi API Type Definitions

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  image: StrapiMedia | null;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  dimensions: string | null;
  material: string | null;
  images: StrapiMedia[];
  category?: Category;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FeaturedProduct {
  id: number;
  documentId: string;
  order: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactInfo {
  id: number;
  documentId: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
