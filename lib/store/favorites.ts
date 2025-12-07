import { create } from 'zustand';
import {
  getFavorites,
  addToFavorites as addToFavoritesLocal,
  removeFromFavorites as removeFromFavoritesLocal,
  isFavorite as isFavoriteLocal,
  type FavoriteProduct,
} from '@/lib/favorites';

interface FavoritesStore {
  favorites: FavoriteProduct[];
  loadFavorites: () => void;
  addToFavorites: (product: FavoriteProduct) => boolean;
  removeFromFavorites: (documentId: string) => boolean;
  isFavorite: (documentId: string) => boolean;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  
  loadFavorites: () => {
    const favorites = getFavorites();
    set({ favorites });
  },
  
  addToFavorites: (product) => {
    const success = addToFavoritesLocal(product);
    if (success) {
      set({ favorites: getFavorites() });
    }
    return success;
  },
  
  removeFromFavorites: (documentId) => {
    const success = removeFromFavoritesLocal(documentId);
    if (success) {
      set({ favorites: getFavorites() });
    }
    return success;
  },
  
  isFavorite: (documentId) => {
    return isFavoriteLocal(documentId);
  },
  
  getFavoritesCount: () => {
    return get().favorites.length;
  },
}));
