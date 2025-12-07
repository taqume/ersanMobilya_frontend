// Favoriler sistemi - LocalStorage ile yönetim

const FAVORITES_KEY = 'ersan-mobilya-favorites';

export interface FavoriteProduct {
  documentId: string;
  name: string;
  slug: string;
  image: string | null;
}

// Get all favorites
export function getFavorites(): FavoriteProduct[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

// Add to favorites
export function addToFavorites(product: FavoriteProduct): boolean {
  try {
    const favorites = getFavorites();
    
    // Check if already exists
    if (favorites.some((fav) => fav.documentId === product.documentId)) {
      return false;
    }
    
    favorites.push(product);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

// Remove from favorites
export function removeFromFavorites(documentId: string): boolean {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter((fav) => fav.documentId !== documentId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

// Check if product is in favorites
export function isFavorite(documentId: string): boolean {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.documentId === documentId);
}

// Clear all favorites
export function clearFavorites(): boolean {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}
