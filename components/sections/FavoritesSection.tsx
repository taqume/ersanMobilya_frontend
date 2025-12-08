'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFavoritesStore } from '@/lib/store/favorites';
import { FiHeart } from 'react-icons/fi';

export function FavoritesSection() {
  const { favorites, loadFavorites } = useFavoritesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadFavorites();
    setIsLoaded(true);
  }, [loadFavorites]);

  if (!isLoaded) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Favorilerim</h2>
          <p className="text-gray-300 text-lg">Beğendiğiniz ürünleri favorilerinize ekleyin</p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-dashed border-white/20">
            <FiHeart className="w-20 h-20 text-white/40 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Henüz favori ürününüz yok</h3>
            <p className="text-gray-300 mb-6">Beğendiğiniz ürünleri favorilerinize ekleyerek buradan kolayca ulaşabilirsiniz</p>
            <Link
              href="/katalog"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
            >
              Katalog İncele
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex gap-6 px-2">
                {favorites.map((product) => (
                  <Link
                    key={product.documentId}
                    href={`/urun/${product.slug}`}
                    className="flex-none w-72 group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-600 text-6xl">🪑</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {favorites.length > 4 && (
              <div className="text-center mt-6">
                <Link
                  href="/favoriler"
                  className="inline-block px-6 py-2 text-white hover:text-orange-400 font-medium border-2 border-white/30 hover:border-orange-500 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  Tümünü Gör ({favorites.length})
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
