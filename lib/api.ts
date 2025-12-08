import axios from 'axios';
import qs from 'qs';
import type {
  Category,
  Product,
  Page,
  ContactInfo,
  StrapiResponse,
} from './types/strapi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

// Axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

// Helper: Build query string for Strapi populate
function buildQuery(populate: string[] = []) {
  return qs.stringify(
    {
      populate: populate.length > 0 ? populate : '*',
    },
    { encodeValuesOnly: true }
  );
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const query = buildQuery(['image', 'products']);
    const { data } = await api.get<StrapiResponse<Category[]>>(
      `/categories?${query}`
    );
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const query = buildQuery(['image', 'products.images']);
    const { data } = await api.get<StrapiResponse<Category[]>>(
      `/categories?filters[slug][$eq]=${slug}&${query}`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const query = buildQuery(['images', 'category']);
    const { data } = await api.get<StrapiResponse<Product[]>>(
      `/products?${query}`
    );
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const query = buildQuery(['images', 'category']);
    const { data } = await api.get<StrapiResponse<Product[]>>(
      `/products?filters[slug][$eq]=${slug}&${query}`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const query = buildQuery(['images', 'category']);
    const { data } = await api.get<StrapiResponse<Product[]>>(
      `/products?filters[category][id][$eq]=${categoryId}&${query}`
    );
    return data.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Pages (Hakkımızda vb.)
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const { data } = await api.get<StrapiResponse<Page[]>>(
      `/pages?filters[slug][$eq]=${slug}`
    );
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Contact Info
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const { data } = await api.get<StrapiResponse<ContactInfo>>(
      '/contact-info'
    );
    return data.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// Get Cloudinary image URL with transformations
export function getCloudinaryUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string {
  if (!url) return '';
  
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) return url;

  const { width, height, quality = 90, format = 'auto' } = options || {};
  
  // Split URL to inject transformations
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
}
