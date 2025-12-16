import { getProductBySlug, getProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// ISR: Her 1 saatte bir revalidate (3600 saniye)
export const revalidate = 3600;

// Build time'da tüm ürünleri static olarak oluştur
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Ersan Mobilya | Ürün Bulunamadı',
    };
  }

  return {
    title: `Ersan Mobilya | ${product.name}`,
    description: `${product.name} - Ersan Mobilya yemek odası koleksiyonundan kaliteli ve estetik mobilya.`,
    keywords: [product.name, 'yemek odası', product.category?.name || '', 'ersan mobilya'],
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Prepare images: Category image first, then product images
  const images: string[] = [];
  
  // Add category image first if exists
  if (product.category?.image?.url) {
    const categoryImageUrl = product.category.image.url.startsWith('http')
      ? product.category.image.url
      : `${API_URL}${product.category.image.url}`;
    images.push(categoryImageUrl);
  }
  
  // Add product images
  if (product.images && product.images.length > 0) {
    const productImages = product.images.map(img => {
      const url = img.url.startsWith('http') 
        ? img.url 
        : `${API_URL}${img.url}`;
      return url;
    });
    images.push(...productImages);
  }
  
  // Fallback if no images
  if (images.length === 0) {
    images.push('/hero-bg.png');
  }

  return (
    <ProductDetailClient 
      name={product.name}
      images={images}
      categorySlug={product.category?.slug}
      productId={product.documentId}
      productSlug={product.slug}
    />
  );
}
